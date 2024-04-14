import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "toAsync", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"]) {
        var done: boolean | undefined, value: unknown;

        while ({ done, value } = _next(), !done) try {
            yield await value;
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
