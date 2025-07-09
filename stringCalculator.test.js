const add = require('./stringCalculator');

describe('add', () => {

  // Test 1: Empty string should return 0
  test('returns 0 for empty string', () => {
    expect(add('')).toBe(0);
  });

  // Test 2: Single number string should return its integer value
  test('returns 1 for "1"', () => {
    expect(add('1')).toBe(1);
  });

  // Test 3: Two numbers separated by a comma should return their sum
  test('returns 3 for "1,2"', () => {
    expect(add('1,2')).toBe(3);
  });

  // Test 4: Support for newlines as valid delimiters in addition to commas
  test('returns 6 for "1\\n2,3"', () => {
    expect(add('1\n2,3')).toBe(6);
  });

  // Test 5: Support for custom single-character delimiters (e.g., ";")
  // Syntax: "//<delimiter>\\n<numbers>"
  test('returns 3 for "//;\\n1;2"', () => {
    expect(add('//;\n1;2')).toBe(3);
  });

  // Test 6: Throw an error if negative numbers are present, listing all negatives
  test('throws on negative numbers with message including the negatives', () => {
    expect(() => add('1,-2,3')).toThrow('negatives not allowed: -2');
  });

  // Test 7: Ignore numbers greater than 1000 when calculating the sum
  test('ignores numbers greater than 1000', () => {
    expect(add('2,1001')).toBe(2);
  });

  // Test 8: Support custom delimiters of any length specified with square brackets
  // Example: "//[***]\\n1***2***3" should return 6
  test('supports delimiters of any length', () => {
    expect(add('//[***]\n1***2***3')).toBe(6);
  });

  // Test 9: Support multiple single-character custom delimiters
  // Example: "//[*][%]\\n1*2%3" should return 6
  test('supports multiple delimiters', () => {
    expect(add('//[*][%]\n1*2%3')).toBe(6);
  });

  // Test 10: Support multiple delimiters with length longer than one character each
  // Example: "//[***][%%]\\n1***2%%3" should return 6
  test('supports multiple delimiters with length longer than one char', () => {
    expect(add('//[***][%%]\n1***2%%3')).toBe(6);
  });

});
