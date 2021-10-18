import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";
import { SameValueZero } from "tslib";


export default mimic(1, "filterMap", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<Iterator, never, unknown>["next"], fn: (...args: unknown[]) => Promise<unknown>, ignoreValue?: unknown) {
        var done: boolean | undefined, value: Iterator;

        while ({ done, value } = await _next(), !done) try {
            const val = await fn(...value);

            if (SameValueZero(val, ignoreValue)) {
                yield val;
            }
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
