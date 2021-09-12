import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "forEach", assertIterator(assert(isFunction, O => `${ O } is not a function`,
    async function (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], fn: (item: any) => _Awaitable<unknown>) {
        var done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(), !done) try {
            await fn(value);
        } catch (error) {
            closeAsyncIterator(this);
            throw error;
        }
    }
)));
