# Instalar a skill /editar (instruções para o Claude)

Se a pessoa te mandou este zip (ou esta pasta) e pediu para instalar, faça assim, sem pedir que ela rode nada:

1. **Descompactar** o zip numa pasta nova e vazia (ex.: a pasta Downloads/skill-editar). Windows: `Expand-Archive "<zip>" "<pasta>" -Force`; Mac/Linux: `unzip "<zip>" -d "<pasta>"`. O conteúdo pode vir dentro de uma subpasta (`skill-editar/` ou `skill-editar-main/`): a pasta certa é a que tem `instalar.mjs`.
2. **Ler** este arquivo e o `instalar.mjs` antes de rodar (é curto: só copia `skills/editar` para `~/.claude/skills/editar` e roda o verificador).
3. **Node.js 22+** precisa existir. Se `node --version` falhar ou for menor que 22, dizer isso e oferecer instalar (Windows: `winget install -e --id OpenJS.NodeJS`; Mac: `brew install node`). Pedir OK antes.
4. Rodar `node "<pasta>/instalar.mjs" --completo`. Ele copia a skill, instala a transcrição local (Whisper em JS, em `~/.editar-motion`) e imprime um relatório JSON.
5. Para cada item do relatório com `"ok": false`, mostrar o comando do campo `instalar` e **pedir OK** antes de instalar programas (FFmpeg, Chrome, git, plugin do HyperFrames). O plugin do HyperFrames é recomendado:
   `claude plugin marketplace add heygen-com/hyperframes` e depois `claude plugin install hyperframes@hyperframes`.
6. Rodar `node "<pasta>/instalar.mjs"` de novo para confirmar que está `tudoOk`.
7. Avisar a pessoa, no idioma dela:
   - instalado em `~/.claude/skills/editar`;
   - **feche e abra o Claude Code** (ou comece uma conversa nova) para o `/editar` aparecer;
   - para usar: `/editar` + o vídeo.

Atualizar depois: é só repetir com o zip novo. As preferências que o Claude anotou ficam guardadas.
