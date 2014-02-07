var fs = require('fs'),
    util = require('util'),
    xml2js = require('xml2js'),
    args = process.argv.splice(2),
    parse;

if (args.length < 2) {
    console.log('Usage: node convert <path_to_input_file.xml> <path_to_output_file.json>');
    return;
}

parser = new xml2js.Parser({
    explicitArray: false,
    mergeAttrs: true
});

fs.readFile(args[0], function (err, data) {
    if (err) {
        console.error('ERROR: Couldn\'t open source file');
        return;
    }

    parser.parseString(data, function (err, data) {
        if (err) {
            console.error('ERROR: Couldn\'t convert');
            return;
        }

        data = data.font;
        data.font = true;
        data.pages = [data.pages.page];
        data.char = data.chars.char;
        data.kernings = data.kernings.kerning;
        delete data.chars;
        
        fs.writeFile(args[1], JSON.stringify(data), function (err) {
            if (err) {
                console.error('ERROR: Couldn\'t save output file');
                return;
            }

            console.log('Succesfully converted!');
        });
    });
});