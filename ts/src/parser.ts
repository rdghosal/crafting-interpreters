import { Binary, Expr, Grouping, Literal, Unary } from "./expr";
import Lox from "./lox";
import Token from "./token";
import TokenType from "./tokentype";

/*
 * _Our expression grammer_
 * expression     → equality ;
 * equality       → comparison ( ( "!=" | "==" ) comparison )* ;
 * comparison     → term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
 * term           → factor ( ( "-" | "+" ) factor )* ;
 * factor         → unary ( ( "/" | "*" ) unary )* ;
 * unary          → ( "!" | "-" ) unary
               | primary ;
 * primary        → NUMBER | STRING | "true" | "false" | "nil"
               | "(" expression ")" ; 
 */
export class Parser {
  private readonly tokens: Token[];
  private current: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public parse() {
    try {
      return this.expression();
    } catch (error) {
      return null;
    }
  }

  private expression(): Expr {
    return this.equality();
  }

  private equality(): Expr {
    let expr = this.comparison();
    while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
      const operator: Token = this.previous();
      const right: Expr = this.comparison();
      expr = new Binary(expr, operator, right);
    }
    return expr;
  }

  private comparison(): Expr {
    let expr: Expr = this.term();
    while (
      this.match(
        TokenType.GREATER,
        TokenType.GREATER_EQUAL,
        TokenType.LESS,
        TokenType.LESS_EQUAL
      )
    ) {
      const operator: Token = this.previous();
      const right: Expr = this.term();
      expr = new Binary(expr, operator, right);
    }
    return expr;
  }

  private term(): Expr {
    let expr: Expr = this.factor();
    while (this.match(TokenType.MINUS, TokenType.PLUS)) {
      const operator: Token = this.previous();
      const right: Expr = this.term();
      expr = new Binary(expr, operator, right);
    }
    return expr;
  }

  private factor(): Expr {
    let expr: Expr = this.unary();
    while (this.match(TokenType.SLASH, TokenType.STAR)) {
      const operator: Token = this.previous();
      const right: Expr = this.unary();
      expr = new Binary(expr, operator, right);
    }
    return expr;
  }

  private unary(): Expr {
    while (this.match(TokenType.BANG, TokenType.MINUS)) {
      const operator: Token = this.previous();
      const right: Expr = this.unary();
      return new Unary(operator, right);
    }
    return this.primary();
  }

  private primary(): Expr {
    if (this.match(TokenType.FALSE)) {
      return new Literal(false);
    } else if (this.match(TokenType.TRUE)) {
      return new Literal(true);
    } else if (this.match(TokenType.NIL)) {
      return new Literal(null);
    } else if (this.match(TokenType.NUMBER, TokenType.STRING)) {
      return new Literal(this.previous().literal);
    } else if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.expression();
      this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
      return new Grouping(expr);
    }
    throw this.error(this.peek(), "Expected expression.");
  }

  private match(...types: TokenType[]): boolean {
    types.forEach((type) => {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    });
    return false;
  }

  private consume(type: TokenType, message: string): Token | undefined {
    if (this.check(type)) {
      return this.advance();
    }
    throw this.error(this.peek(), message);
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) {
      return false;
    }
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) {
      this.current++;
    }
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private error(token: Token, message: string) {
    Lox.parseError(token, message);
    return new ParseError();
  }

  private synchronize(): void {
    this.advance();
    while (!this.isAtEnd()) {
      if (this.previous().type === TokenType.SEMICOLON) {
        return;
      }
      switch (this.peek().type) {
        case TokenType.CLASS:
        case TokenType.FUN:
        case TokenType.VAR:
        case TokenType.FOR:
        case TokenType.IF:
        case TokenType.WHILE:
        case TokenType.PRINT:
        case TokenType.RETURN:
          return;
      }
      this.advance();
    }
  }
}

export class ParseError extends Error {}
