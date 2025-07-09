function parseDelimiter(numbers) {
  let delimiterPattern = /,|\n/;
  let numbersPart = numbers;

  if (numbers.startsWith('//')) {
    // Support multiple delimiters of any length: //[delim1][delim2]\n
    const multiDelimMatch = numbers.match(/^\/\/(\[.+?\])+\n/);
    if (multiDelimMatch) {
      // Extract all delimiters inside []
      const delimiterMatches = [...numbers.matchAll(/\[(.+?)\]/g)];
      const delimiters = delimiterMatches.map(m => m[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      delimiterPattern = new RegExp(`(?:${delimiters.join('|')})|,|\n`);
      // Find where the delimiter declaration ends
      const delimiterDeclarationLength = numbers.indexOf('\n') + 1;
      numbersPart = numbers.slice(delimiterDeclarationLength);
    } else {
      // Single character or single multi-character delimiter
      const multiCharMatch = numbers.match(/^\/\/\[(.+?)\]\n/);
      if (multiCharMatch) {
        const customDelimiter = multiCharMatch[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        delimiterPattern = new RegExp(`(?:${customDelimiter})|,|\n`);
        numbersPart = numbers.slice(multiCharMatch[0].length);
      } else {
        // Single character delimiter: //;
        const delimiterMatch = numbers.match(/^\/\/(.)\n/);
        if (delimiterMatch) {
          const customDelimiter = delimiterMatch[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          delimiterPattern = new RegExp(`[${customDelimiter},\n]`);
          numbersPart = numbers.slice(delimiterMatch[0].length);
        }
      }
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