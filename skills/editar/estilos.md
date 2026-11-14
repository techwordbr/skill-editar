# Estilos de edição — receitas

## Regras Motion SaaS (valem para TODOS os estilos)
1. **Nada fica parado.** Zoom, câmera, fundo e elementos estão sempre em movimento.
2. **Zoom vivo:** nunca um zoom fixo. É uma curva contínua que se aproxima, às vezes acelera, às vezes freia, reenquadra para os lados. Implementar com vários keyframes de escala/posição em intervalos desiguais e easings diferentes (ex.: 1.00 → 1.07 rápido → 1.09 bem devagar → 1.20 rápido → 1.22 devagar → volta). Nunca linear, nunca duas etapas com a mesma velocidade.
3. **Elemento entra rápido e com overshoot** (escala 0.55 → 1.08 → 1.0 em ~0,3 s), **depois deriva devagar** (translate/rotate pequenos, 3–6 %) enquanto ele explica. Se ficar muito tempo na tela, alternar ritmo: lento → acelera um pouco → lento de novo. **Sai acelerando** (ease-in, ~0,25 s) com blur de movimento.
4. **Fundo troca o tempo todo:** a cada ideia/cena nova o fundo muda (cor, gradiente, grade, formas). Mesmo dentro da cena ele gira/desliza devagar.
5. **Tempo certo:** o elemento fica o tempo da explicação, sincronizado com a palavra que dispara ele, nem antes nem depois.
6. Visual: cards escuros com borda clara fina e sombra profunda (ou brancos no fundo branco), telas/interfaces em perspectiva 3D, motion blur nas transições, títulos grossos (Inter 800–900, tracking negativo). Cores: `cores.destaque` nos títulos/números/palavras fortes, `cores.efeitos` em brilhos/linhas/barras/partículas/transições, `cores.legenda` na palavra-chave da legenda. Papel com várias cores = cada cena/tópico usa a próxima da lista (nunca misturar todas na mesma cena).
7. SFX (se ligado): sons reais de motion graphics (via `hyperframes:media-use` ou sons que a pessoa tiver): whoosh nas transições, pop suave quando elemento entra, clique quando cursor clica, teclado quando texto é digitado. Ganho ~0,6 (baixo) ou ~0,8 (médio). Nada de som sintetizado com cara de bipe.
8. Logos: imagens reais das marcas (de preferência versões 3D/brilhantes), girando em perspectiva CSS. Nunca extrusão 3D feita em código, fica falso.

## Movimento de referência (nível de acabamento — ver [referencias.md](referencias.md))
1. **Câmera contínua:** a câmera virtual (scale + translate + rotateX/Y no contêiner da cena) está sempre em movimento: dolly-in/out longo (3–6 s, ease-out) por baixo, e por cima os movimentos curtos de foco. Nunca dois segundos idênticos.
2. **Entrada em camada:** o elemento nasce **maior e mais perto da câmera** (scale 1.4–1.7, mais inclinado, parte fora do quadro, blur 6–10 px) e **assenta** no lugar em 0,35–0,45 s com ease-out expo (`cubic-bezier(.16,1,.3,1)`), sem quique. O overshoot (0.55→1.08→1) fica para elementos pequenos (chips, ícones, botões).
3. **Escalonamento:** itens de lista/linhas de tabela entram um por um a cada 0,5–0,7 s quando a pessoa está explicando, ou em cascata rápida (40–60 ms) quando é só "aparecer a tela". Os itens já na tela se reacomodam suavemente.
4. **Desfoque de movimento direcional** sempre que algo anda rápido (câmera, whip, rolagem, saída): blur no eixo do movimento, proporcional à velocidade (em CSS: `filter:blur()` nos quadros rápidos + cópia esticada com opacidade baixa; no HyperFrames, usar o bloco de motion blur do registry).
5. **Profundidade:** 3 planos no mínimo (fundo desfocado, plano da UI, plano da frente com cursor/ícones/títulos). Cada plano anda numa velocidade (parallax). Títulos podem "levantar" da UI no eixo Z.
6. **Fio condutor:** um elemento-símbolo (estrela, ponto, logo, anel na cor de efeitos) atravessa as cenas e puxa as transições; traços (stroke) se desenham para ligar uma ideia à outra.
7. **Texto vivo:** palavra por palavra (fade + subida 8–12 %), palavra-chave com **caixa de realce que varre da esquerda** na cor de destaque, ou dentro de pílula. Saída como backspace (letras somem de trás pra frente) ou blur pra cima.
8. **Troca de cena:** whip com blur, flash de cor cheia (2–3 batidas), zoom atravessando um elemento, ou o elemento-símbolo crescendo até cobrir a tela. Cortes caem na batida da trilha quando houver trilha.
9. Componentes vivos: botões trocam de estado com transição de cor/ícone; números contam; gráficos se desenham; toggles deslizam; cards trocam valores. Nada aparece pronto e parado.

