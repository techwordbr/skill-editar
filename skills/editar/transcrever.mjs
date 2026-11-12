// Transcreve um vídeo com Whisper (local, em JS) e salva cada palavra com o tempo.
// Fica copiado em ~/.editar-motion (onde estão as dependências) pelo preparar.mjs.
// Uso: node ~/.editar-motion/transcrever.mjs "video.mp4" "saida.json" [idioma=portuguese]
import { pipeline } from '@huggingface/transformers';
import wavefile from 'wavefile';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [video, saida, idioma = 'portuguese'] = process.argv.slice(2);
if (!video || !saida) { console.error('uso: transcrever.mjs <video> <saida.json> [idioma]'); process.exit(1); }

const wavTmp = path.join(os.tmpdir(), `editar-audio-${Date.now()}.wav`);
const ff = process.env.FFMPEG || 'ffmpeg';
const r = spawnSync(ff, ['-hide_banner', '-loglevel', 'error', '-y', '-i', video, '-vn', '-ac', '1', '-ar', '16000', '-c:a', 'pcm_f32le', wavTmp], { stdio: 'inherit' });
if (r.status !== 0) { console.error('ffmpeg falhou ao extrair o áudio'); process.exit(1); }

const wav = new wavefile.WaveFile(fs.readFileSync(wavTmp));
fs.rmSync(wavTmp, { force: true });
wav.toBitDepth('32f');
wav.toSampleRate(16000);
let amostras = wav.getSamples();
if (Array.isArray(amostras)) amostras = amostras[0];

const asr = await pipeline('automatic-speech-recognition', 'onnx-community/whisper-small_timestamped', { dtype: 'fp32' });
const out = await asr(amostras, { language: idioma, task: 'transcribe', return_timestamps: 'word', chunk_length_s: 30, stride_length_s: 5 });

const palavras = out.chunks.map((c) => ({ w: c.text.trim(), s: c.timestamp[0], e: c.timestamp[1] }));
fs.mkdirSync(path.dirname(path.resolve(saida)), { recursive: true });
fs.writeFileSync(saida, JSON.stringify({ texto: out.text.trim(), palavras }, null, 1));
console.log(`ok: ${palavras.length} palavras → ${saida}`);
