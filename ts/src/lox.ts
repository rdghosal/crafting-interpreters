import * as fs from "fs";
import * as readline from "readline";
import { Scanner } from "./scanner";
import Token from "./token";
import TokenType from "./tokentype";
import { Parser } from "./parser";
import AstPrinter from "./astprinter";
import RuntimeError from "./runtimeerror";
import Interpreter from "./interpreter";

class Lox {
    private static readonly interpreter: Interpreter = new Interpreter();
    private static hadError: boolean = false;
    private static hadRuntimeError: boolean = false;

    static main(args: string[]): void {
        if (args.length > 1)  {
            console.log("Usage: jlox [script]");
            return process.exit(64);
        } else if (args.length === 1) {
            Lox.runFile(args[0]);
        } else if (!args.length) {
            Lox.runPrompt();
        }
    };

    static runFile(path: string) {
        fs.readFile(path, (err: NodeJS.ErrnoException | null, data: Buffer) => {
            if (err) {
                throw err;
            } else {
                data.forEach((byte: number) => { 
                    Lox.run(String.fromCharCode(byte)) 
                });
                if (Lox.hadError) {
                    process.exit(65);
                }
                if (Lox.hadRuntimeError) {
                    process.exit(70);
                }
            }
        });
    };

    static runPrompt() {
        // `readline` handles Ctrl-D and closes stream by itself.
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.setPrompt("> ");
        rl.prompt();
        rl.on("line", (line: string) => {
            Lox.run(line);
            // Reset error state in case user made an error.
            Lox.hadError = false;
            rl.prompt();
        });
    };

    static run(source: string): void {
        const scanner = new Scanner(source);
        const tokens = scanner.scanTokens();
        const parser = new Parser(tokens);
        const expression  = parser.parse();
        // Sotp if there was a syntax error.
        if (this.hadError || expression === null) {
            return;
        }
        this.interpreter.intepret(expression);
    };

    // static error<T extends ErrorParam>(param: T, message: string): void {
    //     const line = (typeof param === "number") ? param : param.line;
    //     if (typeof param === 'number') {
    //         Lox.report(line, "", message);
    //     }
    // };

    static scanError(line: number, message: string): void {
        Lox.report(line, "", message);
    };

    static parseError(token: Token, message: string): void {
        if (token.type === TokenType.EOF) {
            Lox.report(token.line, " at end", message);
        } else {
            Lox.report(token.line, " at '" + token.lexeme + "'", message);
        }
    };

    static runtimeError(error: RuntimeError): void {
        console.error(error.message + "\n [line] " + error.token.line + "]");
        Lox.hadRuntimeError = true;
    }

    private static report(line: number, where: string, message: string): void {
        console.error("[line ", line + "] Error" + where + ": " + message);
        Lox.hadError = true;
    };
};

export default Lox;
