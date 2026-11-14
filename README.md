# /editar: edição Motion SaaS no Claude Code

Manda um vídeo, escolhe numa página **como** ele vai ser editado, e o Claude edita em código.

```
/editar C:\Videos\meu-video.mp4
```

Também funciona **só com o áudio** de uma narração (`/editar C:\Audios\narracao.mp3`): aí o vídeo sai 100% animado.

E **sem vídeo nenhum**, só com a ideia (`/editar vídeo de 30 s vendendo meu sérum`): abre a aba **Criar com IA**. Tu manda a foto do produto e do influenciador (ou pede pra gerar a pessoa), escolhe as cenas (ganchos virais como mão na câmera, levantando da cadeira, vlog; produto em POV, olhando pra câmera, review com narração; chamada final) e o narrador. O Claude escreve o roteiro e gera tudo no **Google Flow** pelo navegador, com a tua conta (Nano Banana pras imagens, Veo pros vídeos com fala). Narração grátis no teu PC com **Kokoro** ou com **a tua voz clonada** (Chatterbox).

Abre uma página (azul, estilo Liquid Glass) com prévias animadas de cada estilo:

- **UI viva (novo):** o programa que tu cita é recriado em código como se fosse gravação de tela, mas vivo. A câmera passeia em 3D pelas funções, um cursor 3D clica e a interface se monta enquanto tu fala.
- **Motion explicativo (novo):** só motion design, com palavras entrando com realce, formas vivas, um símbolo que atravessa as cenas e cortes na batida.
- **Vertical (Shorts/Reels/TikTok):** tela dividida, ilustrativa + cartão, legenda cinética, recorte/holograma, só elementos
- **Horizontal (YouTube):** ilustrativa + PiP, lado a lado, review de software, zoom dinâmico, apresentação animada
- **Automático:** o Claude escolhe cena a cena

Também dá pra escolher:
- cores (destaque, efeitos, legenda);
- **fontes**, misturando bold, serifada e escrita no mesmo título (e dá pra usar tua própria pasta de fontes);
- **elementos 3D realistas ou 2D estilo Material 3**;
- **o programa que aparece no vídeo**: se o Claude não conhecer, tu cola o link do site/documentação e arrasta (ou cola com Ctrl+V) prints da tela. Ele estuda, refaz a interface em código e anima;
- ritmo, legenda, cortes, efeitos sonoros, trilha marcando o ritmo e gancho;
- observações livres.

Tudo aceita mais de uma opção. As regras de movimento e de som vêm de vídeos de motion design de referência, analisados quadro a quadro (`skills/editar/referencias.md`).

Tudo roda **no teu computador**: nada é enviado pra servidor nenhum além do que o próprio Claude Code já usa.

## Precisa ter

- [Claude Code](https://claude.com/claude-code)
- Node.js 22 ou mais novo
- FFmpeg
- Google Chrome (ou o HyperFrames baixa um)
- git (só pra instalar plugins)

Na primeira vez, o próprio Claude confere o que falta e te mostra o comando pra instalar.

## Instalar

### Jeito mais fácil: pedir pro Claude instalar

1. Clica no botão verde **Code** → **Download ZIP** (ou usa o `skill-editar.zip` que te mandaram).
2. Abre o **Claude Code** (o app do Claude na aba Code, ou `claude` no terminal). O chat comum do claude.ai não instala nada no teu computador.
3. Manda o zip (ou o caminho dele) e escreve: **"instala essa skill"**.

O Claude lê o `INSTALAR.md`, descompacta, copia a skill, instala a transcrição e confere o que mais falta (pedindo tua permissão antes de instalar qualquer programa). No fim é só abrir uma conversa nova e mandar `/editar` com o vídeo.

### Jeito 2: plugin (recebe atualizações)

No terminal:

```bash
claude plugin marketplace add techwordbr/skill-editar
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

### Jeito 3: copiar a pasta na mão

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
