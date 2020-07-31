const { deepStrictEqual } = require("assert");

exports.exec = function () {
    deepStrictEqual([1, 2, 3].values() instanceof Iterator, true, "iterator is not instanceof Iterator!");
    console.log("iterator instanceof Iterator test is passed!");
}
