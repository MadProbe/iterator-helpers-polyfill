import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "find", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown, index: number) => Promise<boolean>) {
        var value: unknown, done: boolean | undefined, index = 0;

        while ({ value, done } = await _next(), !done) try {
            if (await fn(value, index++)) return closeAsyncIterator(this, value);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
