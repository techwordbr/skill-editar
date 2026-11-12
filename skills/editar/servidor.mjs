// Servidor da página de escolha de edição.
// Uso: node servidor.mjs "C:\caminho\do\video.mp4" [porta]
// Abre em http://localhost:4791. Quando a escolha chega, salva <video>.edicao.json,
// imprime "ESCOLHA_JSON: {...}" e encerra (o Claude é avisado porque o processo termina).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pasta = path.dirname(fileURLToPath(import.meta.url));
const video = process.argv[2] && fs.existsSync(process.argv[2]) ? path.resolve(process.argv[2]) : null;
let porta = Number(process.argv[3]) || 4791;
const saida = video
  ? path.join(path.dirname(video), path.parse(video).name + '.edicao.json')
  : path.join(pasta, 'ultima-escolha.json');

const tipos = { '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm', '.mkv': 'video/x-matroska', '.m4v': 'video/mp4' };
const mb = (b) => (b / 1048576).toFixed(1) + ' MB';

const srv = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/' || url.pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end(fs.readFileSync(path.join(pasta, 'pagina.html')));
  }
  if (url.pathname === '/info') {
    let anterior = null;
    try { anterior = JSON.parse(fs.readFileSync(saida, 'utf8')); } catch {}
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      video: !!video, nome: video ? path.basename(video) : null, caminho: video,
      tamanho: video ? mb(fs.statSync(video).size) : null, anterior,
    }));
  }
  if (url.pathname === '/video' && video) {
    const tam = fs.statSync(video).size;
    const tipo = tipos[path.extname(video).toLowerCase()] || 'video/mp4';
    const r = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
    if (r) {
      const ini = r[1] ? Number(r[1]) : 0;
      const fim = r[2] ? Math.min(Number(r[2]), tam - 1) : Math.min(ini + 4 * 1048576, tam - 1);
      res.writeHead(206, { 'Content-Type': tipo, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${ini}-${fim}/${tam}`, 'Content-Length': fim - ini + 1 });
      return fs.createReadStream(video, { start: ini, end: fim }).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': tipo, 'Accept-Ranges': 'bytes', 'Content-Length': tam });
    return fs.createReadStream(video).pipe(res);
  }
  if (url.pathname === '/escolha' && req.method === 'POST') {
    let corpo = '';
    req.on('data', (c) => (corpo += c));
    req.on('end', () => {
      try {
        const dados = JSON.parse(corpo);
        dados.video = video;
        fs.writeFileSync(saida, JSON.stringify(dados, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"ok":true}');
        console.log('ESCOLHA_SALVA: ' + saida);
        console.log('ESCOLHA_JSON: ' + JSON.stringify(dados));
        setTimeout(() => process.exit(0), 400);
      } catch (e) {
        res.writeHead(400); res.end('json inválido');
      }
    });
    return;
  }
  res.writeHead(404); res.end();
});

srv.on('error', (e) => {
  if (e.code === 'EADDRINUSE' && porta < 4800) { porta++; srv.listen(porta, '127.0.0.1'); }
  else { console.error(e.message); process.exit(1); }
});
srv.on('listening', () => console.log(`PAGINA: http://localhost:${porta}  (video: ${video || 'nenhum'})`));
srv.listen(porta, '127.0.0.1');
// se ninguém escolher em 3 horas, encerra sozinho
setTimeout(() => { console.log('TEMPO_ESGOTADO'); process.exit(2); }, 3 * 3600 * 1000).unref();
