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

const tipos = { '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm', '.mkv': 'video/x-matroska', '.m4v': 'video/mp4',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.aac': 'audio/aac', '.ogg': 'audio/ogg', '.opus': 'audio/ogg', '.flac': 'audio/flac' };
const pastaRefs = video
  ? path.join(path.dirname(video), path.parse(video).name + '-referencias')
  : path.join(pasta, 'referencias-enviadas');
const midia = video &&tipos[path.extname(video).toLowerCase()]?.startsWith('audio') ? 'audio' : 'video';
const mb = (b) => (b / 1048576).toFixed(1) + ' MB';

// catálogo de fontes (fontes.json ao lado deste arquivo). "pasta" = onde estão os arquivos da pessoa.
let fontes = { pasta: null, familias: {} };
try { fontes = JSON.parse(fs.readFileSync(path.join(pasta, 'fontes.json'), 'utf8')); } catch {}
const pastaFontes = fontes.pasta && fs.existsSync(fontes.pasta) ? path.resolve(fontes.pasta) : null;
const tiposFonte = { '.ttf': 'font/ttf', '.otf': 'font/otf', '.woff': 'font/woff', '.woff2': 'font/woff2' };

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
      video: !!video, midia, nome: video ? path.basename(video) : null, caminho: video,
      tamanho: video ? mb(fs.statSync(video).size) : null, anterior,
    }));
  }
  if (url.pathname === '/fontes') {
    const familias = {};
    for (const [papel, lista] of Object.entries(fontes.familias || {}))
      familias[papel] = lista.map((f) => ({ ...f, local: !!(pastaFontes && f.arquivo && fs.existsSync(path.join(pastaFontes, f.arquivo))) }))
        .filter((f) => f.local || f.google);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ pasta: pastaFontes, familias }));
  }
  if (url.pathname === '/fonte' && pastaFontes) {
    const alvo = path.resolve(pastaFontes, url.searchParams.get('f') || '');
    const tipo = tiposFonte[path.extname(alvo).toLowerCase()];
    if (!tipo || !alvo.startsWith(pastaFontes + path.sep) || !fs.existsSync(alvo)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': tipo, 'Cache-Control': 'max-age=3600' });
    return fs.createReadStream(alvo).pipe(res);
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
  // prints do programa que aparece no vídeo: salvos em <pasta do vídeo>/<nome>-referencias/
  if (url.pathname === '/upload' && req.method === 'POST') {
    const ext = path.extname(url.searchParams.get('nome') || '').toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext)) { res.writeHead(415); return res.end('só imagem'); }
    const partes = []; let tam = 0;
    req.on('data', (c) => { tam += c.length; if (tam > 25 * 1048576) { res.writeHead(413); res.end('grande demais'); req.destroy(); } else partes.push(c); });
    req.on('end', () => {
      if (res.writableEnded) return;
      fs.mkdirSync(pastaRefs, { recursive: true });
      const base = path.parse(url.searchParams.get('nome')).name.replace(/[^\w\-]+/g, '-').slice(0, 40) || 'print';
      const arq = path.join(pastaRefs, `${Date.now().toString(36)}-${base}${ext}`);
      fs.writeFileSync(arq, Buffer.concat(partes));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ caminho: arq, url: '/ref?f=' + encodeURIComponent(path.basename(arq)) }));
    });
    return;
  }
  if (url.pathname === '/ref') {
    const alvo = path.join(pastaRefs, path.basename(url.searchParams.get('f') || ''));
    if (!fs.existsSync(alvo)) { res.writeHead(404); return res.end(); }
    const t = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' }[path.extname(alvo).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': t });
    return fs.createReadStream(alvo).pipe(res);
  }
  if (url.pathname === '/escolha' && req.method === 'POST') {
    let corpo = '';
    req.on('data', (c) => (corpo += c));
    req.on('end', () => {
      try {
        const dados = JSON.parse(corpo);
        dados.video = video; dados.midia = midia;
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
