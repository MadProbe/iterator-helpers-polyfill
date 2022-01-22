import { undefined } from "tslib";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";


export default mimic(undefined, "chunked", assertReplace(x => isPositiveInteger(x), assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], size: number) {
        var results: unknown[], length: number, done: boolean | void, value: unknown;

        loop1: {
            while (length = 0, results = []) {
                while (length < size && ({ done, value } = _next())) {
                    if (done) break loop1;
                    results[length++] = value
                }
                yield results;
            }
        }
        length && (yield results);
    }
)));
