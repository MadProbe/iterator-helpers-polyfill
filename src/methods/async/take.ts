import { undefined } from "tslib";
import { assertIterator, assertReplace, closeAsyncIterator, isPositiveInteger, mimic } from "@utils/utils.js";


export default mimic(undefined, "take", assertReplace(isPositiveInteger, assertIterator(
    async function* (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], remaining: number) {
        while (remaining--) {
            var lastValue: unknown, { done, value } = await _next(lastValue);
            try {
                if (done) return;
                lastValue = yield value;
            } catch (error) {
                closeAsyncIterator(this);
                throw error;
            }
        }
    }
)));
