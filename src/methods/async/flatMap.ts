import { TypeError, undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";
import from from "./statics/from.js";


export default mimic(undefined, "flatMap", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown, index: number) => Promise<AsyncIterator<unknown>>) {
        var done: boolean | undefined, value: unknown, index = 0;

        while ({ done, value } = await _next(), !done) try {
            const it = await fn(value, index++);

            if (typeof it === "string") throw TypeError("AsyncIterator.flatMap doesn't accept strings as passed function's return value");
            // Issue #114 flatMap should act like it does a `yield *` on each iterable
            // https://github.com/tc39/proposal-iterator-helpers/issues/114
            yield* from(it);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
