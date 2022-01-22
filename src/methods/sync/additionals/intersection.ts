import from from "@sync/statics/from.js";
import { assertIsIterator, assertIterator, assertReplace, mimic } from "@utils/utils.js";
import { type AnyFunction, bind, contains, undefined } from "tslib";


export default mimic(undefined, "intersection", assertReplace((x, s = from(x as never)) => bind(assertIsIterator(s) as AnyFunction, s), assertIterator(
    function* (this: Iterator<unknown>, next: Iterator<unknown, unknown, unknown>["next"], next2: Iterator<unknown, unknown, unknown>["next"]) {
        var array: unknown[] = [];
        var length = 0, done, value;

        while ({ done, value } = next2(), !done) array[length++] = value;

        while ({ done, value } = next(), !done)
            if (contains(array, value)) yield value;
    }
)));
