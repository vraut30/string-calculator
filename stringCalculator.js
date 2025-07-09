function splitNumbers(numbers) {
  return numbers
    .split(/,|\n/)
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
  const numberStrings = splitNumbers(numbers);
  return sumNumbers(numberStrings);
}

module.exports = add; 