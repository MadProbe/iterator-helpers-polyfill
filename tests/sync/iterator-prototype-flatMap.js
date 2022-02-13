const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual(Array.from([1, 2, 3].values().flatMap(it => [it, 0])).join(), '1,0,2,0,3,0', "Iterator.prototype.flatMap() is broken!");
    console.log("Iterator.prototype.flatMap() test is passed!");
}
