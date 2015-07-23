import chalk from "chalk";

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

const USAGE = `  styx ${highlight("<file>")} [--format ${highlight("<format>")}] [--help]`;

const ARG_EXPLANATIONS = `
    --format ${highlight("<format>")}    Specifies an output format: ${highlight("json")}, ${highlight("dot")}
    --help               Displays this help text`;

function show() {
    console.log(highlight(ASCII_ART_HEADER));
    console.log(USAGE);
    console.log(ARG_EXPLANATIONS);
}
