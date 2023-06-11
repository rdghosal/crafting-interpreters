import * as fs from "fs";

class Lox {
    static main(args: string[]): void {
        if (args.length > 1)  {
            console.log("Usage: jlox [sript]");
            return process.exit(64);
        } else if (args.length === 1) {
            runFile(args[0]);
        } else if (args.length === 1) {
            runPrompt();
        }
    };

    static runFile(path: string) {
        fs.readFile(path, (err: NodeJS.ErrnoException, data: Buffer) => {
            if (err) {
                throw err;
            } else {
                String.fromCharCode(data);

            }
        });
    };

    static run() { // TODO }
};

