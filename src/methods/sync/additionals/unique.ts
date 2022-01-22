import { undefined } from "tslib";
import { assertIterator, mimic, WeakenedSet } from "@utils/utils.js";


export default mimic(undefined, "unique", assertIterator(
    function* (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"]) {
        var done: boolean | undefined, value: unknown, saved = new WeakenedSet;

        while ({ done, value } = _next(), !done) {
            if (!saved.has(value)) {
                yield (saved.add(value), value);
            }
        }
    }
));
