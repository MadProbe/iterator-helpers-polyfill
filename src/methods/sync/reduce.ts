import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "reduce", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (acc: unknown, item: unknown) => unknown, accumulator?: unknown) {
        if (!(2 in arguments)) {
            if ({ value, done } = _next(), done) {
                throw TypeError("reduce of empty iterator with no initial value");
            }
            accumulator = value;
        }
        var value: unknown, done: boolean | undefined;

        while ({ value, done } = _next(), !done) try {
            accumulator = fn(value, accumulator);
        } catch (error) {
            closeIterator(this);
            throw error;
        }

        return accumulator;
    }
)));
