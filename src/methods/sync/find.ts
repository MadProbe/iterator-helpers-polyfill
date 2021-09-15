import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "find", assertIterator(assert(isFunction, O => `${ O } is not a function`,
    function (this: Generator<unknown>, _next: Generator<unknown>["next"], fn: (item: any) => boolean) {
        var value: any, done: boolean | undefined;
        while ({ value, done } = _next(), !done) try {
            if (fn(value)) return closeIterator(this, value);
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));