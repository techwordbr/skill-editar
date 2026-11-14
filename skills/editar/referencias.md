# Referências estudadas (padrão de qualidade)

Vídeos de motion design usados como referência (2026-11-14). Analisados quadro a quadro (até 30 fps nos trechos rápidos) e o som medido (espectrograma + ataques). É **este** o nível de acabamento a buscar. As regras que saíram daqui estão no `estilos.md` (seções "Movimento de referência", "UI viva", "Som de referência" e "Fontes").

## R1 · Lista de perfis em vidro (anico_studio, 4 s, 60 fps, sem som)
- Card de vidro fosco (branco 55 %, blur, borda branca fina, reflexo no topo) inclinado em 3D (~rotateY 14°, rotateZ −4°), sobre um céu azul-claro em degradê.
- **Câmera nunca para:** começa colada no título "Profiles" (enorme, cortado) e faz um dolly-out contínuo de ~4 s com ease-out longo. Mesmo quando a lista termina, segue afastando bem devagar.
- **Cada linha entra de baixo e da frente**: nasce ~1,6× maior, mais inclinada e fora do quadro, sobe e encaixa em ~0,4 s (ease-out expo, sem quique). Escalonamento de ~0,65 s entre linhas. O rótulo da direita ("Admin", "Editor") aparece ~0,15 s depois do nome.
- Enquanto a linha nova entra, as de cima sobem um pouco para abrir espaço (layout vivo, nada pula).

## R2 · Explicativo verde (baikovphilipp, 47 s, música suave + SFX)
- Fundo escuro verde-petróleo com círculos/anéis gigantes desfocados que **giram e respiram** o tempo todo; mais tarde vira um fundo claro verde-limão. Muitas trocas: escuro → foto → claro → escuro → claro.
- **Texto palavra por palavra:** cada palavra entra com fade + subida curta, no ritmo da fala; a palavra-chave ganha **caixa de destaque** que se desenha da esquerda para a direita (degradê verde→amarelo) e depois a palavra muda de cor. Fonte grotesca leve (400) e a palavra forte em 800.
- Elemento-símbolo recorrente (estrelinha/flor amarela) que **viaja entre as cenas**, puxa a transição, gira e vira o ponto do "i". Linhas em arco desenham caminhos (stroke animado) que conectam uma cena à outra.
- **Dashboard monta peça por peça:** cards surgem de pontos, crescem com overshoot leve, gráficos desenham, tudo flutuando em camadas com profundidade diferente (parallax), câmera girando devagar em perspectiva.
- Foto real entra num retângulo e um anel 3D grosso (verde) passa na frente e atrás dela.
- Saída de texto: as letras se apagam de trás pra frente (como backspace) com cursor piscando.

## R3 · Landing page voando (baikovphilipp, 14,6 s, sem som)
- A página inteira deitada em perspectiva forte (~rotateX 55°). **A câmera voa ao longo dela** de cima para baixo, como um drone, parando ~0,5 s em cada seção e acelerando entre elas.
- Os títulos de cada seção **levantam da página** (eixo Z) e passam perto da câmera com **desfoque de movimento vertical forte**; ícones 3D (logos) flutuam acima da página e passam voando.
- No fim, puxa para trás mostrando a página toda, e um último movimento a coloca de pé, de frente, com o título final em cima.

## R4 · Sistema roxo com cursor 3D (pingmotiondesign, 4,4 s, sem som)
- Interface real de SaaS (tabela de orçamentos) em perspectiva, fundo lilás com esferas roxas desfocadas.
- **Cursor 3D grande (seta azul com volume e sombra)** guia o olhar; **a câmera persegue o cursor** com atraso suave (follow-cam), aproxima no botão "Create estimate" e o clique faz o botão afundar.
- As linhas da tabela entram empilhadas como cartas (cascata rápida, ~40 ms entre elas).
- Transição para a próxima tela: chicote lateral (whip) com blur; um documento **desenrola como papel** (curl 3D) de baixo para cima.

## R5 · Lançamento "lute" (wizart_studios, 38 s, trilha 140 BPM + SFX)
- Preto-esverdeado com brilho difuso e **uma cor de destaque só** (verde-água #2BF5B0). Fundo inteiro verde em flashes de 2–3 batidas.
- **Tudo cortado na batida:** trilha a 140 BPM (batida a cada 0,43 s); cortes e entradas de texto caem exatamente nos tempos (ex.: cortes em 1,80 e 2,64 s = 2 batidas).
- Texto: palavra comum branca fina + palavra-chave dentro de pílula/caixa colorida ("REWARDING", "FRIENDS", "rewarded"); o realce da palavra varre da esquerda para a direita. Números gigantes ("2x", "75%").
- Botões de UI vivos (Call It → Share): cursor 3D clica, o botão troca de cor e ícone com transição de cor, e o card de baixo troca valor com contagem (+35 % → +25 %).
- Pílulas conectadas por linha tracejada brilhante entram em sequência da esquerda (cada uma com blur horizontal); lista de recursos cresce de baixo como pilha e depois **rola rápido para cima com blur vertical**.
- Telas reais do produto inclinadas (desktop + celular 3D) com borda verde brilhante; ícones 3D (Discord, Telegram) com volume, girando devagar.
- Abre e fecha com o logo desenhado por traços.

## Som (o que dá pra medir)
- **R5:** trilha eletrônica marcada (kick grave forte a cada 0,43 s) é a base de tudo. Por cima: blips tonais curtos (~700 Hz, 0,1–0,15 s) quando cada pílula/item de lista aparece; whoosh descendente (2,7 kHz → 300 Hz em ~0,6 s) quando o bloco sai; a trilha **corta o grave** ~0,7 s antes de uma seção nova e volta junto com ela.
- **R2:** trilha suave de teclas/marimba. Por cima: brilhos agudos bem curtos (~7–8 kHz, 0,05–0,2 s) quando a estrelinha aparece ou pisca; batida grave macia (~550 Hz, 0,2–0,3 s) **~0,1 s antes** de cada troca de cena e nas palavras de destaque.
- Volume: SFX ficam 6–10 dB abaixo do pico da trilha; nunca brigam com a voz.
