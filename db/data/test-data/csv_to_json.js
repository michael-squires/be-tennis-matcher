let csvToJson = require('convert-csv-to-json');

//let fileInputName = 'Tennis Match Test Users.csv';
//let fileOutputName = 'Tennis Match Test Users.json';

let fileInputName2 = 'Tennis Match Test Clubs.csv';
let fileOutputName2 = 'Tennis Match Test Clubs.json';

//csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName, fileOutputName);
csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName2, fileOutputName2);

