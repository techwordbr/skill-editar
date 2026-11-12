---
name: editar
description: Atalho de edição de vídeo no estilo Motion SaaS. Use quando a pessoa mandar /editar junto com um vídeo (caminho ou arquivo anexado), ou pedir "edita esse vídeo". Abre uma página local para escolher o estilo de edição (tela dividida, ilustrativa com cartão, legenda cinética, holograma, PiP, review de software etc.), cores e detalhes, espera a escolha e então edita o vídeo em código com HyperFrames.
---

# /editar — escolher o estilo e editar

A pessoa NÃO quer escrever prompt de edição toda vez. O fluxo é: `/editar` + vídeo → tu abre a página → ela escolhe → tu edita.
Responder sempre no idioma da pessoa.

Os arquivos desta skill (pagina.html, servidor.mjs, preparar.mjs, transcrever.mjs, estilos.md) estão na **pasta desta skill**: o "Base directory" mostrado quando a skill carrega. Chamada abaixo de `<SKILL>`.

## 0. Primeira vez (ou se algo falhar)
Rodar `node "<SKILL>/preparar.mjs"` e ler o JSON:
- `node`, `ffmpeg`, `chrome` faltando → dizer o que falta e o comando de instalação que o relatório trouxe (`instalar`), e pedir OK antes de instalar programa no computador da pessoa.
- `transcricao` faltando → rodar `node "<SKILL>/preparar.mjs" --instalar` (instala o Whisper em JS em `~/.editar-motion`, ~1 GB de download do modelo na primeira transcrição). Avisar numa linha.
- `pluginHyperframes` faltando → é recomendado (ensina o HyperFrames): `claude plugin marketplace add heygen-com/hyperframes` e `claude plugin install hyperframes@hyperframes` (precisa de git; pedir OK). Sem ele, dá pra seguir com `npx hyperframes` e a documentação em https://hyperframes.heygen.com.
Isso não precisa repetir a cada vídeo: só se o relatório anterior não estiver `tudoOk` ou algo der erro.

## 1. Achar o vídeo
Caminho nos argumentos ou arquivo anexado. Se vier só o nome, procurar em Vídeos, Downloads e Área de Trabalho. Sem vídeo: perguntar qual é (uma linha) e parar.

## 2. Abrir a página de escolha (sem perguntar nada antes)
1. Rodar **em segundo plano** (`run_in_background: true`): `node "<SKILL>/servidor.mjs" "<caminho do vídeo>"`
2. Abrir `http://localhost:4791` (ou a porta que a saída imprimir): no navegador interno do app (`preview_start` com `url`) se existir; senão, abrir no navegador padrão (`start` no Windows, `open` no Mac, `xdg-open` no Linux).
3. Dizer numa linha: "Abri a página, escolhe lá e clica em **Editar assim**." e **terminar o turno**. Não fazer polling.
4. Quando ela clica, o servidor salva `<pasta do vídeo>/<nome>.edicao.json`, imprime `ESCOLHA_JSON: {...}` e encerra; tu é avisado pelo fim da tarefa. Se a pessoa disser "pronto" antes, ler o arquivo.
5. Reabrindo pro mesmo vídeo, a página já vem com a escolha anterior.

## 3. Ler a escolha
Campos: `formato` ("9:16" | "16:9" | "Os dois"), `estilos` (ids em ordem = prioridade do mix), `ajustes` {fundo, ritmo, legenda, cortes, sfx, musica, logos, motor, gancho} (cada um é uma lista), `cores` {destaque, efeitos, legenda} (listas de hex), `observacoes` (texto livre, **prioridade máxima**).
Ajuste com várias opções = alternar entre elas conforme a cena (ex.: ritmo ["Suave","Agressivo"] = suave nas explicações, agressivo nos ganchos; várias cores = cada cena/tópico usa a próxima da lista).
Responder numa linha o que entendeu e começar. Não pedir confirmação.

## 4. Editar (HyperFrames)
Receitas de cada estilo e regras de movimento: **[estilos.md](estilos.md)**. Ler antes de montar.

- Se o plugin do HyperFrames estiver instalado, carregar a skill `hyperframes:hyperframes` antes de tudo (contrato de render e ciclo de trabalho) e usar `hyperframes:hyperframes-registry` antes de construir à mão algo que já existe pronto (transições, kinetic type, legendas, gráficos, movimentos de câmera). Para sons, logos e recorte de pessoa: `hyperframes:media-use` (ferramentas locais gratuitas).
- `motor` = "Remotion" só se a pessoa já tiver um projeto Remotion configurado; senão usar HyperFrames e avisar numa linha.
- Projeto em `<pasta do vídeo>/<nome>-edicao/` (`npx hyperframes init`), preview com `npx hyperframes preview`, render com `npx hyperframes render`.

Passos:
1. Transcrever com tempo por palavra: `node ~/.editar-motion/transcrever.mjs "<vídeo>" "<projeto>/transcricao.json" [idioma]`. Idioma padrão: portuguese. Usar o idioma da pessoa.
2. Cortes conforme `ajustes.cortes` (pausas > ~0,35 s; frase repetida/errada fica só a última tentativa). Cortar com ffmpeg antes de montar, e transcrever de novo o vídeo cortado (ou recalcular os tempos).
3. Dividir em cenas pelo sentido da fala (cada ideia = uma cena = troca de fundo/layout). Aplicar os estilos escolhidos na ordem; com `automatico` ou vários estilos, escolher por cena o que encaixa no que está sendo dito.
4. Elementos sincronizados com as palavras (aparecem quando a pessoa fala, não antes).
5. **Mandar prévias (frames/trechos curtos) enquanto monta**, antes do render final.
6. Render final ao lado do vídeo original: `<nome>-editado.mp4` (e `-vertical` / `-horizontal` se "Os dois").

## 5. Depois
Se a pessoa corrigir algo de gosto, anotar no fim do estilos.md (seção "Preferências desta pessoa") pra próxima vez já vir certo.
