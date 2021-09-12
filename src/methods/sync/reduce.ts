import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "reduce", assertIterator(assert(isFunction, O => `${ O } is not a function`,
    function (this: Generator<unknown>, _next: Generator<unknown>["next"], fn: (acc: unknown, item: unknown) => _Awaitable<boolean>, accumulator?: unknown) {
        if (!(2 in arguments)) {
            if ({ value, done } = _next(), done) {
                throw TypeError("reduce of empty iterator with no initial value");
            }
            accumulator = value;
        }
        var value: any, done: boolean | undefined;
        while ({ value, done } = _next(), !done) try {
            accumulator = fn(value, accumulator);
        } catch (error) {
            closeIterator(this);
            throw error;
        }
        return accumulator;
    }
)));
