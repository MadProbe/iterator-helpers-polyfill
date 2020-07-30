const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual([1, 2, 3].values().reduce((a, b) => a + b), 6, "Iterator.prototype.reduce() is broken!");
    console.log("Iterator.prototype.reduce() test is passed!");
}