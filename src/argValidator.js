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

    let graph = args.graph;

    if (format === "dot" && typeof graph !== "undefined") {
        if (typeof graph !== "number" || graph < 0) {
            errors.push(`The "graph" argument must be a positive number.`);
        }
    }

    return errors;
}

function surroundWithQuotes(value) {
    return `"${value}"`;
}
