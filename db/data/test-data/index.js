let csvToJson = require('convert-csv-to-json');

let fileInputName = 'Tennis Match Test Users.csv'; 
let fileOutputName = 'Tennis Match Test Users.json';

csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);

// let csvToJson = require('convert-csv-to-json');

// let json = csvToJson.fieldDelimiter(',').getJsonFromCsv('Tennis Match Test.csv');

// for(let i=0; i<json.length;i++){
//     console.log(json[i]);
// }