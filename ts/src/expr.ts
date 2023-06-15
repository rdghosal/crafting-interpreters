import Token from './token';

interface Visitor<R> {
	visitBinaryExpr(expr: Binary): R;
	visitGroupingExpr(expr: Grouping): R;
	visitLiteralExpr(expr: Literal): R;
	visitUnaryExpr(expr: Unary): R;
};

abstract class Expr {
	abstract accept<R>(visitor: Visitor<R>): R;
};

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

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitBinaryExpr(this);
	}
};

class Grouping extends Expr {
	public readonly expression: Expr;
	constructor(expression: Expr) {
		super();
		this.expression = expression;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitGroupingExpr(this);
	}
};

class Literal extends Expr {
	public readonly value: any;
	constructor(value: any) {
		super();
		this.value = value;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitLiteralExpr(this);
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

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitUnaryExpr(this);
	}
};

