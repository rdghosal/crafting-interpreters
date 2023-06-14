use std::{env, fs::File, io::{Write, Result}, process};

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 2 {
        eprintln!("Usage: astool <output directory>");
        process::exit(64);
    }
    let output_dir: &str = &args[1];
    define_ast(
        output_dir,
        "Expr",
        vec![
            "Binary   :  Expr left, Token operator, Expr right",
            "Grouping :  Expr expression",
            "Literal  :  Object value",
            "Unary    :  Token operator, Expr right",
        ],
    ).expect("failed");
}

fn define_ast(output_dir: &str, base_name: &str, types: Vec<&str>) -> Result<()> {
    let path: String = format!("{}/{}.ts", output_dir, base_name);
    match File::create(path) {
        Ok(mut f) => {
            f.write(format!(r"abstract class {} {{", base_name).as_bytes())?;
            types.iter().for_each(|t| {
                let class_name: &str = str::trim(t.split(":").collect<&str>().0);

            });
            f.write(b"}")?;
        },
        Err(e) => panic!("{}", e),
    };
    Ok(())
}
