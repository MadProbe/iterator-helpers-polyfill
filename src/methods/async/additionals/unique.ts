import { undefined } from "tslib";
import { assertIterator, mimic, WeakenedSet } from "@utils/utils.js";


export default mimic(undefined, "unique", assertIterator(
    async function* (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"]) {
        var done: boolean | undefined, value: unknown, saved = new WeakenedSet;

        while ({ done, value } = await _next(), !done) {
            if (!saved.has(value)) {
                yield (saved.add(value), value);
            }
        }
    }
));
