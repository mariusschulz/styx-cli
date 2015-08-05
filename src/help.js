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

const usage = `  styx [-o ${highlight("<file>")}] [-f ${highlight("<format>")}]
       [--minified-json] [--help]`;

const formattedOutputFormats = supportedOutputFormats.map(format => highlight(format)).join(" or ");

const argExplanations = `
    -o, --output ${highlight("<file>")}      Path to the output file
    -f, --format ${highlight("<format>")}    The desired output format: ${formattedOutputFormats}

    --minified-json          Minifies the serialized JSON string

    --help                   Displays this help text`;

function show() {
    console.log(highlight(ASCII_ART_HEADER));
    console.log(usage);
    console.log(argExplanations);
}
