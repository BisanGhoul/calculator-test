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

    // Test case: Division
    it("should return the correct quotient of two numbers", () => {
        const operand1 = 10,
            op = "/",
            operand2 = 5;

        const result = calc(operand1, op, operand2);

        expect(result).toBe(2);
    });

    // Test case: Division by zero
    it("should throw an error when dividing by zero", () => {
        const operand1 = 6;
        const operator = "/";
        const operand2 = 0;

        expect(() => calc(operand1, operator, operand2)).toThrow(
            "Division by zero"
        );
    });

    // Test case: Negative numbers
    it("should handle negative numbers correctly", () => {
        expect(calc(-8, "+", 5)).toBe(-3);
    });

    it("should handle decimal numbers correctly", () => {
        const operand1 = 3.5;
        const operator = "*";
        const operand2 = 2;

        const result = calc(operand1, operator, operand2);

        expect(result).toBe(7);
    });
});
