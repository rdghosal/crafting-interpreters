use std::{env, process, fs, io::{stdin, BufRead}};
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
    run(fs::read_to_string(path).unwrap());
}

fn run_prompt() {
    // todo
    println!("running prompt...");
    let mut line = String::new();
    let mut lines = Vec::new();
    let mut stream = stdin().lock();
    while let Ok(n) = stream.read_line(&mut line) {
        if n == 0 {
            break;
        }
        lines.push(line);
        line = String::new();
    }
    println!("{:#?}", lines);
}

fn run(source: String) {
    // todo
    let scanner = Scanner::new(source);
    println!("running");
}

