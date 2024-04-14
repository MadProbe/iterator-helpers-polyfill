import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";
import { SameValueZero } from "tslib";


export default mimic(1, "filterMap", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, never, unknown>["next"], fn: (...args: readonly unknown[]) => Promise<unknown>, ignoreValue?: unknown) {
        var done: boolean | undefined, value: unknown, index = 0;

        while ({ done, value } = await _next(), !done) try {
            const val = await fn(value, index++);

            if (SameValueZero(val, ignoreValue)) {
                yield val;
            }
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
