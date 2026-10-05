import type { SFXParams } from '../types/sfx';

/** Includes the release tail used by the synthesis graph. */
export function getSoundDuration(params: SFXParams): number {
  if (params.melodyNotes?.length) {
    return params.melodyNotes.reduce((total, note) => total + Math.max(0.04, note.duration), 0) + 0.1;
  }
  return Math.max(0.003, params.attackTime) + Math.max(0.03, params.sustainTime) + Math.max(0.08, params.decayTime) + 0.08;
}
