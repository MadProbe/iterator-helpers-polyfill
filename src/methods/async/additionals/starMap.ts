import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "starMap", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (...args: unknown[]) => _Awaitable<unknown>) {
        var lastValue: unknown, done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(lastValue), !done) try {
            lastValue = yield await fn(...(value as Iterator));
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
