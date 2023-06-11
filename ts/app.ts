import * as fs from "fs";
import * as readline from "readline";


type Token = {};

class Scanner {
    private source: string;
    constructor(source: string) { this.source = source.trim(); };
    public scanTokens(): Token[] { return this.source.split(' '); };
};


class Lox {
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
        rl.setPrompt('> ');
        rl.prompt();
        rl.on('line', (line: string) => {
            Lox.run(line);
            rl.prompt();
        });
    };

    static run(source: string): void {
        const scanner = new Scanner(source);
        const tokens = scanner.scanTokens();
        tokens.forEach(t => console.log(t));
    };
};

Lox.main([]);
