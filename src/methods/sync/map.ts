import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


// Decorators would be neat here
// TODO: safely substitute non-function parameter later
export default mimic(undefined, "map", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => unknown) {
        var lastValue: unknown, done: boolean | undefined, value: unknown;

        while ({ done, value } = _next(lastValue), !done) try {
            lastValue = yield fn(value as never);
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
