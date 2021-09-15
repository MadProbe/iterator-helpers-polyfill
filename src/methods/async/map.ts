import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


// Decorators would be neat here
// TODO: safely substitute non-function parameter later
export default mimic(undefined, "map", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], fn: (item: any) => _Awaitable<unknown>) {
        var lastValue: unknown, done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(lastValue), !done) try {
            lastValue = yield await fn(value as any);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
