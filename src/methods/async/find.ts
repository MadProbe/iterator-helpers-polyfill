import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "find", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], fn: (item: any) => _Awaitable<boolean>) {
        var value: any, done: boolean | undefined;
        while ({ value, done } = await _next(), !done) try {
            if (await fn(value)) return closeAsyncIterator(this, value);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
