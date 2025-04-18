const {
    validateExpression,
    infixToPostfix,
    evaluatePostfix,
} = require("./helpers");
const { calc } = require("./calculator");

jest.mock("./helpers", () => ({
    validateExpression: jest.fn(),
    infixToPostfix: jest.fn(),
    evaluatePostfix: jest.fn(),
}));

describe("calc with mocked helper functions", () => {
    beforeEach(() => {
        validateExpression.mockReset();
        infixToPostfix.mockReset();
        evaluatePostfix.mockReset();
    });

    it("should calculate using mocked helper functions", () => {
        const expression = [2, "+", 3];
        const validated = [2, "+", 3];
        const postfix = [2, 3, "+"];
        const finalResult = 5;

        validateExpression.mockReturnValue(validated);
        infixToPostfix.mockReturnValue(postfix);
        evaluatePostfix.mockReturnValue(finalResult);

        const result = calc(...expression);

        expect(validateExpression).toHaveBeenCalledWith(...expression);
        expect(infixToPostfix).toHaveBeenCalledWith(validated);
        expect(evaluatePostfix).toHaveBeenCalledWith(postfix);
        expect(result).toBe(finalResult);
    });

    it("should should raise an error from validateExpression", () => {
        validateExpression.mockImplementation(() => {
            throw new Error(
                "At least one operator and two numbers are required"
            );
        });

        expect(() => calc(1, 2)).toThrow(
            "At least one operator and two numbers are required"
        );
    });
});
