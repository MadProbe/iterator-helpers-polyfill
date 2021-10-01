import { SameValueZero, undefined } from "tslib";
import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(undefined, "contains", assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], value2: unknown) {
        var done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(), !done)
            if (SameValueZero(value, value2)) return true;
        return false;
    }
));
