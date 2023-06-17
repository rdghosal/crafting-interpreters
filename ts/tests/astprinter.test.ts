import AstPrinter from "../src/astprinter";
import { Binary, Grouping, Literal, Unary } from "../src/expr";
import Token from "../src/token";
import TokenType from "../src/tokentype";


test("AstPrinter().print())", function() {

    // 1. Arrange
    const expression = new Binary(
        new Unary(new Token(TokenType.MINUS, "-", null, 1), new Literal(123)),
        new Token(TokenType.STAR, "*", null, 1),
        new Grouping(new Literal(45.67)
        ),
    );

    // 2. Act
    const printer = new AstPrinter();

    // 3. Assert
    expect(printer.print(expression)).toBe("(* (- 123) (group 45.67))");
});
