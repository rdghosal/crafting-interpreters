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

class Grouping extends Expr {
	public readonly expression: Expr;
	constructor(expression: Expr) {
		super();
		this.expression = expression;
	}
};

class Literal extends Expr {
	public readonly value: any;
	constructor(value: any) {
		super();
		this.value = value;
	}
};

class Unary extends Expr {
	public readonly operator: Token;
	public readonly right: Expr;
	constructor(operator: Token, right: Expr) {
		super();
		this.operator = operator;
		this.right = right;
	}
};

