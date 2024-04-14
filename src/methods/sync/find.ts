import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "find", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown, index: number) => boolean) {
        var value: unknown, done: boolean | undefined, index = 0;

        while ({ value, done } = _next(), !done) try {
            if (fn(value, index++)) return closeIterator(this, value);
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
