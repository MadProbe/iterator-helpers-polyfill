import from from "@async/from.js";
import { assertIsIterator, assertIterator, assertReplace, mimic } from "@utils/utils.js";
import { bind, contains, undefined } from "tslib";


export default mimic(undefined, "symmetricDifference",
    assertReplace((x, s = from(x as never)) => bind(assertIsIterator(s), s), assertIterator(
        async function* (this: AsyncIterator<unknown>, next: AsyncIterator<unknown, unknown, unknown>["next"], next2: AsyncIterator<unknown, unknown, unknown>["next"]) {
            var array: unknown[] = [], blacklist: unknown[] = [];
            var length = 0, done, value, length2 = 0;

            while ({ done, value } = await next2(), !done) array[length++] = value;

            while ({ done, value } = await next(), !done) {
                if (!contains(array, value)) yield value;
                else blacklist[length2++] = value;
            }

            for (var index = 0; index < length; index++) {
                const item = array[index];

                if (!contains(blacklist, item)) yield item;
            }
        }
    )));
