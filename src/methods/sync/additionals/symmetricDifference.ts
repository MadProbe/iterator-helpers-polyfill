import from from "@sync/statics/from.js";
import { assertIsIterator, assertIterator, assertReplace, mimic } from "@utils/utils.js";
import { type AnyFunction, bind, contains, undefined } from "tslib";


export default mimic(undefined, "symmetricDifference",
    assertReplace((x, s = from(x as never)) => bind(assertIsIterator(s) as AnyFunction, s), assertIterator(
        function* (this: Iterator<unknown>, next: Iterator<unknown, unknown, unknown>["next"], next2: Iterator<unknown, unknown, unknown>["next"]) {
            var array: unknown[] = [], blacklist: unknown[] = [];
            var length = 0, done, value, length2 = 0;

            while ({ done, value } = next2(), !done) array[length++] = value;

            while ({ done, value } = next(), !done) {
                if (!contains(array, value)) yield value;
                else blacklist[length2++] = value;
            }

            for (var index = 0; index < length; index++) {
                const item = array[index];

                if (!contains(blacklist, item)) yield item;
            }
        }
    )));
