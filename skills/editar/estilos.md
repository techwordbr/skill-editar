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

### `automatico`
Escolher cena a cena entre os estilos acima conforme o conteúdo: lista → lado-a-lado/slides; número/resultado → tela-dividida ou título gigante; ferramenta/programa → review-software/ilustrativa-pip; frase de impacto → legenda-cinetica/zoom-dinamico.

## Ajustes
- `fundo`: escuro trocando / branco trocando / alternar entre cenas / livre.
- `legenda`: palavra por palavra | frase curta (2–4 palavras) | só palavras-chave | sem.
- `gancho`: "forte com título" = primeiros 3 s com zoom rápido + título gigante da promessa do vídeo.
- `musica`: só se pedir; "baixinha" = −24 dB sob a voz, com ducking.

## Preferências desta pessoa
(o Claude anota aqui as correções de gosto, para a próxima edição já vir certa)

