import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(1, "reduce", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (acc: unknown, item: unknown, index: number) => unknown, accumulator?: unknown) {
        if (!(2 in arguments)) {
            if ({ value, done } = _next(), done) {
                throw TypeError("reduce of empty iterator with no initial value");
            }
            accumulator = value;
        }
        var value: unknown, done: boolean | undefined, index = 0;

        while ({ value, done } = _next(), !done) try {
            accumulator = fn(accumulator, value, index++);
        } catch (error) {
            closeIterator(this);
            throw error;
        }

        return accumulator;
    }
)));
