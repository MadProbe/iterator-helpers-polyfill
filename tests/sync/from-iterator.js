const { deepStrictEqual } = require("assert");

exports.exec = function () {
    const iterator = Iterator.from({
        i: 0,
        next() {
            return { value: ++this.i, done: this.i > 3 };
        }
    });
    deepStrictEqual('next' in iterator
        && iterator instanceof Iterator
        && Array.from(iterator).join(), '1,2,3', "Iterator.from(iterator) test is not passed!");
    console.log("Iterator.from(iterator) test is passed!");
}
