import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "forEach", assertIterator(assert(isFunction, O => `${ O } is not a function`,
    function (this: Generator<unknown>, _next: Generator<unknown>["next"], fn: (item: any) => unknown) {
        var done: boolean | undefined, value: unknown;
        while ({ done, value } = _next(), !done) try {
            fn(value);
        } catch (error) {
            closeIterator(this);
            throw error;
        }
    }
)));
