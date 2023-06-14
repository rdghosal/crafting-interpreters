use std::{
    env,
    fs::File,
    io::{Result, Write},
    process,
};

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
            "Binary   =  left: Expr, operator: Token, right: Expr",
            "Grouping =  expression: Expr",
            "Literal  =  value: any",
            "Unary    =  operator: Token, right: Expr",
        ],
    ).expect("Failed to generate AST expressions");
}

fn define_ast(output_dir: &str, base_name: &str, types: Vec<&str>) -> Result<()> {
    let path: String = format!("{}/{}.ts", output_dir, base_name);
    match File::create(path) {
        Ok(mut f) => {
            f.write(format!(r"abstract class {} {{", base_name).as_bytes())?;
            f.write(b"};\n\n")?;
            for t in types {
                let substrs: Vec<&str> = t.split("=").collect();
                let class_name = substrs[0].trim();
                let fields = substrs[1].trim();
                define_type(&mut f, base_name, class_name, fields)?;
            }
        }
        Err(e) => panic!("{}", e),
    };
    Ok(())
}

fn define_type(f: &mut File, base_name: &str, class_name: &str, field_list: &str) -> Result<()> {
    f.write(format!("class {} extends {} {{\n", class_name, base_name).as_bytes())?;

    // Fields.
    let fields: Vec<&str> = field_list.split(", ").collect();
    for field in &fields {
        f.write(format!("\tpublic readonly {};\n", field).as_bytes())?;
    }

    // Constructor.
    f.write(format!("\tconstructor({}) {{\n", field_list).as_bytes())?;
    f.write(b"\t\tsuper();\n")?;
    for field in &fields {
        let name = field.split(": ").collect::<Vec<&str>>()[0];
        f.write(format!("\t\tthis.{} = {};\n", name, name).as_bytes())?;
    }
    f.write(b"\t}\n")?;
    f.write(b"};\n\n")?;
    Ok(())
}
