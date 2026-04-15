export class ResultComparator {
  constructor() {
    console.log('[ResultComparator] Module mounted.');
  }

  compare(resultA, resultB) {
    if (resultA === resultB) {
        return { same: true, diffScore: 0 };
    }
    
    // Very rudimentary diff calculation using length and character match diff
    const lenDiff = Math.abs(resultA.length - resultB.length);
    const maxLen = Math.max(resultA.length, resultB.length);
    const diffScore = lenDiff / (maxLen || 1);
    
    return {
        same: false,
        diffScore: diffScore, // 0.0 is exactly same length (but different content), 1.0 is totally different length
        lengthDiff: lenDiff
    };
  }
}
