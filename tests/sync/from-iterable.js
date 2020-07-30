const { deepStrictEqual } = require("assert");

exports.exec = function () {
    const iterator = Iterator.from([1, 2, 3]);
    deepStrictEqual('next' in iterator
        && iterator instanceof Iterator
        && Array.from(iterator).join(), '1,2,3', "Iterator.from(iterable) test is not passed!");
    console.log("Iterator.from(iterable) test is passed!");
}