import { call, create, toPrimitive, undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


const throwerObject = (x: unknown): never => (({} as Record<PropertyKey, never>)[{ [toPrimitive]: () => x } as never]);
const safeCall = (object: Record<never, unknown>, name: string) => {
    const method = object[name];

    if (typeof method === "function") {
        return call(method, object);
    }

    return object;
}
const isObject = (property: unknown): property is Record<never, unknown> => typeof property === "object" && property !== null;

export default mimic(undefined, "groupBy", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => Promise<unknown>) {
        var done: boolean | undefined, value: unknown, map: Record<never, unknown[]> = {};

        while ({ done, value } = await _next(), !done) try {
            var property = await fn(value);

            if (isObject(property)) { // is it right to do here null check or not?
                const method = property[toPrimitive];

                if (method !== undefined) {
                    property = call(method, property, "string") as never;
                    if (typeof property === "object" && property !== null) throwerObject(property);
                } else {
                    property = safeCall(property as never, "toString") as never;
                    if (isObject(property)) {
                        property = safeCall(property as never, "valueOf") as never;
                        if (isObject(property)) {
                            throw create(null)[create(null)]; // todo: better error.
                        }
                    }
                }
            }
            const array: unknown[] = map[property as never] ??= [] as never;

            array[array.length] = value;
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }

        return map;
    }
)));

