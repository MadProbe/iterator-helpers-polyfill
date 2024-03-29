import { SameValueZero, undefined } from "tslib";
import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(undefined, "uniqueJustseen", assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"]) {
        var done: boolean | undefined, value: unknown, last: unknown;

        while ({ done, value } = await _next(), !done) {
            if (!SameValueZero(last, value)) {
                yield last = value;
            }
        }
    }
));
