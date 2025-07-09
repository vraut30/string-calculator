# String Calculator

A simple String Calculator implemented in Node.js with TDD. It supports:

- Adding numbers in a string separated by commas or newlines
- Custom single-character delimiters (e.g., `//;\n1;2`)
- Custom multi-character delimiters (e.g., `//[***]\n1***2***3`)
- Multiple delimiters of any length (e.g., `//[*][%]\n1*2%3`, `//[***][%%]\n1***2%%3`)
- Ignores numbers greater than 1000
- Throws an error for negative numbers, listing all negatives in the message

## Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run tests:**
   ```sh
   npm test
   ```

3. **Use in your code:**
   ```js
   const add = require('./stringCalculator');
   
   console.log(add('1,2,3')); // 6
   console.log(add('//;\n1;2')); // 3
   console.log(add('//[***]\n1***2***3')); // 6
   console.log(add('//[*][%]\n1*2%3')); // 6
   console.log(add('//[***][%%]\n1***2%%3')); // 6
   // Throws: negatives not allowed: -2,-5
   // add('1,-2,3,-5');
   ```

## Features

- **Empty string returns 0**
- **Single number returns its value**
- **Two or more numbers separated by comma or newline are summed**
- **Custom delimiters supported via `//[delimiter]\n` or `//[delim1][delim2]\n`**
- **Negative numbers throw an exception listing all negatives**
- **Numbers > 1000 are ignored**
- **Whitespace around numbers is trimmed**

## Example Inputs

| Input                        | Output | Notes                                 |
|-----------------------------|--------|---------------------------------------|
| `""`                        | 0      | Empty string                          |
| `"1"`                       | 1      | Single number                         |
| `"1,2"`                     | 3      | Two numbers, comma delimiter          |
| `"1\n2,3"`                  | 6      | Newline and comma delimiters          |
| `"//;\n1;2"`                | 3      | Custom single-character delimiter     |
| `"//[***]\n1***2***3"`      | 6      | Custom multi-character delimiter      |
| `"//[*][%]\n1*2%3"`         | 6      | Multiple single-character delimiters  |
| `"//[***][%%]\n1***2%%3"`   | 6      | Multiple multi-character delimiters   |
| `"2,1001"`                  | 2      | Ignores numbers > 1000                |
| `"1,-2,3"`                  | Error  | Throws: negatives not allowed: -2     |

---

## License
MIT