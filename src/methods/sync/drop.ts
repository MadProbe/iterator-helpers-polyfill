import { undefined } from "tslib";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


export default mimic(undefined, "drop", assertReplace(isPositiveInteger, assertIterator(
    function* (this: Generator<unknown>, _next: Generator<unknown>["next"], remaining: number) {
        while (remaining--) {
            if (_next().done) return;
        }
        while (1) {
            var lastValue: unknown, { done, value } = _next(lastValue);
            if (done) return;
            lastValue = yield value;
        }
    }
)));
