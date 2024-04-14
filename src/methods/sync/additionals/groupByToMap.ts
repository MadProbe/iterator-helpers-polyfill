import { undefined } from "tslib";
import { assert, assertIterator, closeIterator, isFunction, mimic, pushValue, SafeMap } from "@utils/utils.js";


export default mimic(undefined, "groupByToMap", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    function (this: Iterator<unknown>, _next: Iterator<unknown, unknown, unknown>["next"], fn: (item: unknown, index: number) => unknown) {
        var done: boolean | undefined, value: unknown, map: SafeMap<unknown, unknown[]> = new SafeMap, index = 0;

        while ({ done, value } = _next(), !done) try {
            pushValue(map.getSet(fn(value, index++), Array), value);
        } catch (error) {
            closeIterator(this);
            throw error;
        }

        return new Map(map);
    }
)));

