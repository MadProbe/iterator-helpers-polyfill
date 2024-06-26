import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic, pushValue, toPropertyKey } from "@utils/utils.js";



export default mimic(undefined, "groupBy", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown, index: number) => unknown) {
        var done: boolean | undefined, value: unknown, map: Record<PropertyKey, unknown[]> = {}, index = 0;

        while ({ done, value } = _next(), !done) try {
            pushValue(map[toPropertyKey(fn(value, index++))] ??= [] as unknown[], value);
        } catch (error) {
            closeIterator(this);
            throw error;
        }

        return map;
    }
)));

