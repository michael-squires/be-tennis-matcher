const testData = require("./test-data/index.js");
//const devData = require("./development-data/index.js");

const ENV = process.env.NODE_ENV || "test";

console.log('ENV, testData in data/index.js', ENV, testData)

const data = {
    // development: devData,
    test: testData,
    // production: devData,
};

module.exports = data[ENV]
