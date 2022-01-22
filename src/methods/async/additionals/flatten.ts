import from from "@async/statics/from.js";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";
import { apply, call } from "tslib";


export default mimic(0, "flatten", assertReplace((x = 1) => isPositiveInteger(x), assertIterator(
    async function* recurse(this: AsyncIterator<unknown, unknown, unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], times: number): AsyncGenerator<unknown, void, unknown> {
        var done: boolean | undefined, value: unknown, iterator: AsyncIterator<unknown, unknown, unknown>, next: typeof _next;

        while ({ done, value } = await _next(), !done) {
            if (times > 0) {
                yield* call(recurse, iterator = from(value as AsyncIterator), (next = iterator.next, ((...args: readonly unknown[]) => apply<typeof _next>(next, iterator, args))), times - 1);
            } else yield value;
        }
    }
)));
