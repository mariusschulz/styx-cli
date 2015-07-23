import chalk from "chalk";
import esprima from "esprima";
import yargs from "yargs";
import * as Styx from "../../styx/dist/transpiled/styx";

import fs from "fs";

import { validateCommandLineArg } from "./argValidator";
import help from "./help";

// ============================================================================

const args = yargs
    .alias("i", "input")
    .alias("o", "output")
    .alias("f", "format")
    .argv;

if (args.help) {
    help.show();
} else {
    const argumentErrors = validateCommandLineArg(args);

    if (argumentErrors.length) {
        const errorList = argumentErrors.map(error => `  - ${error}`).join("\n");
        console.log(chalk.red.bold(errorList));
    } else {
        fs.readFile(args.input, "utf-8", function(err, fileContents) {
            if (err) {
                console.log(chalk.red.bold(`Couldn't read input file "${err.path}"`));
                return;
            }

            const ast = esprima.parse(fileContents);
            const flowProgram = Styx.parse(ast);
            const json = Styx.exportProgram(flowProgram, "json");
            //console.log(json);
        });
    }
}
