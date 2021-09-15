import { undefined } from "tslib";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


export default mimic(undefined, "take", assertReplace(isPositiveInteger, assertIterator(
    async function* (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], remaining: number) {
        while (remaining--) {
            var lastValue: unknown, { done, value } = await _next(lastValue);
            if (done) return;
            lastValue = yield value;
        }
    }
)));
