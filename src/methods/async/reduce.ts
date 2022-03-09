import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(1, "reduce", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (acc: unknown, item: unknown) => Promise<unknown>, accumulator?: unknown) {
        if (!(2 in arguments)) {
            if ({ value, done } = await _next(), done) {
                throw TypeError("reduce of empty iterator with no initial value");
            }
            accumulator = value;
        }
        var value: unknown, done: boolean | undefined;

        while ({ value, done } = await _next(), !done) try {
            accumulator = await fn(accumulator, value);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }

        return accumulator;
    }
)));
