# JavaScript Arithmetic Expression Calculator

This project is a JavaScript-based arithmetic expression calculator. It converts infix expressions to postfix (Reverse Polish Notation), validates them, and evaluates the result. It also includes unit tests to verify logic correctness and edge-case handling.
[![codecov](https://codecov.io/gh/BisanGhoul/calculator-test/branch/test-branch/graph/badge.svg)](https://codecov.io/gh/BisanGhoul/calculator-test)

## Features

- Infix to postfix conversion
- Expression syntax validation
- Postfix evaluation
- Handles decimals, negative numbers, and parentheses
- Ignores numbers greater than 1000
- Modular helper functions with full Jest test coverage

---

## Implementation Details

### 1. `infixToPostfix(expression: []): []`

- Converts a valid infix string (e.g., `"3 + 4 * 2"`) into a postfix array: `["3", "4", "2", "*", "+"]`
- Handles parentheses, operator precedence, unary minus
- **Skips any number greater than 1000**
- Used only for structure conversion, not evaluation

#### Algorithm:
```
Initialize empty output array and operator stack

For each token in the input string:
    - If token is a number:
        - If number > 1000, skip it
        - Else, add to output
    - If token is an operator:
        - While top of the operator stack has higher or equal precedence:
            - Pop from stack to output
        - Push current operator to stack
    - If token is '(': 
        - Push to stack
    - If token is ')':
        - While top of stack is not '(':
            - Pop from stack to output
        - Pop '(' from the stack

After processing all tokens:
    - Pop any remaining operators from stack to output

Return the output array

```

### 2. `evaluatePostfix(postfixTokens: []): number`

- Takes a postfix expression array and evaluates it
- Supports float and integer arithmetic
- Throws if a division by zero occurs
- Assumes the postfix input is valid

  #### Algorithm:
```
Initialize empty operand stack

For each token in postfixTokens:
    - If token is a number:
        - Push it to the stack
    - If token is an operator:
        - Pop two operands from the stack (right and left)
        - Apply the operator: result = left OP right
        - Push the result back onto the stack

At the end:
    - The stack should have exactly one number: the final result
    - If division by zero occurs at any point, throw an error

```

### 3. `validateExpression(expression: []): []`

- Ensures the expression is syntactically valid
- Throws descriptive errors for:
  - Consecutive operators
  - Invalid tokens (e.g. letters)
  - Misplaced parentheses
  - Missing operands/operators
  - Division by zero (checked after parsing)
  - Standalone numbers without an operation

---

## Special Rule: Numbers Greater Than 1000 Are Ignored

Inside `infixToPostfix()`, any number strictly greater than 1000 is skipped and not included in the output postfix expression. 

### ❗ This does NOT throw an error, the number is silently ignored.

---

### Examples of Expressions with Numbers > 1000

| Expression          | Postfix Output        | Evaluated Result | Explanation                                                                 |
|---------------------|-----------------------|------------------|-----------------------------------------------------------------------------|
| `2 + 1001 + 3`      | `[2, 3, '+']`         | `5`              | `1001` is ignored                                                           |
| `1001 + 5`          | `[0, 5, '+']`         | `5`              | `1001` ignored → default left operand is `0`                                |
| `1001 - 5`          | `[0, 5, '-']`         | `-5`             | Treated as `0 - 5`                                                          |
| `5 - 1001`          | `[5, 0, '-']`         | `5`              | `1001` ignored → becomes `5 - 0`                                            |
| `1001 * 5`          | `[1, 5, '*']`         | `5`              | `1001` ignored → default left operand is `1`                                |
| `5 * 1001`          | `[5, 1, '*']`         | `5`              | `1001` ignored → becomes `5 * 1`                                            |
| `1001 / 5`          | `[25, 5, '/']`        | `5`              | `1001` ignored → replaced with `5² = 25` to preserve division logic         |
| `5 / 1001`          | `[5, 1, '/']`         | `5`              | `1001` ignored → becomes `5 / 1`                                            |

---

## Expression Rules and Examples

### Valid Expressions

| Expression                      | Description                        |
|--------------------------------|------------------------------------|
| `"3 + 4"`                      | Basic addition                     |
| `"2 + 3 * 4"`                  | Operator precedence applies        |
| `"12.5 * (2 - 1)"`            | Decimal + parentheses              |
| `"((3 + 2) * (4 / 2))"`       | Nested expressions                 |
| `"-5 + 3"`                    | Unary negative                     |
| `"1000 + 3"`                  | Max valid number is included       |
| `"2 + 1001"`                  | `1001` ignored, result = `2`       |

---

### Invalid Expressions

| Expression            | Error Message (via `validateExpression`)        |
|------------------------|-------------------------------------------------|
| `""`                   | Empty expression                                |
| `"3 ++ 4"`             | Consecutive operators                           |
| `"3 4"`                | Multiple numbers without operator               |
| `"3 + * 4"`            | Invalid operator placement                      |
| `"3 + (4 * 2"`         | Unbalanced parentheses                          |
| `"hello + 3"`          | Invalid operand                                 |
| `"()"`                 | Empty parentheses                               |
| `"3 + "`               | Ends with an operator                           |
| `"+"`                  | Starts with an operator only                    |
| `"3 / 0"`              | Division by zero error at evaluation time       |

---

## Tests

Written using **Jest**, located in two files:

### `helpers.test.js`
- Tests `infixToPostfix`, `evaluatePostfix`, and `validateExpression`
- Includes:
  - Basic and complex expression handling
  - Edge cases: empty input, bad syntax, unbalanced parentheses
  - Division by zero
  - Negative and decimal numbers
  - Filtering numbers > 1000

### `calculator.test.js`
- Tests the overall integration using mocked helper functions
- Verifies:
  - Valid calculations go through correctly
  - Errors from validation propagate as expected

Run tests:

```bash
npx jest --verbose
```

---

## File Structure

```
├── helpers.js             // infixToPostfix, evaluatePostfix, validateExpression
├── helpers.test.js        // Tests for helpers
├── calculator.js          // Uses helpers to evaluate expression end-to-end
├── calculator.test.js     // Integration tests with mocks
├── package.json
└── README.md
```

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the test suite:

```bash
npx jest
```

---


