import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "some", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: Generator<unknown>, _next: Generator<unknown>["next"], fn: (item: any) => boolean) {
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
