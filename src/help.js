import chalk from "chalk";
import { supportedOutputFormats } from "./argValidator";

export default { show };

const highlight = chalk.bold.green;
const highlightSecondary = chalk.bold.yellow;

const ASCII_ART_HEADER = `   ____  _
  / ___|| |_ _   ___  __
  \\___ \\| __| | | \\ \\/ /
   ___) | |_| |_| |>  <
  |____/ \\__|\\__, /_/\\_\\
             |___/
`;

const usageCommands = [
  "-f " + highlight("<format>"),
  "-g " + highlight("<graph id>"),
  "-o " + highlight("<file>"),
  "-m",
  "--help"
];

const usage = "  $ styx " + usageCommands.map(surroundWithBrackets).join(" ");

const formattedOutputFormats = supportedOutputFormats
  .map(format => highlightSecondary(format))
  .join(" or ");

// prettier-ignore
const argExplanations = `
    -f, --format ${highlight("<format>")}     Desired output format (${formattedOutputFormats})
    -g, --graph ${highlight("<graph id>")}    ID of the control flow graph to export (${highlightSecondary("dot")}-only)
    -m, --minified-json       Minifies the serialized JSON string (${highlightSecondary("json")}-only)
    -o, --output ${highlight("<file>")}       Path to the output file

    --help                    Displays this help text`;

function show() {
  console.log(highlight(ASCII_ART_HEADER));
  console.log(usage);
  console.log(argExplanations);
}

function surroundWithBrackets(value) {
  return `[${value}]`;
}
