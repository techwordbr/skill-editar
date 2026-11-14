# Gera narração com Chatterbox Multilingual (grátis, local), clonando a voz de uma gravação curta.
# Uso: python chatterbox_falar.py "<texto ou .txt>" <saida.wav> <referencia.wav> [exagero 0.5] [cfg 0.5]
import os, sys, re, time
import torch, torchaudio

# os pesos foram salvos em GPU; aqui roda no processador
_load = torch.load
torch.load = lambda *a, **k: _load(*a, **{**k, 'map_location': k.get('map_location', 'cpu')})
torch.set_num_threads(max(1, (os.cpu_count() or 4) - 1))

from chatterbox.mtl_tts import ChatterboxMultilingualTTS

texto = sys.argv[1]
if os.path.isfile(texto):
    texto = open(texto, encoding='utf-8').read()
saida, ref = sys.argv[2], sys.argv[3]
exag = float(sys.argv[4]) if len(sys.argv) > 4 else 0.5
cfg = float(sys.argv[5]) if len(sys.argv) > 5 else 0.5

t0 = time.time()
modelo = ChatterboxMultilingualTTS.from_pretrained(device='cpu')
# frases curtas soam melhor: gera frase por frase e junta com respiro curto
frases = [f.strip() for f in re.split(r'(?<=[.!?…])\s+', texto.strip()) if f.strip()]
pedacos = []
for f in frases:
    w = modelo.generate(f, language_id='pt', audio_prompt_path=ref, exaggeration=exag, cfg_weight=cfg)
    pedacos += [w, torch.zeros(1, int(modelo.sr * 0.18))]
audio = torch.cat(pedacos[:-1], dim=1)
torchaudio.save(saida, audio, modelo.sr)
print(f'VOZ_OK: {saida} ({audio.shape[1]/modelo.sr:.1f}s em {time.time()-t0:.0f}s)')