### Ritmo (`ajustes.ritmo`)
- **Suave:** zoom 1.00–1.12, trocas de fundo a cada ~6–8 s.
- **Médio:** zoom 1.00–1.25, trocas a cada ~3–5 s, punch-ins nas palavras-chave.
- **Agressivo:** zoom até 1.5, reenquadres rápidos, troca a cada 1,5–3 s, shake leve nos impactos.

## Vertical 9:16
### `tela-dividida`
Metade de cima (0–50 %): informação (gráficos, títulos, prints, logos), com fundo próprio trocando a cada ideia. Metade de baixo (50–100 %): ele, reenquadrado no rosto/tronco, com zoom vivo. Legenda na linha divisória (~46 %). Elementos de cima entram no momento da fala.

### `ilustrativa-cartao`
Fala direta: ele em tela cheia. Na explicação: ele encolhe (transição rápida com ease-out, ~0,35 s) para um cartão retrato arredondado num canto (≈34 % largura, borda clara e sombra, flutuando devagar) e os elementos ocupam a tela. Volta pra tela cheia no fecho/gancho. Variar o canto entre cenas.

### `legenda-cinetica`
Ele tela cheia, zoom vivo forte. Palavras gigantes (caixa alta, 900) entrando uma a uma no tempo exato da fala, com pop; palavras-chave na cor de destaque/amarelo. Punch-in de zoom nas palavras-chave.

### `holograma`
Recorte da pessoa (cutout via `hyperframes:media-use`). Atrás: fundo trocando + texto gigante vazado derivando devagar. Na frente: chips/logos passando. Pode ter clones holográficos nos momentos de impacto.

### `tela-cheia-elementos`
Ele aparece só no gancho e no fecho; no meio, 100 % animação (interfaces 3D, passos numerados, gráficos), com a voz dele por cima.

## Horizontal 16:9
### `ilustrativa-pip`
Elementos e interfaces 3D ocupam a tela. Ele num **cartão vertical (retrato, não quadrado)** centralizado verticalmente no lado direito, flutuando.

### `lado-a-lado`
Ele em ~44 % da esquerda (zoom vivo); à direita, tópicos entrando um a um com bullet colorido, fundo mudando a cada tópico.

### `review-software`
Fundo BRANCO dinâmico (gradientes claros e grade sutil se movendo), interface do programa **recriada em código** (não gravação de tela), funcionando passo a passo, inclinada em 3D, câmera chegando perto de cada detalhe citado; títulos grandes pretos; cursor animado com cliques. Ele em cartão vertical à direita.

### `zoom-dinamico`
Ele sempre em tela, câmera nunca parada (aproxima, reenquadra, acelera e freia). Títulos fortes e chips nas frases-chave; fundo atrás dele pode trocar via recorte.

### `slides`
Títulos e listas grandes animados como slides vivos (cada item entra rápido e deriva). Ele numa bolha redonda num canto, com borda na cor de destaque, sempre visível.

## 9:16 e 16:9
### `ui-viva` (sistema/programa ganhando vida)
O programa citado (ex.: OBS, Canva, ChatGPT, um SaaS) **recriado em código como se fosse uma gravação de tela**, mas viva, e a câmera passeia pelas funções conforme a pessoa fala.
1. **Remontar a interface de verdade**: layout, ícones, textos e cores do programa real (procurar prints oficiais/da documentação; sem logos inventados). Componentes em HTML/CSS, nunca vídeo gravado.
2. **Roteiro de câmera pela fala**: para cada frase que cita uma função ("aqui você clica para gravar"), a câmera viaja até ela em perspectiva 3D (rotateX 8–20°, rotateY ±10–25°), chega perto (scale 1.6–2.6 no detalhe), segura viva (drift lento) e segue para o próximo ponto. Entre pontos: aceleração com motion blur. A cada 2–3 pontos, puxar para trás e mostrar o todo.
3. **Cursor 3D** (seta com volume, sombra e brilho na cor de efeitos) leva o olhar; a câmera segue o cursor com atraso suave. Clique = botão afunda (scale .94) + onda de clique + estado novo (cor/ícone/tela). Hover acende o botão antes do clique.
4. **A UI se monta enquanto a pessoa fala**: janela entra em camada, barras laterais deslizam, linhas da tabela em cascata, cards nascem de pontos, gráficos desenham, números contam. Tooltip/etiqueta curta aponta a função ("Iniciar gravação") com a palavra-chave em destaque.
5. Fundo: degradê suave com esferas/formas desfocadas que respiram (claro ou escuro conforme `ajustes.fundo`), sempre atrás da UI em outro plano.
6. Elementos extras conforme `ajustes.elementos`: **3D realista** = celular/notebook 3D com reflexo, ícones 3D com volume e iluminação (imagens 3D reais ou modelos, nunca extrusão "de plástico"); **2D Material 3** = formas chapadas, cantos 16–28 px, cores tonais do Material You, elevação por sombra suave, ícones Material Symbols, movimento com as curvas do Material (emphasized `cubic-bezier(.2,0,0,1)`).
7. A pessoa (se houver vídeo dela) em cartão vertical flutuante; em 9:16 a UI fica em cima ou ocupa a tela com ela num cartão pequeno. Só áudio = 100 % UI viva.

