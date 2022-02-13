const { deepStrictEqual } = require("assert");

exports.exec = function () {
    const object = {
        i: 0,
        next() {
            deepStrictEqual(this, object, "Iterable.from(iterator): this is not original object!");
            return { value: ++this.i, done: this.i > 3 };
        }
    }
    const iterator = Iterator.from(object);
    deepStrictEqual('next' in iterator
        && iterator instanceof Iterator
        && Array.from(iterator).join(), '1,2,3', "Iterator.from(iterator) test is not passed!");
    console.log("Iterator.from(iterator) test is passed!");
}
