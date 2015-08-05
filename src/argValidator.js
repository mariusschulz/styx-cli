const supportedOutputFormats = ["json", "dot"];

export { validateCommandLineArgs, supportedOutputFormats };

function validateCommandLineArgs(args) {
    const errors = [];

    if (!args.input) {
        errors.push("Please specify an input file.");
    }

    const format = (args.format || "").trim().toLowerCase();

    if (format && supportedOutputFormats.indexOf(format) === -1) {
        const allowedFormats = supportedOutputFormats.map(format => `"${format}"`).join(" or ");
        errors.push(`Please specify an output format (either ${allowedFormats}).`);
    }

    return errors;
}
