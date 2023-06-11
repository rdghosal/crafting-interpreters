class Token {
    private readonly type: TokenType;
    private readonly lexeme: string;
    private readonly literal: object | null;
    private readonly line: number;

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
