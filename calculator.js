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
module.exports = calc;
