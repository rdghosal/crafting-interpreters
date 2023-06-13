import * as fs from "fs";
import * as readline from "readline";
import { Scanner } from "./scanner";

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

    static error(line: number, message: string): void {
        Lox.report(line, "", message);
    };

    private static report(line: number, where: string, message: string): void {
        console.error("[line ", line + "] Error" + where + ": " + message);
        Lox.hadError = true;
    };
};

export default Lox;
