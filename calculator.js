function calc(...args) {
    if (args.length < 3) {
        throw new Error("At least one operator and two numbers are required");
    }

    const operand1 = args[0],
        op = args[1],
        operand2 = args[2];

    switch (op) {
        case "+":
            return operand1 + operand2;
        case "-":
            return operand1 - operand2;
        case "*":
            return operand1 * operand2;
        case "/":
            if (operand2 === 0) {
                throw new Error("Division by zero");
            }
            return operand1 / operand2;
    }
}

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

module.exports = {
    calc,
    _test: {
        // Testing-only exports
        infixToPostfix,
    },
};
