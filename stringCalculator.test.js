const add = require('./stringCalculator');

describe('add', () => {
  test('returns 0 for empty string', () => {
    expect(add('')).toBe(0);
  });
  test('returns 1 for "1"', () => {
    expect(add('1')).toBe(1);
  });
}); 