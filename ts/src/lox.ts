import * as fs from "fs";
import * as readline from "readline";
import { Scanner } from "./scanner";
import Token from "./token";
import TokenType from "./tokentype";

type ErrorParam = number | Token; 

class Lox {
    private static hadError: boolean = false;

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
        tokens.forEach(t => console.log(t));
        if (Lox.hadError) {
            process.exit(65);
        }
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

    private static report(line: number, where: string, message: string): void {
        console.error("[line ", line + "] Error" + where + ": " + message);
        Lox.hadError = true;
    };
};

export default Lox;
