import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "starMap", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<Iterator<unknown>, never, unknown>["next"], fn: (...args: readonly unknown[]) => Promise<unknown>) {
        var done: boolean | undefined, value: Iterator<unknown>;

        while ({ done, value } = await _next(), !done) try {
            yield await fn(...value);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
