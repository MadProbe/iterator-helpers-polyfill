import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "forEach", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => unknown) {
        var done: boolean | undefined, value: unknown;

        while ({ done, value } = _next(), !done) try {
            fn(value);
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
