import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


export default mimic(0, "cycle", assertReplace((x = 1 / 0) => isPositiveInteger(x), assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], times: number) {
        var results: unknown[] = [], length = 0, done: boolean | void, value: unknown, index: number;

        while ({ done, value } = _next(), !done) {
            yield results[length++] = value;
        }

        while (times--) {
            for (index = 0; index < length;) yield results[index++];
        }

        return value;
    }
)));
