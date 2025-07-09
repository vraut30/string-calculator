// Helper to escape regex special characters in delimiters
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper to extract all delimiters from the header
function extractDelimiters(header) {
  // Matches all [delim] in the header
  const matches = [...header.matchAll(/\[(.+?)\]/g)];
  if (matches.length > 0) {
    return matches.map(m => escapeRegex(m[1]));
  }
  // Single character delimiter (e.g., //;\n)
  const singleChar = header.match(/^\/\/(.)\n/);
  if (singleChar) {
    return [escapeRegex(singleChar[1])];
  }
  // Default delimiters
  return [',', '\n'];
}

// Helper to build the delimiter regex
function buildDelimiterRegex(delimiters) {
  // Join all delimiters as non-capturing groups
  return new RegExp(`(?:${delimiters.join('|')})`);
}

function parseDelimiter(numbers) {
  let delimiterPattern = /,|\n/;
  let numbersPart = numbers;

  if (numbers.startsWith('//')) {
    const headerEnd = numbers.indexOf('\n') + 1;
    const header = numbers.slice(0, headerEnd);
    const delimiters = extractDelimiters(header);
    delimiterPattern = buildDelimiterRegex(delimiters);
    numbersPart = numbers.slice(headerEnd);
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

  // Parse delimiters and numbers part
  const { delimiterPattern, numbersPart } = parseDelimiter(numbers);
  const numberStrings = splitNumbers(numbersPart, delimiterPattern);
  const numberValues = numberStrings.map(Number);

  // Check for negatives
  const negatives = numberValues.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`negatives not allowed: ${negatives.join(',')}`);
  }

  // Ignore numbers > 1000 and sum
  return numberValues.filter(n => n <= 1000).reduce((sum, n) => sum + n, 0);
}

module.exports = add; 