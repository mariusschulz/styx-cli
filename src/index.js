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
        argumentErrors.forEach(displayError);
        return;
    }

    processInputFile(args);
}

function processInputFile(args) {
    fs.readFile(args.input, "utf-8", function(err, fileContents) {
        if (err) {
            displayError(`Couldn't read input file "${err.path}"`);
            return;
        }

        const ast = esprima.parse(fileContents);
        const flowProgram = Styx.parse(ast);
        const exportedProgram = Styx.exportProgram(flowProgram, args.format);

        console.log(exportedProgram);
    });
}

function displayError(message) {
    console.log(chalk.red.bold(message));
}
