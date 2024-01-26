export const getNewPosition = (
    arr: { pos: number }[],
    oldIdx: number,
    newIdx: number
  ): number => {
    if (newIdx === arr.length - 1) return arr[newIdx]?.pos * 1.5 || 65536;
    if (newIdx === 0) return arr[newIdx]?.pos * 0.5 || 65536;
    if (newIdx > oldIdx) return (arr[newIdx].pos + arr[newIdx + 1].pos) / 2;
    if (newIdx < oldIdx) return (arr[newIdx].pos + arr[newIdx - 1].pos) / 2;
    return 0;
  };
  