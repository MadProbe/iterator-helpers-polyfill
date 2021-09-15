import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "reduce", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], fn: (acc: unknown, item: unknown) => _Awaitable<unknown>, accumulator?: unknown) {
        if (!(2 in arguments)) {
            if ({ value, done } = await _next(), done) {
                throw TypeError("reduce of empty iterator with no initial value");
            }
            accumulator = value;
        }
        var value: any, done: boolean | undefined;
        while ({ value, done } = await _next(), !done) try {
            accumulator = await fn(value, accumulator);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
        return accumulator;
    }
)));
