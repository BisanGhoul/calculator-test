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
});
