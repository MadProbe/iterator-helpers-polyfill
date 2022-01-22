import { SameValueZero, undefined } from "tslib";
import { assertIterator, mimic } from "@utils/utils.js";


export default mimic(undefined, "contains", assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], value2: unknown) {
        var done: boolean | undefined, value: unknown;

        while ({ done, value } = _next(), !done)
            if (SameValueZero(value, value2)) return true;

        return false;
    }
));
