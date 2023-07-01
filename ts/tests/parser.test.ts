import Parser from "../src/parser";
import Scanner from "../src/scanner";
import Token from "../src/token";
import TokenType from "../src/tokentype";

test("test Parser().parse() complete", function () {
  // 1. Arrange
  const source: string = `myVar = 5;`;
  // var tokens = [
  //     new Token(TokenType.IDENTIFIER, "myVar", "myVar", 1),
  //     new Token(TokenType.EQUAL, "=", null, 1),
  //     new Token(TokenType.NUMBER, "5", parseFloat("5"), 1),
  //     new Token(TokenType.SEMICOLON, ";", null, 1),
  //     new Token(TokenType.FUN, "fun", "", 2),
  //     new Token(TokenType.IDENTIFIER, "compareSum", "compareSum", 2),
  //     new Token(TokenType.LEFT_PAREN, "(", "", 2),
  //     new Token(TokenType.IDENTIFIER, "x", "", 2),
  //     new Token(TokenType.COMMA, ",", "", 2),
  //     new Token(TokenType.IDENTIFIER, "y", "", 2),
  //     new Token(TokenType.RIGHT_PAREN, ")", "", 2),
  //     new Token(TokenType.LEFT_BRACE, "{", "", 2),
  //     new Token(TokenType.PRINT, "print", "", 3),
  //     new Token(TokenType.LEFT_PAREN, "(", "", 3),
  //     new Token(TokenType.IDENTIFIER, "x", "", 3),
  //     new Token(TokenType.PLUS, "+", "", 3),
  //     new Token(TokenType.IDENTIFIER, "y", "", 3),
  //     new Token(TokenType.GREATER, ">", "", 3),
  //     new Token(TokenType.IDENTIFIER, "myVar", "myVar", 3),
  //     new Token(TokenType.RIGHT_PAREN, ")", "", 3),
  //     new Token(TokenType.SEMICOLON, ";", "", 3),
  //     new Token(TokenType.RIGHT_BRACE, "}", "", 4),
  //     new Token(TokenType.SEMICOLON, ";", "", 4),
  //     new Token(TokenType.EOF, "", null, 4),
  // ];

  // 2. Act
  const parsed = new Parser(new Scanner(source).scanTokens()).parse();

  // 3. Assert
  expect(parsed).toContain("accept");
});
