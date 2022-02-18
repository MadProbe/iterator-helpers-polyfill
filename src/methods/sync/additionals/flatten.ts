import from from "@sync/statics/from.js";
import { assertIterator, assertReplace, isPositiveInteger, mimic } from "@utils/utils.js";
import { apply, call } from "tslib";


export default mimic(0, "flatten", assertReplace((x = 1) => isPositiveInteger(x), assertIterator(
    function* recurse(this: Iterator<unknown, unknown, unknown>, _next: Iterator<unknown, unknown, unknown>["next"], depth: number): Generator<unknown, void, unknown> {
        var done: boolean | undefined, value: unknown, iterator: Iterator<unknown, unknown, unknown>, next: typeof _next;

        while ({ done, value } = _next(), !done) {
            if (depth > 0) {
                yield* call(recurse, iterator = from(value as Iterator), (next = iterator.next, ((...args: readonly unknown[]) => apply<typeof _next>(next, iterator, args))), depth - 1);
            } else yield value;
        }
    }
)));
