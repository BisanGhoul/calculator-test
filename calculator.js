function calc(operand1, op, operand2) {
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
module.exports = calc;
