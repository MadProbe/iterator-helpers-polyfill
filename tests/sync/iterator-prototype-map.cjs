const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual(Array.from([1, 2, 3].values().map(it => it * it)).join(), '1,4,9', "Iterator.prototype.map() is broken!");
    console.log("Iterator.prototype.map() test is passed!");
}
