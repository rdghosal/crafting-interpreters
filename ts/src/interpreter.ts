import { Binary, Expr, Grouping, Literal, Unary, Visitor } from "./expr";
import Lox from "./lox";
import RuntimeError from "./runtimeerror";
import Token from "./token";
import TokenType from "./tokentype";

class Interpreter implements Visitor<any> {

    public intepret(expression: Expr): void {
        try {
            const value: any = this.evaluate(expression);
            console.log(this.stringify(value));
        } catch (error: RuntimeError) {
            Lox.runtimeError(error);
        }
    }

    visitLiteralExpr(expr: Literal): any {
        return expr.value;
    }

    visitUnaryExpr(expr: Unary): any {
        const right: any = this.evaluate(expr.right);
        switch (expr.operator.type) {
            case TokenType.MINUS:
                this.checkNumberOperand(expr.operator, right);
                return -(right);
            case TokenType.BANG:
                return !this.isTruthy(right);
        }
        // todo
        return null;
    }

    private checkNumberOperand(operator: Token, operand: any): void {
        if (typeof operand === "number") {
            return;
        }
        throw new RuntimeError(operator, "Operand must be a number.");
    }

    private checkNumberOperands(operator: Token, left: any, right: any): void {
        if (typeof left === "number" && typeof right === "number") {
            return;
        }
        throw new RuntimeError(operator, "Operands must be numbers.");
    }

    private isTruthy(object: any): boolean {
        if (object === null) {
            return false;
        } 
        if (typeof object === "boolean") {
            return object;
        }
        return true;
    }

    private isEqual(a: any, b: any): boolean {
        if ((a === null) && (b === null)) {
            return true;
        }
        if (a === null) {
            return false;
        }
        return a === b;
    }

    private stringify(object: any): string {
        if (object === null) {
            return "nil";
        }
        if (typeof object === "number") {
            let text = object.toString();
            if (text.endsWith(".0")) {
                text = text.substring(0, text.length - 2);
            }
            return text;
        }
        return object.toString();
    }

    visitGroupingExpr(expr: Grouping): any {
        return this.evaluate(expr.expression);
    }

    private evaluate(expr: Expr): any {
        return expr.accept(this);
    }

    visitBinaryExpr(expr: Binary): any {
        const left: any = this.evaluate(expr.left);
        const right: any = this.evaluate(expr.right);
        switch (expr.operator.type) {
            case TokenType.GREATER:
                this.checkNumberOperands(expr.operator, left, right);
                return left > right;
            case TokenType.GREATER_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return left >= right;
            case TokenType.LESS:
                this.checkNumberOperands(expr.operator, left, right);
                return left < right;
            case TokenType.LESS_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return left <= right;
            case TokenType.MINUS:
                this.checkNumberOperands(expr.operator, left, right);
                return left - right;
            case TokenType.PLUS:
                if (typeof left === "number" && typeof right === "number") {
                    return left + right;
                }
                if (typeof left === "string" && typeof right === "string") {
                    return left + right;
                }
                throw new RuntimeError(expr.operator, "Operators must be two numbers or two strings.");
            case TokenType.SLASH:
                this.checkNumberOperands(expr.operator, left, right);
                return left / right;
            case TokenType.STAR:
                this.checkNumberOperands(expr.operator, left, right);
                return left * right;
            case TokenType.BANG_EQUAL:
                return !this.isEqual(left, right);
            case TokenType.EQUAL_EQUAL
                return this.isEqual(left, right);
        }
        return null;
    }

};

export default Interpreter;
