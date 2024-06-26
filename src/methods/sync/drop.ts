import { undefined } from "tslib";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


export default mimic(undefined, "drop", assertReplace(isPositiveInteger, assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], remaining: number) {
        while (remaining--) {
            if (_next().done) return;
        }

        while (1) {
            var { done, value } = _next();

            if (done) return;
            yield value;
        }
    }
)));
