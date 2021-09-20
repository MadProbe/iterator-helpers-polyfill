import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "starMap", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (...args: unknown[]) => _Awaitable<unknown>) {
        var lastValue: unknown, done: boolean | undefined, value: unknown;
        while ({ done, value } = _next(lastValue), !done) try {
            lastValue = yield fn(...(value as Iterator));
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
