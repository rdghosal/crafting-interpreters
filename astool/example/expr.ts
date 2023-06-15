import Token from './token';

interface Visitor<R> {
	visitBinaryexpr(expr: Binary): R;
	visitGroupingexpr(expr: Grouping): R;
	visitLiteralexpr(expr: Literal): R;
	visitUnaryexpr(expr: Unary): R;
};

abstract class expr {
	abstract accept<R>(visitor: Visitor<R>): R;
};

class Binary extends expr {
	public readonly left: Expr;
	public readonly operator: Token;
	public readonly right: Expr;
	constructor(left: Expr, operator: Token, right: Expr) {
		super();
		this.left = left;
		this.operator = operator;
		this.right = right;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitBinaryexpr(this);
	}
};

class Grouping extends expr {
	public readonly expression: Expr;
	constructor(expression: Expr) {
		super();
		this.expression = expression;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitGroupingexpr(this);
	}
};

class Literal extends expr {
	public readonly value: any;
	constructor(value: any) {
		super();
		this.value = value;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitLiteralexpr(this);
	}
};

class Unary extends expr {
	public readonly operator: Token;
	public readonly right: Expr;
	constructor(operator: Token, right: Expr) {
		super();
		this.operator = operator;
		this.right = right;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitUnaryexpr(this);
	}
};

