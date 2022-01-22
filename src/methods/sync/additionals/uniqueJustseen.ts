import { SameValueZero, undefined } from "tslib";
import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(undefined, "uniqueJustseen", assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"]) {
        var done: boolean | undefined, value: unknown, last: unknown;

        while ({ done, value } = _next(), !done) {
            if (!SameValueZero(last, value)) {
                yield last = value;
            }
        }
    }
));
