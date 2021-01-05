let csvToJson = require('convert-csv-to-json');

let fileInputName = 'Tennis Match Test Users.csv';
let fileOutputName = 'Tennis Match Test Users.json';

csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName, fileOutputName);

