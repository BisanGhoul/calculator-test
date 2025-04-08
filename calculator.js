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

    for (const token of infixArray) {
        if (typeof token === "number") {
            postfixExpr.push(token);
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
