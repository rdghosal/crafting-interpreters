import Token from "./token";

abstract class Expr {};

class Binary extends Expr {
    public readonly left: Expr;
    public readonly operator: Token;
    public readonly right: Expr;

    constructor(left: Expr, operator: Token, right: Expr) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
};
