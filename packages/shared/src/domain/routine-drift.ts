/**
 * Compares ordered exercise ids from the routine snapshot vs what the user logged.
 * Used at session end to decide whether to prompt "update template vs instance only".
 */
export function detectRoutineListDrift(args: {
  baselineOrderedIds: string[];
  sessionOrderedIds: string[];
}): { changed: boolean } {
  const { baselineOrderedIds, sessionOrderedIds } = args;
  if (baselineOrderedIds.length !== sessionOrderedIds.length) {
    return { changed: true };
  }
  for (let i = 0; i < baselineOrderedIds.length; i++) {
    const b = baselineOrderedIds[i];
    const s = sessionOrderedIds[i];
    if (b !== s) {
      return { changed: true };
    }
  }
  return { changed: false };
}
