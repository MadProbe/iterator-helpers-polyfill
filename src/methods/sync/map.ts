import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


// Decorators would be neat here
// TODO: safely substitute non-function parameter later
export default mimic(undefined, "map", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown, index: number) => unknown) {
        var done: boolean | undefined, value: unknown, index = 0;

        while ({ done, value } = _next(), !done) try {
            yield fn(value as never, index++);
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
