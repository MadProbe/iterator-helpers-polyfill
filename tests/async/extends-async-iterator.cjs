const { deepStrictEqual } = require("assert");
exports.exec = function () {
    class Class extends AsyncIterator { }
    const instance = new Class();
    deepStrictEqual(instance[Symbol.asyncIterator](), instance, "class extends AsyncIterator test is not passed!");
    console.log("class extends AsyncIterator test is passed!");
}
