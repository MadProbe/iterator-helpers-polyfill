import { apply, Array, min, undefined } from "tslib";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


/** A clever implementation of tee method which is garbage-collection friendly */
class ClonedAsyncIterator {
    private done?: readonly [number, unknown];
    private lastValue!: unknown;
    public constructor(private readonly next: AsyncIterator<unknown, unknown, unknown>["next"]) { }
    public create(count: number): readonly AsyncGenerator[] {
        const a = Array<AsyncGenerator>(count), results: unknown[] = [], positions: number[] = [];

        for (var i = 0; i < count; i++) {
            a[i] = this.start(i, results, positions);
        }

        return a;
    }
    public async *start(index: number, results: unknown[], positions: number[]) {
        // internal count of items consumed by this instance of iterator.
        var position = positions[index] = 0;

        while (this.done?.[0] !== position) {
            if (position >= results.length) {
                const { done, value } = await this.next(this.lastValue);

                if (done) {
                    this.done = [position, value];

                    return value;
                }
                this.lastValue = yield results[position++] = value;
                positions[index] = position;
                continue;
            }
            const result = results[position++];

            positions[index] = position;
            if (apply(min, undefined!, positions) === position) {
                results[position - 1] = null;
            }
            yield result;
        }

        return this.done[1];
    }
}

export default mimic(0, "tee", assertReplace((x = 2) => isPositiveInteger(x), assertIterator(
    function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], count: number) {
        return new ClonedAsyncIterator(_next).create(count);
    }
)));
