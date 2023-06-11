use std::{env, process, fs, io::{stdin, BufRead, stdout, Write}};
use core::result::Result::Err;


struct Scanner {}

impl Scanner {
    
    pub fn new(source: String) -> Self {
        Scanner {
            // todo
        }
    }

    pub fn scan_tokens(&self) {
        // todo
    }
}


fn main() {
    let args: Vec<String> = env::args().collect();
    dbg!(&args);
    if args.len() > 2 {
        println!("Usage: rslox [script]");
        process::exit(64);
    } else if args.len() == 2 {
        run_file(&args[1]);
    } else {
        run_prompt();
    }
}

fn run_file(path: &str) {
    println!("running file...");
    // TODO: add error handling
    run(&fs::read_to_string(path).unwrap());
}

fn run_prompt() {
    println!("running prompt...");
    loop {
        print!("> ");
        stdout().flush().unwrap();
        let mut line = String::new();
        let mut stream = stdin().lock();
        if let Ok(n) = stream.read_line(&mut line) {
            if n == 0 {
                println!("breaking");
                break;
            }
        };
        if let Err(e) = run(&line) {
            let has_error = true;
        }
    }
}

fn run(source: &str) -> Result<(), &'static str> {
    let scanner = Scanner::new(source.to_string());
    println!("running {}", source);
    Ok(())
}

fn error(line: u32, message: String) {
    report(line, "".to_string(), message);
}

fn report(line: u32, where_: String, message: String) {
    eprintln!(
        "{}", format!("[line {line}] Error{where_}: {message}")
    )
}


