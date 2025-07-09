function splitNumbers(numbers, delimiterPattern) {
  return numbers
    .split(delimiterPattern)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

function sumNumbers(numberStrings) {
  return numberStrings
    .map(Number)
    .reduce((sum, n) => sum + n, 0);
}

function add(numbers) {
  if (numbers === '') return 0;

  let delimiterPattern = /,|\n/;
  let numbersPart = numbers;

  // Check for custom delimiter
  if (numbers.startsWith('//')) {
    const delimiterMatch = numbers.match(/^\/\/(.)\n/);
    if (delimiterMatch) {
      const customDelimiter = delimiterMatch[1];
      delimiterPattern = new RegExp(`[${customDelimiter}\n,]`);
      numbersPart = numbers.slice(4); // Skip //x\n
    }
  }

  const numberStrings = splitNumbers(numbersPart, delimiterPattern);
  return sumNumbers(numberStrings);
}

module.exports = add; 