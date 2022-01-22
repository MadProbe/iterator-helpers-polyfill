import { call, shift, undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


class PartitionateIterator {
    private _done?: readonly [unknown];
    private rejected?: readonly [unknown];
    private lastValue?: unknown;
    public constructor(private readonly _next: Iterator<unknown, unknown, unknown>["next"],
        private readonly fn: (...args: readonly unknown[]) => boolean, private readonly _iterator: Iterator<unknown>) { }
    private *start(direction: boolean, items: unknown[], opposite: unknown[]) {
        while (1) {
            if (this.rejected) throw this.rejected[0];
            try {
                while (items.length > 0) yield shift(items);
                if (this._done) break;
                while (1) {
                    var { value, done } = this._next(this.lastValue), result: boolean;

                    if (done) {
                        this._done = [value];
                        while (items.length > 0) yield shift(items);

                        return value;
                    }
                    try {
                        result = call(this.fn, undefined!, value); // fn would be otherwise called with `this` set with current `this` value (of PartitionateIterator class);
                    } catch (error) {
                        closeIterator(this._iterator);
                        throw error;
                    }
                    if (!!result === direction) {
                        while (items.length > 0) yield shift(items);
                        this.lastValue = yield value;
                        break;
                    } else {
                        opposite[opposite.length] = value;
                    }
                }
            } catch (error) {
                this.rejected = [error];
                throw error;
            }
        }

        return this._done && this._done[0];
    }
    public _create(items: unknown[] = [], items2: unknown[] = []) {
        return [this.start(true, items, items2), this.start(false, items2, items)];
    }
}


export default mimic(undefined, "partition", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (...args: readonly unknown[]) => boolean) {
        return new PartitionateIterator(_next, fn, this)._create();
    }
)));
