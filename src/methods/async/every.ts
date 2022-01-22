import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "every", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => Promise<boolean>) {
        var done: boolean | undefined, value: unknown;

        while ({ done, value } = await _next(), !done) try {
            if (!await fn(value)) return closeAsyncIterator(this, false);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }

        return true;
    }
)));
