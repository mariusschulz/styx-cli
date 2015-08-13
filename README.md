# styx-cli

Provides a command-line interface for the [Styx](https://github.com/mariusschulz/styx/) control flow graph derivation library.


## Install

```
$ npm install -g styx-cli
```


## Usage

The following command will load the `input.js` file, analyze the JavaScript program, export it as JSON, and write the output to stdout:

```
$ styx input.js
```

If the `--minify-json` flag is set, the exported JSON will be minified (rather than properly indented):

```
$ styx input.js --minify-json
```

The output can be redirected to a specific file using the *output redirection operator*:

```
$ styx input.js > input.json
```

To export the control flow graph of the main program in DOT format, set `--format` to `dot`:

```
$ styx input.js --format dot
```

To export the control flow graph of a specific function in DOT format, provide the function ID via `--graph`:

```
$ styx input.js --format dot --graph 1
```

All available command-line arguments are shown when the `--help` flag is set:

```
$ styx --help
```
