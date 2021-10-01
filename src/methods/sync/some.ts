import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "some", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => boolean) {
        var done: boolean | undefined, value: unknown;

        while ({ done, value } = _next(), !done) try {
            if (fn(value)) return closeIterator(this, true);
        } catch (error) {
            closeIterator(this);
            throw error;
        }

        return false;
    }
)));
