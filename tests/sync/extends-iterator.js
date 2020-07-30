const { deepStrictEqual } = require("assert");

exports.exec = function () {
    class Class extends Iterator { }
    const instance = new Class();
    
    deepStrictEqual(instance[Symbol.iterator](), instance, "class extends Iterator test is not passed!");
    console.log("class extends Iterator test is passed!");
}