import chalk from "chalk";
import esprima from "esprima";
import yargs from "yargs";
import * as Styx from "../../styx/dist/transpiled/styx";

import fs from "fs";

import { validateCommandLineArgs } from "./argValidator";
import help from "./help";

const commandLineArgs = yargs
    .alias("o", "output")
    .alias("f", "format")
    .alias("g", "graph")
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
    fs.readFile(args._[0], "utf-8", function(err, fileContents) {
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
    const format = (args.format || "json").trim().toLowerCase();

    switch (format) {
        case "json":
            let pretty = !args.minifyJson;
            return Styx.exportAsJson(flowProgram, { pretty });

        case "dot":
            let flowGraph = findFlowGraphForId(flowProgram, args.graph);
            return Styx.exportAsDot(flowGraph);

        default:
            throw Error(`Encountered unsupported format "${args.format}"`);
    }
}

function findFlowGraphForId(flowProgram, functionId) {
    if (!functionId) {
        return flowProgram.flowGraph;
    }

    for (let i = 0, length = flowProgram.functions.length; i < length; i++) {
        let fun = flowProgram.functions[i];

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

function exitWithError(errorMessage) {
    console.error(chalk.bold.red(errorMessage));
    process.exit(1);
}
