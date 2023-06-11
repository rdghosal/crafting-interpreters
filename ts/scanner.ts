import Token from "./token"
import Lox from "./app";

class Scanner {
    private readonly source: string;
    private readonly tokens: Token[] = [];

    // First character in lexeme.
    private start: number = 0;
    // Character being considered.
    private current: number = 0;
    // Source line.
    private line: number = 1;

    constructor(source: string) {
        this.source = source;
    };

    public scanTokens(): Token[] {
        while (!this.isAtEnd()) {
            // We are at the beginning of the next lexeme.
            this.start = this.current;
            this.scanToken();
        }
        this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
        return this.tokens;
    };

    public scanToken(): void {
        const c: string = this.advance();
        switch (c) {
            case "(": this.addToken(TokenType.LEFT_PAREN); break;
            case ")": this.addToken(TokenType.RIGHT_PAREN); break;
            case "{": this.addToken(TokenType.LEFT_BRACE); break;
            case "}": this.addToken(TokenType.RIGHT_BRACE); break;
            case ",": this.addToken(TokenType.COMMA); break;
            case ".": this.addToken(TokenType.DOT); break;
            case "-": this.addToken(TokenType.MINUS); break;
            case "+": this.addToken(TokenType.PLUS); break;
            case ";": this.addToken(TokenType.SEMICOLON); break;
            case "*": this.addToken(TokenType.STAR); break;
            case "!":
                this.addToken(this.match("=")
                                ? TokenType.BANG_EQUAL
                                : TokenType.BANG);
                break;
            case "=":
                this.addToken(this.match("=")
                                ? TokenType.EQUAL_EQUAL 
                                : TokenType.EQUAL);
                break;
            case "<":
                this.addToken(this.match("=")
                                ? TokenType.LESS_EQUAL 
                                : TokenType.LESS);
                break;
            case ">":
                this.addToken(this.match("=")
                                ? TokenType.GREATER_EQUAL 
                                : TokenType.GREATER);
                break;
            default: Lox.error(this.line, "Unexpected character."); break;
        }
    };

    private match(expected: string): boolean {
        if (this.isAtEnd()) {
            return false;
        }
        if (this.source.charAt(this.current) != expected) {
            return false;
        }
        this.current++;
        return true;
    }

    private isAtEnd(): boolean {
        return this.current >= this.source.length;
    };

    private advance(): string {
        return this.source.charAt(this.current++);
    };

    private addToken(type: TokenType, literal: object | null = null): void {
        const text: string = this.source.substring(this.start, this.current);
        this.tokens.push(new Token(type, text, literal, this.line));
    };
};

export default Scanner;
