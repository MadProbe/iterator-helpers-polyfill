import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "filter", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown, index: number) => boolean) {
        for (var done: boolean | undefined, value: unknown, index = 0; { done, value } = _next(), !done;)
            try {
                if (fn(value, index++)) yield value;
            } catch (error) {
                closeIterator(this);
                throw error;
            }
    }
)));
