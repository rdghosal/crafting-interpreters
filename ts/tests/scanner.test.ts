import Scanner from "../scanner";
import Token from "../token";
import TokenType from "../tokentype";


test("test Scanner().scanTokens()", function() {
    // 1. Arrange
    const source: string = `=+(){},;`;
    const tokens = [
        TokenType.EQUAL,
        TokenType.PLUS,
        TokenType.LEFT_PAREN,
        TokenType.RIGHT_PAREN,
        TokenType.LEFT_BRACE,
        TokenType.RIGHT_BRACE,
        TokenType.COMMA,
        TokenType.SEMICOLON,
        TokenType.EOF,
    ];

    // 2. Act
    const scanned = new Scanner(source).scanTokens();

    // 3. Assert
    scanned.forEach((s, i) => {
        expect(s.type).toBe(tokens[i]);
    });
});


test("test Scanner().scanTokens() complete", function() {
    // 1. Arrange
    const source: string =`myVar = 5;
        fun compareSum(x, y) {
            print(x + y > my_var);
        };
        `;
    var tokens = [
        new Token(TokenType.IDENTIFIER, "myVar", "myVar", 1),
        new Token(TokenType.EQUAL, "=", null, 1),
        new Token(TokenType.NUMBER, "5", "5", 1),
        new Token(TokenType.SEMICOLON, ";", null, 1),
        new Token(TokenType.FUN, "fun", "", 2),
        new Token(TokenType.IDENTIFIER, "compareSum", "compareSum", 2),
        new Token(TokenType.LEFT_PAREN, "(", "", 2),
        new Token(TokenType.IDENTIFIER, "x", "x", 2),
        new Token(TokenType.COMMA, ",", "", 2),
        new Token(TokenType.IDENTIFIER, "y", "y", 2),
        new Token(TokenType.RIGHT_PAREN, ")", "", 2),
        new Token(TokenType.LEFT_BRACE, "{", "", 2),
        new Token(TokenType.PRINT, "print", "", 3),
        new Token(TokenType.LEFT_PAREN, "(", "", 3),
        new Token(TokenType.IDENTIFIER, "x", "x", 3),
        new Token(TokenType.PLUS, "+", "", 3),
        new Token(TokenType.IDENTIFIER, "y", "y", 3),
        new Token(TokenType.GREATER, ">", "", 3),
        new Token(TokenType.IDENTIFIER, "myVar", "myVar", 3),
        new Token(TokenType.RIGHT_PAREN, ")", "", 3),
        new Token(TokenType.SEMICOLON, ";", "", 3),
        new Token(TokenType.RIGHT_BRACE, "}", "", 4),
        new Token(TokenType.SEMICOLON, ";", "", 4),
        new Token(TokenType.EOF, "", null, 1),
    ];

    // 2. Act
    const scanned = new Scanner(source).scanTokens();

    // 3. Assert
    scanned.forEach((s, i) => {
        expect(s.type).toBe(tokens[i].type);
    });
});
