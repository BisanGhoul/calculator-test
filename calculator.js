function calc(...args) {
    const validatedExpr = validateExpression(...args);
    const postfixExpr = infixToPostfix(validatedExpr);
    const evaluatedExpr = evaluatePostfix(postfixExpr);
    return evaluatedExpr;
}

console.log(calc("(", 5, "+", 5, ")", "*", 4, "+", 1));

function infixToPostfix(infixArray) {
    const postfixExpr = [];
    const operators = [];
    const operatorsPrecedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

    for (let i = 0; i < infixArray.length; i++) {
        const token = infixArray[i];

        if (typeof token === "number") {
            let processedToken = token;

            // Handle numbers greater than 1000
            if (token > 1000) {
                const prevToken = infixArray[i - 1];
                const nextToken = infixArray[i + 1];

                // If the number is before the division operator, ignore it.
                if (prevToken === "/") {
                    processedToken = 1;

                    // if the number before division is bigger than 1000
                    //  convert to the power of 2 of the number after division
                    // so that the final result is the number that comes after the division operator
                    // example: 1001/5 = 25/5 = 1
                } else if (nextToken === "/") {
                    processedToken = Math.pow(infixArray[i + 2], 2);
                } else if (prevToken === "*") {
                    processedToken = 1;
                } else if (nextToken === "*") {
                    processedToken = 1;
                } else {
                    processedToken = 0;
                }
            }

            postfixExpr.push(processedToken);
        } else if (operatorsPrecedence.hasOwnProperty(token)) {
            while (
                operators.length &&
                operators[operators.length - 1] !== "(" &&
                operatorsPrecedence[operators[operators.length - 1]] >=
                    operatorsPrecedence[token]
            ) {
                postfixExpr.push(operators.pop());
            }
            operators.push(token);
        } else if (token === "(") {
            operators.push(token);
        } else if (token === ")") {
            while (
                operators.length &&
                operators[operators.length - 1] !== "("
            ) {
                postfixExpr.push(operators.pop());
            }
            operators.pop();
        }
    }

    // pop remaining operators
    while (operators.length) {
        postfixExpr.push(operators.pop());
    }

    return postfixExpr;
}

function evaluatePostfix(postfixExpression) {
    const operandStack = [];

    for (const token of postfixExpression) {
        if (typeof token === "number") {
            operandStack.push(token);
            continue;
        }

        const rightOperand = operandStack.pop();
        const leftOperand = operandStack.pop();

        switch (token) {
            case "+":
                operandStack.push(leftOperand + rightOperand);
                break;
            case "-":
                operandStack.push(leftOperand - rightOperand);
                break;
            case "*":
                operandStack.push(leftOperand * rightOperand);
                break;
            case "/":
                if (rightOperand === 0) {
                    throw new Error("Division by zero is not allowed");
                }
                operandStack.push(leftOperand / rightOperand);
                break;
        }
    }

    return operandStack.pop();
}

function validateExpression(...expressionArr) {
    if (expressionArr.length < 3) {
        throw new Error("At least one operator and two numbers are required");
    }

    const validOperators = { "+": 1, "-": 1, "*": 2, "/": 2 };
    let parenBalance = 0;

    for (let i = 0; i < expressionArr.length; i++) {
        const token = expressionArr[i];
        const prev = expressionArr[i - 1];
        const next = expressionArr[i + 1];

        if (typeof token === "number") {
            // Example: (2,2,2) or (')',2,'('))
            if (typeof prev === "number" || prev === ")") {
                throw new Error(
                    `Invalid token sequence before number at index ${i}`
                );
            }
        } else if (validOperators.hasOwnProperty(token)) {
            if (
                //if an operator is at the start of the expression
                i === 0 ||
                //if an operator is at the end of the expression
                i === expressionArr.length - 1 ||
                // if the current operator has another operator before it
                validOperators.hasOwnProperty(prev) ||
                // if the current operator has an opening parentheses before it
                prev === "(" ||
                // if the current operator has another operator after it
                validOperators.hasOwnProperty(next) ||
                // if the current operator has a closing parentheses after it
                next === ")"
            ) {
                throw new Error(`Invalid operator placement at index ${i}`);
            }
        } else if (token === "(") {
            parenBalance++;
            //example: ( '(' , '+' )
            if (typeof next !== "number" && next !== "(") {
                throw new Error(
                    `Expected number or '(' after '(' at index ${i}`
                );
            }
        } else if (token === ")") {
            parenBalance--;
            if (parenBalance < 0) {
                throw new Error("Mismatched parentheses");
            }
            //example: ( '+' , ')' )
            if (typeof prev !== "number" && prev !== ")") {
                throw new Error(
                    `Expected number or ')' before ')' at index ${i}`
                );
            }
        } else {
            // if not a number, valid operator, opening parantheses or closing parantheses
            throw new Error(`Invalid token '${token}' at index ${i}`);
        }
    }

    if (parenBalance !== 0) {
        throw new Error("Mismatched parentheses");
    }

    return expressionArr;
}

module.exports = {
    calc,
    _test: {
        // Testing-only exports
        infixToPostfix,
        evaluatePostfix,
        validateExpression,
    },
};
