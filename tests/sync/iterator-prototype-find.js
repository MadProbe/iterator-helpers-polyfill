const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual([1, 2, 3].values().find(it => it % 2), 1, "Iterator.prototype.find() is broken!");
    console.log("Iterator.prototype.find() test is passed!");
}
