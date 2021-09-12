import { undefined } from "tslib";
import { assertIterator, assertReplace, closeAsyncIterator, isPositiveInteger, mimic } from "@utils/utils.js";


export default mimic(undefined, "drop", assertReplace(isPositiveInteger, assertIterator(
    async function* (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], remaining: number) {
        while (remaining--) {
            if ((await _next()).done) return;
        }
        while (1) try {
            var lastValue: unknown, { done, value } = await _next(lastValue);;
            if (done) return;
            lastValue = yield value;
        } catch (error) {
            closeAsyncIterator(this);
            throw error;
        }
    }
)));
