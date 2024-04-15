const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual(Array.from([1, 2, 3].values().drop(1)).join(), "2,3", "Iterator.prototype.drop() is broken!");
    console.log("Iterator.prototype.drop() test is passed!");
}
