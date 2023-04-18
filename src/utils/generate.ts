export function generateRandomNumber(length = 4): string {
  const possible = '0123456789';
  return Array.from(Array(length)).reduce(
    (acc) => `${acc}${possible.charAt(Math.floor(Math.random() * possible.length))}`,
    '',
  );
}
