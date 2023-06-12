import TokenType from "./tokentype";

class Token {
    readonly type: TokenType;
    readonly lexeme: string;
    readonly literal: object | null;
    readonly line: number;

    constructor(type: TokenType, lexeme: string, literal: any | null,
                line: number) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    };

    public toString() {
        return this.type + " " + this.lexeme + " " + this.literal;
    };
};


export default Token;
