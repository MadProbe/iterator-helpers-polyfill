import { call, shift, undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


class PartitionateAsyncIterator {
    private done?: readonly [unknown];
    private rejected?: readonly [unknown];
    private lastValue?: unknown;
    public constructor(private readonly next: AsyncIterator<unknown, unknown, unknown>["next"],
        private readonly fn: (...args: readonly unknown[]) => Promise<boolean>, private readonly _iterator: AsyncIterator<unknown>) { }
    private async *start(direction: boolean, items: unknown[], opposite: unknown[]) {
        while (1) {
            if (this.rejected) throw this.rejected[0];
            try {
                while (items.length > 0) yield shift(items);
                if (this.done) break;
                while (1) {
                    var { value, done } = await this.next(this.lastValue), result: boolean;

                    if (done) {
                        this.done = [value];
                        while (items.length > 0) yield shift(items);

                        return value;
                    }
                    try {
                        result = await call(this.fn, undefined!, value); // fn would be otherwise called with `this` set with current `this` value (of PartitionateAsyncIterator class);
                    } catch (error) {
                        await closeAsyncIterator(this._iterator);
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

        return this.done?.[0];
    }
    public create(items: unknown[] = [], items2: unknown[] = []) {
        return [this.start(true, items, items2), this.start(false, items2, items)];
    }
}


export default mimic(undefined, "partition", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (...args: readonly unknown[]) => Promise<boolean>) {
        return new PartitionateAsyncIterator(_next, fn, this).create();
    }
)));
