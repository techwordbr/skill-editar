# /editar: edição Motion SaaS no Claude Code

Manda um vídeo, escolhe numa página **como** ele vai ser editado, e o Claude edita em código.

```
/editar C:\Videos\meu-video.mp4
```

Abre uma página (azul, estilo Liquid Glass) com prévias animadas de cada estilo:

- **Vertical (Shorts/Reels/TikTok):** tela dividida, ilustrativa + cartão, legenda cinética, recorte/holograma, só elementos
- **Horizontal (YouTube):** ilustrativa + PiP, lado a lado, review de software, zoom dinâmico, apresentação animada
- **Automático:** o Claude escolhe cena a cena

Também dá pra escolher cores (destaque, efeitos, legenda), ritmo do movimento, legenda, cortes, efeitos sonoros, música, gancho, e escrever observações. Tudo aceita mais de uma opção.

Tudo roda **no teu computador**: nada é enviado pra servidor nenhum além do que o próprio Claude Code já usa.

## Precisa ter

- [Claude Code](https://claude.com/claude-code)
- Node.js 22 ou mais novo
- FFmpeg
- Google Chrome (ou o HyperFrames baixa um)
- git (só pra instalar plugins)

Na primeira vez, o próprio Claude confere o que falta e te mostra o comando pra instalar.

## Instalar

### Jeito 1: plugin (recomendado, recebe atualizações)

No terminal:

```bash
claude plugin marketplace add <usuario-do-github>/skill-editar
```

```bash
claude plugin install editar@editar
```

E o motor de vídeo que a skill usa:

```bash
claude plugin marketplace add heygen-com/hyperframes
```

```bash
claude plugin install hyperframes@hyperframes
```

Depois é só abrir o Claude Code e mandar `/editar` com o vídeo.

### Jeito 2: copiar a pasta

Copia a pasta `skills/editar` para:

- Windows: `C:\Users\<teu-usuário>\.claude\skills\editar`
- Mac/Linux: `~/.claude/skills/editar`

## Como funciona por dentro

1. `servidor.mjs` abre a página em `http://localhost:4791` e mostra o teu vídeo.
2. Quando tu clica em **Editar assim**, a escolha é salva ao lado do vídeo (`<nome>.edicao.json`) e o Claude é avisado.
3. O Claude transcreve o áudio localmente (Whisper, `transcrever.mjs`), corta pausas e erros, divide em cenas e monta a edição com [HyperFrames](https://github.com/heygen-com/hyperframes) seguindo as regras do `estilos.md`.
4. Manda prévias enquanto monta e renderiza o vídeo final ao lado do original.

## Estilo Motion SaaS

- O zoom nunca fica parado: aproxima, acelera, freia, reenquadra.
- O fundo troca a cada ideia.
- Os elementos entram rápido, ficam se mexendo devagar e saem acelerando.
- Tudo é sincronizado com a fala.
