const { deepStrictEqual } = require("assert");

exports.exec = function () {
    const array = [1, 2, 3].values().toArray();
    deepStrictEqual(Array.isArray(array), true, "Iterator.prototype.toArray() is broken!")
    deepStrictEqual(array.join(), '1,2,3', "Iterator.prototype.toArray() is broken!");
    console.log("Iterator.prototype.toArray() test is passed!");
}