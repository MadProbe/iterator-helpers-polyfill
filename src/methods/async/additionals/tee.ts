import { apply, Array, min, undefined } from "tslib";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


/** A clever implementation of tee method which is garbage-collection friendly */
class ClonedAsyncIterator {
    private _done?: readonly [number, unknown];
    public constructor(private readonly _next: AsyncIterator<unknown, unknown, unknown>["next"]) { }
    public _create(count: number): readonly AsyncGenerator[] {
        const a = Array<AsyncGenerator>(count), results: unknown[] = [], positions = Array<number>(count);

        for (var i = 0; i < count; i++) {
            positions[i] = 0;
            a[i] = this.start(i, results, positions);
        }

        return a;
    }
    public async *start(index: number, results: unknown[], positions: number[]) {
        // internal count of items consumed by this instance of iterator.
        var position = 0;

        while ((this._done && this._done[0]) !== position) {
            if (position >= results.length) {
                const { done, value } = await this._next();

                if (done) {
                    this._done = [position, value];

                    return value;
                }
                yield results[position++] = value;
                positions[index] = position;
                continue;
            }
            const result = results[position++];

            positions[index] = position;
            if (apply(min, undefined!, positions) === position) {
                delete results[position - 1];
            }
            yield result;
        }

        return this._done && this._done[1];
    }
}

export default mimic(0, "tee", assertReplace((x = 2) => isPositiveInteger(x), assertIterator(
    function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], count: number) {
        return new ClonedAsyncIterator(_next)._create(count);
    }
)));
