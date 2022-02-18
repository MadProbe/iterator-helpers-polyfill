import { asyncIterator, undefined } from "tslib";
import { assertIterator, assertReplaceStar, mimic } from "@utils/utils.js";
import from from "@async/statics/from.js";


export default mimic(undefined, "chain", assertReplaceStar(args => {
    for (var i = 0, l = args.length; i < l; i++) {
        args[i] = from(args[i]);
    }
}, assertIterator(
    async function* (this: AsyncIterator<unknown>, next: AsyncIterator<unknown, unknown, unknown>["next"], ...iterators: readonly AsyncIterator<unknown>[]) {
        yield* { [asyncIterator]: () => ({ next }) };
        for (var i = 0, l = iterators.length; i < l;) {
            const iterator = iterators[i++];

            if (iterator !== undefined || iterator !== null) yield* iterator;
        }
    }
)));
