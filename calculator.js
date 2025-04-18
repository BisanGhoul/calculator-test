const {
    validateExpression,
    infixToPostfix,
    evaluatePostfix,
} = require("./helpers");

function calc(...args) {
    const validatedExpr = validateExpression(...args);
    const postfixExpr = infixToPostfix(validatedExpr);
    return evaluatePostfix(postfixExpr);
}

module.exports = { calc };
