import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";
import { SameValueZero } from "tslib";


export default mimic(1, "filterMap", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, never, unknown>["next"], fn: (...args: readonly unknown[]) => unknown, ignoreValue?: unknown) {
        var done: boolean | undefined, value: unknown, index = 0;

        while ({ done, value } = _next(), !done) try {
            const val = fn(value, index++);

            if (SameValueZero(val, ignoreValue)) {
                yield val;
            }
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
