const calc = require("./calculator");

describe("Calculator", () => {
    // Test case: Addition
    it("should return the correct sum of two numbers", () => {
        const operand1 = 2,
            op = "+",
            operand2 = 3;

        const result = calc(operand1, op, operand2);

        expect(result).toBe(5);
    });

    // Test case: Subtraction
    it("should return the correct difference of two numbers", () => {
        const operand1 = 5,
            op = "-",
            operand2 = 2;

        const result = calc(operand1, op, operand2);

        expect(result).toBe(3);
    });

    // Test case: Multiplication
    it("should return the correct product of two numbers", () => {
        const operand1 = 4,
            op = "*",
            operand2 = 6;

        const result = calc(operand1, op, operand2);

        expect(result).toBe(24);
    });
});
