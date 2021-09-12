import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";
import from from "./from.js";


export default mimic(undefined, "flatMap", assertIterator(assert(isFunction, O => `${ O } is not a function`,
    async function* (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"], fn: (item: any) => _Awaitable<AsyncIterator<unknown>>) {
        var done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(), !done) try {
            // Issue #114 flatMap should act like it does a `yield *` on each iterable
            // https://github.com/tc39/proposal-iterator-helpers/issues/114
            yield* from(await fn(value));
        } catch (error) {
            closeAsyncIterator(this);
            throw error;
        }
    }
)));
