import { call, shift, undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


class PartitionateAsyncIterator {
    private readonly items: readonly [unknown[], unknown[]] = [[], []];
    private done?: [unknown];
    private rejected?: [unknown];
    private lastValue?: unknown;
    public constructor(private readonly next: AsyncIterator<unknown, unknown, unknown>["next"],
        private readonly fn: (...args: unknown[]) => Promise<boolean>, private readonly iterator: AsyncIterator<unknown>) { }
    private async *start(direction: boolean) {
        var items = this.items[+direction], opposite = this.items[+!direction];

        while (1) {
            if (this.rejected) throw this.rejected[0];
            while (items.length > 0) yield shift(items);
            if (this.done) return this.done[0];
            do {
                var { value, done } = await this.next(this.lastValue);

                if (done) {
                    this.done = [value];
                    while (items.length > 0) yield shift(items);

                    return value;
                }
                try {
                    var result = await call(this.fn, undefined!, value); // fn would be otherwise called with `this` set with current `this` value (of PartitionateAsyncIterator class);
                } catch (error) {
                    await closeAsyncIterator(this.iterator);
                    throw error;
                }
                if (!!result === direction) {
                    while (items.length > 0) yield shift(items);
                    this.lastValue = yield value;
                    break;
                } else {
                    opposite[opposite.length] = value;
                }
            } while (1);
        }

        return this.done?.[0];
    }
    public create() {
        return [this.start(true), this.start(false)];
    }
}


export default mimic(undefined, "partition", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (...args: unknown[]) => Promise<boolean>) {
        return new PartitionateAsyncIterator(_next, fn, this).create();
    }
)));
