import esprima from "esprima";
import yargs from "yargs";
import * as Styx from "../../styx/dist/transpiled/styx";

import help from "./help";

// ============================================================================

const args = yargs.argv;

if (args.help) {
    help.show();
} else {
    const ast = esprima.parse("var x = 3;");
    const flowProgram = Styx.parse(ast);
    const json = Styx.exportProgram(flowProgram, "json");
    console.log(json);
}
