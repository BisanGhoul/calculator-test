const { calc, _test } = require("./calculator");
const { infixToPostfix } = _test;

describe("Helper Functions", () => {
    // ===== Postfix Conversion Tests =====
    describe("infixToPostfix()", () => {
        it("should return the correct postfix expression for simple operators", () => {
            expect(infixToPostfix([2, "+", 3])).toEqual([2, 3, "+"]);
            expect(infixToPostfix([5, "-", 2])).toEqual([5, 2, "-"]);
            expect(infixToPostfix([4, "*", 6])).toEqual([4, 6, "*"]);
            expect(infixToPostfix([10, "/", 2])).toEqual([10, 2, "/"]);
        });

        // prettier-ignore
        it("should handle operator precedence with parentheses", () => {
            expect(infixToPostfix(["(", 5, "+", 2, ")", "*", "(", 10, "/", 2, ")", "+", 1]))
            .toEqual([5, 2, "+", 10, 2, "/", "*", 1, "+"]);
        });
    });
});

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

    it("should throw an error if the number of passed arguments is less than three", () => {
        const operand1 = 5;
        const operator = "+";

        expect(() => calc(operand1, operator)).toThrow(
            "At least one operator and two numbers are required"
        );
        expect(() => calc(operand1)).toThrow(
            "At least one operator and two numbers are required"
        );
    });
});
