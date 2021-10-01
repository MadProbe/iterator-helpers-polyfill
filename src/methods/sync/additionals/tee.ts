import { Array, undefined } from "tslib";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


/** A clever implementation of tee method which is garbage-collection friendly */
class ClonedIterator {
    private readonly results: unknown[] = [];
    private readonly positions: [number, ...number[]] = [] as never; // I assert that there'll be atleast 1 number in array.
    private done?: readonly [number, unknown];
    private index = 0;
    private lastValue!: unknown;
    constructor(private readonly next: Iterator<unknown, unknown, unknown>["next"]) { }
    create(count: number): Generator[] {
        const a = Array<Generator>(count);
        for (var i = 0; i < count; i++) {
            a[i] = this.start();
        }
        return a;
    }
    *start() {
        const index = this.index++;
        // internal count of items consumed by this instance of iterator.
        var position = this.positions[index] = 0;
        while (this.done?.[0] !== position) {
            if (position >= this.results.length) {
                const { done, value } = this.next(this.lastValue);
                if (done) {
                    this.done = [position, value];
                    return value;
                }
                this.lastValue = yield this.results[this.positions[index] = position++] = value;
                continue;
            }
            const result = this.results[position++];
            this.positions[index] = position;
            if (this.minimal === position) {
                this.results[position - 1] = null;
            }
            yield result;
        }
        return this.done[1];
    }
    get minimal(): number {
        var index = 1;
        var result = this.positions[0];
        var length = this.positions.length;
        for (; index < length; index++) {
            result = result > this.positions[index] ? this.positions[index] : result;
        }
        return result;
    }
}

export default mimic(undefined, "tee", assertReplace((x = 2) => isPositiveInteger(x), assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], count: number) {
        return new ClonedIterator(_next).create(count);
    }
)));
