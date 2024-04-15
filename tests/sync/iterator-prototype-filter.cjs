const { deepStrictEqual } = require("assert")

exports.exec = function () {
    deepStrictEqual(Array.from([1, 2, 3].values().filter(it => it % 2)).join(), '1,3', "Iterator.prototype.filter() is broken!");
    console.log("Iterator.prototype.filter() test is passed!");
}
