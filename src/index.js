const esprima = require("esprima");
const Styx = require("../../styx/dist/transpiled/styx");
const args = require("yargs").argv;

const help = require("./help");

// ============================================================================

if (args.help) {
    help.show();
} else {
    var ast = esprima.parse("var x = 3;");
    var flowProgram = Styx.parse(ast);
    var json = Styx.exportProgram(flowProgram, "json");
    console.log(json);
}
