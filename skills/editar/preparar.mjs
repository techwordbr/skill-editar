// Confere o que a skill /editar precisa e prepara a pasta de ferramentas (~/.editar-motion).
// Uso: node preparar.mjs           → só confere e imprime um relatório em JSON
//      node preparar.mjs --instalar → também instala as ferramentas de transcrição (npm)
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pastaSkill = path.dirname(fileURLToPath(import.meta.url));
const casa = path.join(os.homedir(), '.editar-motion');
const instalar = process.argv.includes('--instalar');
const so = process.platform; // win32 | darwin | linux
const shell = so === 'win32';

const roda = (cmd, args) => {
  // argumentos aqui são fixos e sem espaço; no Windows npx/claude são .cmd e precisam de shell
  const r = shell ? spawnSync(`${cmd} ${args.join(' ')}`, { encoding: 'utf8', shell, timeout: 180000 })
                  : spawnSync(cmd, args, { encoding: 'utf8', timeout: 180000 });
  return { ok: r.status === 0, saida: ((r.stdout || '') + (r.stderr || '')).trim() };
};

const dica = {
  ffmpeg: { win32: 'winget install -e --id Gyan.FFmpeg', darwin: 'brew install ffmpeg', linux: 'sudo apt install ffmpeg' },
  chrome: { win32: 'winget install -e --id Google.Chrome', darwin: 'brew install --cask google-chrome', linux: 'instalar o Google Chrome ou Chromium' },
  node: { win32: 'winget install -e --id OpenJS.NodeJS', darwin: 'brew install node', linux: 'instalar Node.js 22+ (nodejs.org)' },
};

const rel = { sistema: so, pastaFerramentas: casa, itens: {} };

const maior = Number(process.versions.node.split('.')[0]);
rel.itens.node = { ok: maior >= 22, versao: process.versions.node, instalar: maior >= 22 ? null : dica.node[so] };

const ff = roda('ffmpeg', ['-hide_banner', '-version']);
rel.itens.ffmpeg = { ok: ff.ok, versao: ff.ok ? ff.saida.split('\n')[0] : null, instalar: ff.ok ? null : dica.ffmpeg[so] };

const chromes = {
  win32: ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', path.join(os.homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'), 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'],
  darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'],
  linux: ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'],
}[so] || [];
const chrome = chromes.find((c) => fs.existsSync(c));
rel.itens.chrome = { ok: !!chrome, caminho: chrome || null, instalar: chrome ? null : dica.chrome[so], obs: 'o HyperFrames também consegue baixar o próprio Chrome se faltar' };

const hf = roda('npx', ['-y', 'hyperframes', '--version']);
rel.itens.hyperframes = { ok: hf.ok, versao: hf.ok ? hf.saida.split('\n').pop() : null, instalar: hf.ok ? null : 'npx -y hyperframes --version (baixa sozinho na primeira vez)' };

const pl = roda('claude', ['plugin', 'list']);
rel.itens.pluginHyperframes = {
  ok: pl.ok && /hyperframes@hyperframes/.test(pl.saida),
  instalar: 'claude plugin marketplace add heygen-com/hyperframes  e depois  claude plugin install hyperframes@hyperframes  (precisa de git)',
};

// ferramentas de transcrição (Whisper em JS, roda local, sem compilar nada)
const pkg = path.join(casa, 'package.json');
const temModulos = fs.existsSync(path.join(casa, 'node_modules', '@huggingface', 'transformers'));
if (instalar) {
  fs.mkdirSync(casa, { recursive: true });
  fs.writeFileSync(pkg, JSON.stringify({ name: 'editar-motion-ferramentas', private: true, type: 'module', dependencies: { '@huggingface/transformers': '3.0.2', wavefile: '11.0.0' } }, null, 2));
  fs.copyFileSync(path.join(pastaSkill, 'transcrever.mjs'), path.join(casa, 'transcrever.mjs'));
  if (!temModulos) {
    const n = spawnSync(shell ? 'npm install --no-audit --no-fund' : 'npm', shell ? [] : ['install', '--no-audit', '--no-fund'], { cwd: casa, stdio: 'inherit', shell });
    if (n.status !== 0) console.error('npm install falhou');
  }
} else if (fs.existsSync(path.join(casa, 'transcrever.mjs'))) {
  // mantém o script atualizado com a versão da skill
  fs.copyFileSync(path.join(pastaSkill, 'transcrever.mjs'), path.join(casa, 'transcrever.mjs'));
}
const okTrans = fs.existsSync(path.join(casa, 'node_modules', '@huggingface', 'transformers'));
rel.itens.transcricao = { ok: okTrans, script: path.join(casa, 'transcrever.mjs'), instalar: okTrans ? null : `node "${path.join(pastaSkill, 'preparar.mjs')}" --instalar` };

rel.tudoOk = Object.values(rel.itens).every((i) => i.ok);
console.log(JSON.stringify(rel, null, 2));
