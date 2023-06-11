class Token {
    private type: TokenType;
    private lexeme: string;
    private literal: object | null;
    private line: number;

    constructor(type: TokenType, lexeme: string, literal: object | null,
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
