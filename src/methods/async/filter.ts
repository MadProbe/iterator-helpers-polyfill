import { call, undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "filter", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => _Awaitable<boolean>) {
        for (var lastValue: unknown, done: boolean | undefined, value: unknown; { done, value } = await _next(lastValue), !done;) {
            try {
                if (await fn(value)) lastValue = yield value;
            } catch (error) {
                await closeAsyncIterator(this);
                throw error;
            }
        }
    }
)));
