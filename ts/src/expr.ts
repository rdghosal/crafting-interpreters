import Token from './token';

export interface Visitor<R> {
	visitBinaryExpr(expr: Binary): R;
	visitGroupingExpr(expr: Grouping): R;
	visitLiteralExpr(expr: Literal): R;
	visitUnaryExpr(expr: Unary): R;
};

export abstract class Expr {
	abstract accept<R>(visitor: Visitor<R>): R;
};

export class Binary extends Expr {
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

export class Grouping extends Expr {
	public readonly expression: Expr;
	constructor(expression: Expr) {
		super();
		this.expression = expression;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitGroupingExpr(this);
	}
};

export class Literal extends Expr {
	public readonly value: any;
	constructor(value: any) {
		super();
		this.value = value;
	}

	accept<R>(visitor: Visitor<R>): R {
		return visitor.visitLiteralExpr(this);
	}
};

export class Unary extends Expr {
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

