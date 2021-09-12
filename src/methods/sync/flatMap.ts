import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";
import from from "./from.js";


export default mimic(undefined, "flatMap", assertIterator(assert(isFunction, O => `${ O } is not a function`,
    function* (this: Generator<unknown>, _next: Generator<unknown>["next"], fn: (item: any) => Iterator) {
        var done: boolean | undefined, value: unknown;
        while ({ done, value } = _next(), !done) try {
            // Issue #114 flatMap should act like it does a `yield *` on each iterable
            // https://github.com/tc39/proposal-iterator-helpers/issues/114
            yield* from(fn(value));
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
