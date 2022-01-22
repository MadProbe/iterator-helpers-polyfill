import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "each", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => unknown) {
        var done: boolean | undefined, value: unknown, lastValue: unknown;

        while ({ done, value } = _next(lastValue), !done) try {
            fn(value);
            lastValue = yield value;
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
