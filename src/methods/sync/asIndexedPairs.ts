import { assertIterator, mimic } from "@utils/utils.js";


// Decorators would be neat here
// TODO: safely substitute non-function parameter later
export default mimic(0, "asIndexedPairs", assertIterator(
    function* (this: Generator<unknown>, _next: Generator<unknown>["next"]): Generator<[number, unknown]> {
        var index = 0, lastValue: unknown, done: boolean | undefined, value: unknown;
        while ({ done, value } = _next(lastValue), !done) {
            lastValue = yield [index++, value];
        }
    }
));
