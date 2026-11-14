# Criar com IA: cenas, prompts e o passo a passo no Google Flow

Usado quando a escolha vem com `modo: "ia"`. O vídeo é gerado no **Google Flow** (labs.google/fx/tools/flow), pelo navegador interno, com a conta da pessoa: **Nano Banana** faz as imagens (influenciador + produto), **Veo** anima cada imagem já com a fala (a voz é a do próprio Veo). Depois a edição final segue o estilos.md (legenda, cortes, SFX, motion por cima).

## Campos de `ia`
- `ideia` / `roteiro` + `roteiroModo` ("Eu escrevo" = tu escreve a partir da ideia; "Meu roteiro" = usar o texto da pessoa, só dividindo em falas).
- `produto` {nome, descricao, imagens[]} — fotos do produto (caminhos locais).
- `influenciador` {modo: "foto" | "gerar", imagens[], descricao} — foto(s) da pessoa, ou descrição para gerar no Nano Banana.
- `cenas` — ids na ordem do vídeo (cada uma = 1 imagem + 1 clipe de ~8 s).
- `voz` {motor: "Voz do Flow (Veo)" | "Kokoro" | "Minha voz (Chatterbox)", narrador} — quem fala. Em cenas de review/sem fala, a narração por cima vem do motor escolhido.
- `cenario`, `duracao`, `idioma` (padrão português do Brasil).

## Roteiro
1. Escrever (ou adaptar) o roteiro em falas curtas, **uma por cena**, ~18–22 palavras por clipe de 8 s (o Veo fala ~2,5 palavras/s). Gancho = frase de 1–2 s que prende ("Para tudo. Isso aqui mudou minha rotina.").
2. Mostrar o roteiro dividido por cena numa mensagem curta e **seguir** (a pessoa aprova ou corrige; não travar esperando se a pessoa já mandou o roteiro pronto).

## Cenas (`ia.cenas`) — receita de imagem (Nano Banana) e de vídeo (Veo)
Regras gerais dos prompts: em inglês (o Veo entende melhor), mas a **fala entre aspas em português do Brasil**, com "speaks in Brazilian Portuguese". Sempre: "vertical 9:16" (ou 16:9), "shot on iPhone, natural light, UGC style, realistic skin texture", "no subtitles, no text on screen, no music". Mesma roupa, cabelo e cenário em todas as cenas (copiar a descrição fixa do influenciador e do cenário em todo prompt). Produto sempre com o rótulo virado para a câmera e igual à foto.

### Ganchos
- `gancho-mao` · **Mão na câmera**: imagem = influenciador com a palma da mão bem perto da lente, desfocada, rosto atrás em foco. Vídeo = "the hand moves away from the lens revealing her face, she leans in and says: '<fala>'".
- `gancho-aproxima` · **Se aproximando da câmera**: imagem = plano médio, a 2 m. Vídeo = "walks quickly toward the camera until a close-up, stops and says: '<fala>'".
- `gancho-entra` · **Entrando na frente da câmera**: imagem = cenário vazio com ele/ela entrando pela lateral. Vídeo = "steps into frame from the side, looks straight into the lens and says: '<fala>'".
- `gancho-levanta` · **Levantando da cadeira**: imagem = sentado(a) numa cadeira, olhando para baixo/para o celular. Vídeo = "stands up from the chair, looks up into the camera with surprise and says: '<fala>'".
- `gancho-vlog` · **Puxando a câmera (vlog)**: imagem = selfie com o braço esticado, rua/casa ao fundo. Vídeo = "handheld selfie vlog, she pulls the camera along while walking, camera shakes naturally, says: '<fala>'".

### Produto
- `produto-pov` · **POV**: imagem = visão em primeira pessoa, mãos segurando o produto perto da lente. Vídeo = "first-person POV, hands rotate the product slowly, opening it, close details, voice-over: '<fala>'" (fala vira narração).
- `produto-olhando` · **Olhando pra câmera mostrando o produto**: imagem = segurando o produto ao lado do rosto, olhando para a lente. Vídeo = "holds the product next to her face, points to it and says to the camera: '<fala>'".
- `produto-frente` · **De frente falando (UGC)**: imagem = plano médio de frente, produto na mão ou na mesa. Vídeo = "talking to camera, natural gestures, picks up the product, says: '<fala>'".
- `review` · **Review (só o produto + narração)**: imagem = produto em close numa mesa bonita do cenário, luz suave. Vídeo = "slow cinematic macro shots of the product, gentle camera orbit, hands using it, no talking"; a fala desta cena vira **narração por cima** (motor de `ia.voz`; se for "Voz do Flow", pedir no prompt "calm voice-over narration in Brazilian Portuguese: '<fala>'").

