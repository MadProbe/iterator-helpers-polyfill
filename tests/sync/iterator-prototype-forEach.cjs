const { deepStrictEqual } = require("assert");

exports.exec = function () {
    let result = '';
    [1, 2, 3].values().forEach(it => result += it);
    deepStrictEqual(result, '123', "Iterator.prototype.forEach() is broken!");
    console.log("Iterator.prototype.forEach() test is passed!");
}
