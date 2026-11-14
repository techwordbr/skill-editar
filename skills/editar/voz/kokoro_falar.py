# Gera narração com Kokoro (grátis, local, CPU).
# Uso: python kokoro_falar.py "<texto ou caminho .txt>" <saida.wav> [voz] [velocidade]
# Vozes pt-BR: pf_dora (feminina), pm_alex, pm_santa (masculinas).
import os, sys, soundfile as sf
from kokoro_onnx import Kokoro

aqui = os.path.dirname(os.path.abspath(__file__))
texto = sys.argv[1]
if os.path.isfile(texto):
    texto = open(texto, encoding='utf-8').read()
saida = sys.argv[2]
voz = sys.argv[3] if len(sys.argv) > 3 else 'pm_alex'
vel = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0

k = Kokoro(os.path.join(aqui, 'kokoro', 'kokoro-v1.0.onnx'), os.path.join(aqui, 'kokoro', 'voices-v1.0.bin'))
amostras, sr = k.create(texto, voice=voz, speed=vel, lang='pt-br')
sf.write(saida, amostras, sr)
print(f'VOZ_OK: {saida} ({len(amostras)/sr:.1f}s, {voz})')
