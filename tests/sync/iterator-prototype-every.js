const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual([1, 2, 3].values().every(it => typeof it === 'number'), true, "Iterator.prototype.every() is broken!");
    console.log("Iterator.prototype.every() test is passed!");
}
