const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual(Array.from([1, 2, 3].values().asIndexedPairs()).join(), "0,1,1,2,2,3", "Iterator.prototype.asIndexedPairs() is broken!");
    console.log("Iterator.prototype.asIndexedPairs() test is passed!");
}
