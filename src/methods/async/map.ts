import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


// Decorators would be neat here
// TODO: safely substitute non-function parameter later
export default mimic(undefined, "map", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => _Awaitable<unknown>) {
        var lastValue: unknown, done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(lastValue), !done) try {
            lastValue = yield await fn(value as unknown);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
