import Token from "./token"

class Scanner {
    private source: string;
    private tokens: Token[] = [];

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
            this.scanTokens();
        }
        this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
        return this.tokens;
    };

    private isAtEnd(): boolean {
        return this.current >= this.source.length;
    };
};

export default Scanner;
