export function normalizeArray(array) {
  const max = Math.max(...array);
  const min = Math.min(...array);
  const minMaxDiff = max - min;
  const normalizedArray = [];
  array.forEach((value: number) => {
    const normalizedValue = ((value - min) / minMaxDiff) * 100;
    normalizedArray.push(normalizedValue);
  });
  return normalizedArray;
}
