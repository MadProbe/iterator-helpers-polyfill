import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "takeWhile", assert(isFunction, O => O + " is not a function", assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => _Awaitable<boolean>) {
        var lastValue: unknown, done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(), !done) try {
            if (!await fn(value)) break;
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        };
        while ({ done, value } = await _next(lastValue), !done) lastValue = yield value;
    }
)));
