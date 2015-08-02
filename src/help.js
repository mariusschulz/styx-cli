import chalk from "chalk";
import { supportedOutputFormats } from "./argValidator";

export default { show };

const highlight = chalk.cyan;

const ASCII_ART_HEADER =
`   ____  _
  / ___|| |_ _   ___  __
  \\___ \\| __| | | \\ \\/ /
   ___) | |_| |_| |>  <
  |____/ \\__|\\__, /_/\\_\\
             |___/
`;

const usage = `  styx [-i ${highlight("<file>")}] [-o ${highlight("<file>")}] [-f ${highlight("<format>")}]
       [--minified-json] [--version] [--help]`;

const formattedOutputFormats = supportedOutputFormats.map(format => highlight(format)).join(" or ");

const argExplanations = `
    -i, --input  ${highlight("<file>")}      Path to the input file
    -o, --output ${highlight("<file>")}      Path to the output file
    -f, --format ${highlight("<format>")}    The desired output format: ${formattedOutputFormats}

    --minified-json          Minifies the serialized JSON string

    --version                Displays the current version
    --help                   Displays this help text`;

function show() {
    console.log(highlight(ASCII_ART_HEADER));
    console.log(usage);
    console.log(argExplanations);
}
