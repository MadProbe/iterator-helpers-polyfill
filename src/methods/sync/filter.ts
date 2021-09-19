import { call, undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "filter", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => boolean) {
        for (var lastValue: unknown, done: boolean | undefined, value: unknown; { done, value } = _next(lastValue), !done;)
            try {
                if (fn(value)) lastValue = yield value;
            } catch (error) {
                closeIterator(this);
                throw error;
            }
    }
)));
