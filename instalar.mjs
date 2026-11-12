// Instala a skill /editar no Claude Code desta máquina.
// Uso: node instalar.mjs            → copia a skill e confere o que falta
//      node instalar.mjs --completo → também instala a transcrição (Whisper local)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const aqui = path.dirname(fileURLToPath(import.meta.url));
const origem = path.join(aqui, 'skills', 'editar');
const destino = path.join(os.homedir(), '.claude', 'skills', 'editar');

if (!fs.existsSync(path.join(origem, 'SKILL.md'))) {
  console.error('Não achei skills/editar/SKILL.md ao lado deste instalador. Descompacte o zip inteiro e rode de novo.');
  process.exit(1);
}

// guarda as preferências que o Claude já anotou numa instalação anterior
let prefs = '';
const estilosAntigo = path.join(destino, 'estilos.md');
if (fs.existsSync(estilosAntigo)) {
  const t = fs.readFileSync(estilosAntigo, 'utf8');
  const i = t.indexOf('## Preferências desta pessoa');
  if (i >= 0) prefs = t.slice(i);
}

fs.mkdirSync(destino, { recursive: true });
for (const arq of fs.readdirSync(origem)) {
  fs.copyFileSync(path.join(origem, arq), path.join(destino, arq));
}
if (prefs) {
  const novo = fs.readFileSync(estilosAntigo, 'utf8');
  const i = novo.indexOf('## Preferências desta pessoa');
  fs.writeFileSync(estilosAntigo, (i >= 0 ? novo.slice(0, i) : novo + '\n') + prefs);
}
console.log(`SKILL_INSTALADA: ${destino}`);

const args = [path.join(destino, 'preparar.mjs')];
if (process.argv.includes('--completo')) args.push('--instalar');
const r = spawnSync(process.execPath, args, { stdio: 'inherit' });
process.exit(r.status ?? 0);
