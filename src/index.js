import chalk from "chalk";
import esprima from "esprima";
import yargs from "yargs";
import * as Styx from "../../styx/dist/transpiled/styx";

import fs from "fs";

import { validateCommandLineArgs } from "./argValidator";
import help from "./help";

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

    if (argumentErrors.length > 0) {
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
        const exportedProgram = exportAsTargetFormat(flowProgram, args);

        if (args.output) {
            writeExportToFile(exportedProgram, args);
        } else {
            console.log(exportedProgram);
        }
    });
}

function exportAsTargetFormat(flowProgram, args) {
    switch (args.format.trim().toLowerCase()) {
        case "json":
            let pretty = !args.minifyJson;
            return Styx.exportAsJson(flowProgram, { pretty });

        case "dot":
            let flowGraph = findFlowGraphForId(flowProgram, 0);
            return Styx.exportAsDot(flowGraph);

        default:
            throw Error(`Encountered unsupported format "${args.format}"`);
    }
}

function findFlowGraphForId(flowProgram, functionId) {
    if (!functionId) {
        return flowProgram.flowGraph;
    }

    for (let fun of flowProgram.functions) {
        if (fun.id === functionId) {
            return fun.flowGraph;
        }
    }

    throw Error(`Couldn't find function with id ${functionId}`);
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
