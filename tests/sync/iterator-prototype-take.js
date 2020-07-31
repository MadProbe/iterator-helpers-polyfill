const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual(Array.from([1, 2, 3].values().take(2)).join(), '1,2', "Iterator.prototype.take() is broken!");
    console.log("Iterator.prototype.take() test is passed!");
}
