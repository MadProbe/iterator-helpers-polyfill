import { call, undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "filter", assertIterator(assert(isFunction, O => `${ O } is not a function`,
    function* (this: Generator<unknown>, _next: Generator<unknown>["next"], fn: (item: any) => boolean) {
        for (var lastValue: unknown, done: boolean | undefined, value: unknown; { done, value } = _next(lastValue), !done;)
            try {
                if (fn(value)) lastValue = yield value;
            } catch (error) {
                closeIterator(this);
                throw error;
            }
    }
)));
