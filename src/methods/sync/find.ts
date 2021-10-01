import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "find", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => boolean) {
        var value: unknown, done: boolean | undefined;
        while ({ value, done } = _next(), !done) try {
            if (fn(value)) return closeIterator(this, value);
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
