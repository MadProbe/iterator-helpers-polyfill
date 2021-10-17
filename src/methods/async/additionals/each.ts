import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "each", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => Promise<unknown>) {
        var done: boolean | undefined, value: unknown, lastValue: unknown;

        while ({ done, value } = await _next(lastValue), !done) try {
            await fn(value);
            lastValue = yield value;
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