### `motion-explicativo` (só motion design, ideal para narração sem vídeo)
Narração animada inteira: texto palavra por palavra com realce, formas e anéis desfocados no fundo, elemento-símbolo atravessando as cenas, ícones e mini-interfaces que se montam, números gigantes, flashes de cor cheia nas viradas, cortes na batida da trilha. Cada frase da narração = uma composição nova; nunca repetir o mesmo layout duas vezes seguidas.

### `automatico`
Escolher cena a cena entre os estilos acima conforme o conteúdo: lista → lado-a-lado/slides; número/resultado → tela-dividida ou título gigante; ferramenta/programa → ui-viva (ou review-software/ilustrativa-pip); explicação abstrata → motion-explicativo; frase de impacto → legenda-cinetica/zoom-dinamico.

## Ajustes
- `fundo`: escuro trocando / branco trocando / alternar entre cenas / livre.
- `legenda`: palavra por palavra | frase curta (2–4 palavras) | só palavras-chave | sem.
- `gancho`: "forte com título" = primeiros 3 s com zoom rápido + título gigante da promessa do vídeo.
- `musica`: só se pedir; "baixinha" = −24 dB sob a voz, com ducking. "Trilha marcando o ritmo" = trilha eletrônica/motion (110–140 BPM) a ~−20 dB sob a voz com ducking; cortes, entradas de texto e flashes **na batida** (calcular a grade de tempos pelo BPM e encaixar os eventos da fala no tempo mais próximo, ±60 ms); tirar o grave ~0,5–0,7 s antes de uma virada grande e voltar junto com ela.
- `elementos`: "3D realista" / "2D Material 3" / os dois (3D nos destaques, 2D no resto) — ver `ui-viva` item 6.
- `fontes` (jeitos de misturar) + `fontesDetalhe` {bold, serifa, escrita, texto} (as famílias marcadas, com `arquivo` local ou `google`). Catálogo em [fontes.json](fontes.json). Se a pessoa tiver uma pasta de fontes, pôr o caminho em `"pasta"` no fontes.json e o `arquivo` de cada família (relativo à pasta); sem pasta, usa o Google Fonts.
  - **Mistura viral**: a frase mistura vozes: palavras comuns em texto (400–500), a palavra de impacto em **bold condensada caixa alta**, uma palavra de contraste em **serifada itálica** e às vezes uma em **escrita**. Ex.: "o **MELHOR** *jeito* de ~editar~". A escrita fica ~1,3× maior e um pouco abaixo da linha; a bold pode ser 1,5–2× maior que o resto.
  - Bold + serifa / Bold + escrita / Só bold / Limpa SaaS = só essas vozes. Vários jeitos marcados = variar por cena.
  - Várias famílias marcadas num papel = alternar entre blocos do vídeo; nunca mais de 2 famílias de "voz forte" na mesma tela além do texto.
  - Telas de sistema (UI viva) sempre com a fonte de **texto**, como no programa real.
  - Nunca usar fontes DEMO / "personal use only" em vídeo comercial.

## Som de referência
- **Mapa de SFX por evento** (sons reais via `hyperframes:media-use` ou da pessoa, nunca sintetizado):
  - elemento / item de lista aparecendo → blip/pop tonal curto e limpo (0,1–0,15 s);
  - brilho, estrela, partícula, check → sparkle agudo curto (0,05–0,2 s), bem baixo;
  - câmera viajando / whip / bloco saindo → whoosh (descendente na saída, ascendente na entrada), começando ~0,1 s antes do movimento;
  - troca de cena / palavra de impacto → batida grave macia (thump) ~0,1 s antes do corte;
  - clique do cursor → clique de mouse/UI seco; digitação → teclado por letra;
  - virada grande → riser curto (0,6–1 s) terminando exatamente no corte.
- SFX 6–10 dB abaixo da voz (ganho ~0,5–0,7), variando a amostra a cada uso (nunca o mesmo arquivo 3× seguidas). Nunca SFX em mais de ~1 evento a cada 0,25 s: se houver cascata, só o primeiro e o último item tocam.

## Áudio sem vídeo (`midia: "audio"`)
Quando a pessoa manda só a narração: o vídeo é **100 % animação** (estilos `ui-viva`, `motion-explicativo` ou `automatico` entre os dois). Transcrever com tempo por palavra, cortar pausas/erros do áudio conforme `ajustes.cortes`, e cada frase vira um evento visual sincronizado. Texto na tela é o principal portador da fala.

## Preferências desta pessoa
(o Claude anota aqui as correções de gosto, para a próxima edição já vir certa)

