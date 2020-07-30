const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual([1, 2, 3].values().some(it => typeof it === 'number'), true, "Iterator.prototype.some() is broken!");
    console.log("Iterator.prototype.some() test is passed!");
}