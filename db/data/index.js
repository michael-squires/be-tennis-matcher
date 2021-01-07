const testData = require("./test-data/index.js");
//const devData = require("./development-data/index.js");

const ENV = process.env.NODE_ENV || "test";

const data = {
    // development: devData,
    test: testData,
    production: testData,
};

module.exports = data[ENV]
