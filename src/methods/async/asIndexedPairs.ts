import { assertIterator, mimic } from "@utils/utils.js";


// Decorators would be neat here
// TODO: safely substitute non-function parameter later
export default mimic(0, "asIndexedPairs", assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"]): AsyncGenerator<[number, unknown]> {
        var index = 0, lastValue: unknown, done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(lastValue), !done)
            lastValue = yield [index++, value];
    }
));
