function parseDelimiter(numbers) {
  let delimiterPattern = /,|\n/;
  let numbersPart = numbers;

  if (numbers.startsWith('//')) {
    const delimiterMatch = numbers.match(/^\/\/(.)\n/);
    if (delimiterMatch) {
      const customDelimiter = delimiterMatch[1];
      delimiterPattern = new RegExp(`[${customDelimiter}\n,]`);
      numbersPart = numbers.slice(4); // Skip //x\n
    }
  }
  return { delimiterPattern, numbersPart };
}

function splitNumbers(numbers, delimiterPattern) {
  return numbers
    .split(delimiterPattern)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

function add(numbers) {
  if (numbers === '') return 0;

  const { delimiterPattern, numbersPart } = parseDelimiter(numbers);
  const numberStrings = splitNumbers(numbersPart, delimiterPattern);
  const numberValues = numberStrings.map(Number);

  const negatives = numberValues.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`negatives not allowed: ${negatives.join(',')}`);
  }

  return numberValues.filter(n => n <= 1000).reduce((sum, n) => sum + n, 0);
}

module.exports = add; 