import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


// Decorators would be neat here
// TODO: safely substitute non-function parameter later
export default mimic(undefined, "map", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown, index: number) => Promise<unknown>) {
        var done: boolean | undefined, value: unknown, index = 0;

        while ({ done, value } = await _next(), !done) try {
            yield await fn(value, index++);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
