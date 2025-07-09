function add(numbers) {
  if (numbers === '') return 0;
  return numbers
    .split(',')
    .map(Number)
    .reduce((sum, n) => sum + n, 0);
}

module.exports = add; 