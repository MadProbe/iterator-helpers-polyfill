import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "takeWhile", assert(isFunction, O => O + " is not a function", assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => _Awaitable<boolean>) {
        var lastValue: unknown, done: boolean | undefined, value: unknown;
        while ({ done, value } = _next(), !done) try {
            if (!fn(value)) break;
        } catch (error) {
            closeIterator(this);
            throw error;
        };
        while ({ done, value } = _next(lastValue), !done) lastValue = yield value;
    }
)));
