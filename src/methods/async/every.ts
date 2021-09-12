import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "every", assertIterator(assert(isFunction, O => `${ O } is not a function`,
    async function (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], fn: (item: any) => _Awaitable<boolean>) {
        var done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(), !done) try {
            if (!await fn(value)) return closeAsyncIterator(this, false);
        } catch (error) {
            closeAsyncIterator(this);
            throw error;
        }
        return true;
    }
)));
