import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";
import from from "./from.js";


export default mimic(undefined, "flatMap", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => Iterator) {
        var done: boolean | undefined, value: unknown;

        while ({ done, value } = _next(), !done) try {
            // Issue #114 flatMap should act like it does a `yield *` on each iterable
            // https://github.com/tc39/proposal-iterator-helpers/issues/114
            yield* from(fn(value)) as never as Iterable<unknown>;
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
