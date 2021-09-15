import { call, undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "filter", assertIterator(assert(isFunction, O => `${ O } is not a function`,
    async function* (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], fn: (item: any) => _Awaitable<boolean>) {
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
