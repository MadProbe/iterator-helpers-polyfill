import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


export default mimic(0, "cycle", assertReplace((x = 1 / 0) => isPositiveInteger(x), assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], times: number) {
        var results: unknown[] = [], length = 0, done: boolean | void, value: unknown, lastValue: unknown, index: number;

        while ({ done, value } = await _next(lastValue), !done) {
            lastValue = yield results[length++] = value;
        }

        while (times--) {
            for (index = 0; index < length;) yield results[index++];
        }

        return value;
    }
)));
