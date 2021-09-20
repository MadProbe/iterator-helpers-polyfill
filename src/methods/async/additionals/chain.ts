import { asyncIterator, undefined } from "tslib";
import { assertIterator, assertReplaceStar, mimic } from "@utils/utils.js";
import from from "@async/from.js";


export default mimic(undefined, "chain", assertReplaceStar(args => {
    for (var i = 0, l = args.length; i < l; i++) {
        args[i] = from(args[i]);
    }
}, assertIterator(
    async function* (this: AsyncIterator<unknown>, next: AsyncIterator<unknown, unknown, unknown>["next"], ...iterators: AsyncIterator<unknown>[]) {
        yield* { [asyncIterator]: () => ({ next }) };
        for (var i = 0, l = iterators.length; i < l;) {
            yield* iterators[i++];
        }
    }
)));
