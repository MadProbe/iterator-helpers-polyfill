const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual(Iterator.prototype[Symbol.toStringTag], 'Iterator', "Iterator.prototype.@@toStringTag is broken!");
    console.log("Iterator.prototype.@@toStringTag test is passed!");
}
