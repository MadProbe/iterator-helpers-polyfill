import { undefined } from "tslib";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


export default mimic(undefined, "drop", assertReplace(isPositiveInteger, assertIterator(
    async function* (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], remaining: number) {
        while (remaining--) {
            if ((await _next()).done) return;
        }
        for (var lastValue: unknown, done: boolean | undefined, value: unknown; { done, value } = await _next(lastValue), !done;) {
            lastValue = yield value;
        }
    }
)));
