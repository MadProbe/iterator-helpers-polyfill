import { assertIterator, closeAsyncIterator, mimic } from "@utils/utils.js";


// Decorators would be neat here
// TODO: safely substitute non-function parameter later
export default mimic(0, "asIndexedPairs", assertIterator(
    async function* (this: AsyncGenerator<unknown>, _next: AsyncGenerator<unknown>["next"]): AsyncGenerator<[number, unknown]> {
        var index = 0, lastValue: unknown, done: boolean | undefined, value: undefined;
        while ({ done, value } = await _next(lastValue), !done)
            lastValue = yield [index++, value];
    }
));