### Final
- `cta` · **Chamada final**: imagem = sorrindo com o produto, apontando para baixo. Vídeo = "smiles, points down toward the link and says: '<fala>'".

## Passo a passo no Flow (navegador interno)
1. `preview_start` com `url: "https://labs.google/fx/tools/flow"`. Se pedir login, pedir para a pessoa entrar no painel (nunca digitar senha). Ler a tela com `read_page`/screenshot antes de clicar: a interface muda, então guiar-se pelo que aparece, não por posições fixas.
2. Antes de gerar, dizer numa linha quantas gerações vão sair (N imagens + N vídeos) e que isso gasta créditos do plano da pessoa no Flow. A escolha da pessoa na página ("Enviar pro Google Flow") já é o OK para gerar; para **baixar** os resultados, pedir o OK uma vez no chat listando os arquivos.
3. Novo projeto com o nome do vídeo. **Imagens (Nano Banana):** enviar as fotos do produto e do influenciador como referência (ingredientes) e gerar **uma imagem por cena** com a receita acima. Se `influenciador.modo = "gerar"`, gerar primeiro o rosto/corpo a partir da descrição, escolher o melhor e usá-lo como referência de todas as cenas (mesma pessoa).
4. Mostrar as imagens para a pessoa (baixar/printar) e seguir, salvo se a pessoa pedir troca.
5. **Vídeos (Veo):** para cada imagem, "frames to video" / imagem inicial com o prompt da cena (8 s, com áudio). Conferir cada clipe: fala certa, produto sem deformar, sem texto na tela. Regerar só o que falhar.
6. Baixar os clipes para `<projeto>/clipes/NN-<cena>.mp4`.
7. Edição final: juntar na ordem, transcrever (tempo por palavra), cortar respiros, legenda nas fontes escolhidas, SFX do mapa do estilos.md, e motion por cima quando ajudar (preço, benefícios, setas no produto). Render em `<projeto>/<nome>-ia.mp4`.

## Narração fora do Flow
Amostras para ouvir na página ficam em `~/.editar-motion/voz/amostras/` (o servidor lista essa pasta). A referência de voz é `~/.editar-motion/voz/minha-voz-referencia.wav`: 10–20 s da pessoa falando normal, sem música (pedir uma gravação ou recortar de um vídeo dela, com OK).
No processador: Kokoro ~2× mais rápido que o tempo real; Chatterbox alguns minutos por minuto de áudio.
- Kokoro: `<python da voz> ~/.editar-motion/voz/kokoro_falar.py "<texto>" <saida.wav> <voz>` — vozes pf_dora, pm_alex, pm_santa (rápido; "truque" e algumas palavras soam estranhas: trocar por sinônimo).
- Minha voz (Chatterbox, clona a voz da pessoa): `<python da voz> ~/.editar-motion/voz/chatterbox_falar.py "<texto>" <saida.wav> ~/.editar-motion/voz/minha-voz-referencia.wav` — lento no processador (minutos por minuto de áudio): rodar em segundo plano.

### Instalar as vozes grátis (só na primeira vez, pedir OK: ~2–3 GB)
`<python da voz>` = `~/.editar-motion/voz/venv/Scripts/python.exe` (Windows) ou `~/.editar-motion/voz/venv/bin/python` (Mac/Linux). Precisa de Python 3.10–3.12.
1. `python -m venv ~/.editar-motion/voz/venv` e copiar `<SKILL>/voz/*.py` para `~/.editar-motion/voz/`.
2. Kokoro: `<python da voz> -m pip install kokoro-onnx soundfile` e baixar `kokoro-v1.0.onnx` e `voices-v1.0.bin` de https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0 para `~/.editar-motion/voz/kokoro/`.
3. Chatterbox (clona a voz): `<python da voz> -m pip install chatterbox-tts "setuptools<81" --extra-index-url https://download.pytorch.org/whl/cpu` (o setuptools é obrigatório: sem ele o watermark do Chatterbox não carrega). O modelo baixa sozinho na primeira geração.
4. Gerar amostras (uma frase igual em cada voz) em `~/.editar-motion/voz/amostras/` com nomes `kokoro-<voz>.wav` e `chatterbox-<nome>.wav`: a página mostra essas amostras para ouvir.