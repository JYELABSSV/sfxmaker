import assert from 'node:assert/strict';
import { build } from 'esbuild';
const result=await build({absWorkingDir:process.cwd(),tsconfigRaw:{compilerOptions:{target:'ES2022'}},entryPoints:['src/audio/presets.ts','src/audio/duration.ts','src/audio/wavEncoder.ts'],bundle:true,platform:'neutral',format:'esm',write:false,outdir:'out'});
const modules=await Promise.all(result.outputFiles.map(f=>import('data:text/javascript;base64,'+Buffer.from(f.text).toString('base64'))));
const presets=modules.find(x=>x.PRESETS),duration=modules.find(x=>x.getSoundDuration),encoder=modules.find(x=>x.audioBufferToWav);
for(const preset of presets.PRESETS){const changed=presets.mutateParams(preset);assert.equal(changed.sourcePresetId,preset.id);assert.equal(presets.mutateParams(changed).sourcePresetId,preset.id);assert(duration.getSoundDuration(preset)>0);}
const audio={sampleRate:22050,getChannelData:()=>new Float32Array([-1,0,1])};
for(const depth of [8,16]){const bytes=await encoder.audioBufferToWav(audio,depth).arrayBuffer(),view=new DataView(bytes);assert.equal(view.getUint16(34,true),depth);assert.equal(view.getUint32(24,true),22050);if(depth===8){assert.equal(view.getUint8(44),0);assert.equal(view.getUint8(45),128);assert.equal(view.getUint8(46),255);}}
console.log('PASS: all preset variation origins, render duration, WAV format and 8-bit silence encoding.');
