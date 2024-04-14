import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "some", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown, index: number) => Promise<boolean>) {
        var done: boolean | undefined, value: unknown, index = 0;

        while ({ done, value } = await _next(), !done) try {
            if (await fn(value, index++)) return closeAsyncIterator(this, true);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }

        return false;
    }
)));
