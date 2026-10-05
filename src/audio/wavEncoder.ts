/**
 * Encodes audio PCM data into standard RIFF WAV format
 */

export function audioBufferToWav(
  buffer: AudioBuffer,
  bitDepth: 16 | 8 = 16
): Blob {
  const numChannels = 1; // Monophonic retro sounds
  const sampleRate = buffer.sampleRate;
  const channelData = buffer.getChannelData(0); // Take first channel
  const numSamples = channelData.length;

  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const bufferSize = 44 + dataSize;

  const arrayBuffer = new ArrayBuffer(bufferSize);
  const view = new DataView(arrayBuffer);

  // Helper to write ASCII strings
  function writeString(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  // RIFF identifier
  writeString(0, 'RIFF');
  // RIFF chunk length (file size - 8)
  view.setUint32(4, 36 + dataSize, true);
  // RIFF type
  writeString(8, 'WAVE');

  // format chunk identifier
  writeString(12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (1 is PCM)
  view.setUint16(20, 1, true);
  // channel count
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate
  view.setUint32(28, byteRate, true);
  // block align
  view.setUint16(32, blockAlign, true);
  // bits per sample
  view.setUint16(34, bitDepth, true);

  // data chunk identifier
  writeString(36, 'data');
  // data chunk length
  view.setUint32(40, dataSize, true);

  // Write audio samples
  let offset = 44;
  if (bitDepth === 16) {
    for (let i = 0; i < numSamples; i++) {
      // Clamp between -1 and 1
      let s = Math.max(-1, Math.min(1, channelData[i]));
      // Convert to 16-bit signed integer (-32768 to 32767)
      const val = s < 0 ? s * 0x8000 : s * 0x7fff;
      view.setInt16(offset, Math.floor(val), true);
      offset += 2;
    }
  } else {
    // 8-bit unsigned PCM (0 to 255, silence = 128)
    for (let i = 0; i < numSamples; i++) {
      let s = Math.max(-1, Math.min(1, channelData[i]));
      // Map [-1, 1] to [0, 255]
      const val = Math.round((s + 1) * 127.5);
      view.setUint8(offset, Math.max(0, Math.min(255, val)));
      offset += 1;
    }
  }

  return new Blob([view], { type: 'audio/wav' });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

