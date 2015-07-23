import chalk from "chalk";
import esprima from "esprima";
import yargs from "yargs";
import * as Styx from "../../styx/dist/transpiled/styx";

import fs from "fs";

import { validateCommandLineArgs } from "./argValidator";
import help from "./help";

// ============================================================================

const commandLineArgs = yargs
    .alias("i", "input")
    .alias("o", "output")
    .alias("f", "format")
    .argv;

runStyx(commandLineArgs);

function runStyx(args) {
    if (args.help) {
        help.show();
        return;
    }

    const argumentErrors = validateCommandLineArgs(args);

    if (argumentErrors.length) {
        const errorMessage = argumentErrors.join("\n");
        exitWithError(errorMessage);
    }

    processInputFile(args);
}

function processInputFile(args) {
    fs.readFile(args.input, "utf-8", function(err, fileContents) {
        if (err) {
            exitWithError(`Couldn't read input file "${err.path}".`);
        }

        const ast = esprima.parse(fileContents);
        const flowProgram = Styx.parse(ast);
        const exportedProgram = Styx.exportProgram(flowProgram, args.format);

        if (args.output) {
            writeExportToFile(exportedProgram, args);
        } else {
            console.log(exportedProgram);
        }
    });
}

function writeExportToFile(exportedProgram, args) {
    fs.writeFile(args.output, exportedProgram, function(err) {
        if (err) {
            exitWithError(err);
        }

        console.log(chalk.bold.green("Export successful."));
    });
}

function displayError(errorMessage) {
    console.log(chalk.red.bold(errorMessage));
}

function exitWithError(errorMessage) {
    displayError(errorMessage);
    process.exit(1);
}
