const supportedOutputFormats = ["json", "dot"];

export { validateCommandLineArgs, supportedOutputFormats };

function validateCommandLineArgs(args) {
    const errors = [];

    if (!args._[0]) {
        errors.push("Please specify an input file.");
    }

    const format = (args.format || "").trim().toLowerCase();

    if (format && supportedOutputFormats.indexOf(format) === -1) {
        const allowedFormats = supportedOutputFormats.map(surroundWithQuotes).join(" or ");
        errors.push(`Please specify an output format (either ${allowedFormats}).`);
    }

    return errors;
}

function surroundWithQuotes(value) {
    return `"${value}"`;
}
