import { undefined } from "tslib";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


export default mimic(undefined, "take", assertReplace(isPositiveInteger, assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], remaining: number) {
        while (remaining--) {
            var { done, value } = _next();

            if (done) return;
            yield value;
        }
    }
)));
