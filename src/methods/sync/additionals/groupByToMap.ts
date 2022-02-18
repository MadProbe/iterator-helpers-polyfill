import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic, SafeMap } from "@utils/utils.js";


export default mimic(undefined, "groupByToMap", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => Promise<unknown>) {
        var done: boolean | undefined, value: unknown, map: SafeMap<unknown, unknown[]> = new SafeMap;

        while ({ done, value } = await _next(), !done) try {
            const array: unknown[] = map.getSet(await fn(value), Array);

            array[array.length] = value;
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }

        return map;
    }
)));

