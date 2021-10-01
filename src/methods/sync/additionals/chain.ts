import { iterator, undefined } from "tslib";
import { assertIterator, assertReplaceStar, mimic } from "@utils/utils.js";
import from from "@sync/from.js";


export default mimic(undefined, "chain", assertReplaceStar(args => {
    for (var i = 0, l = args.length; i < l; i++) {
        args[i] = from(args[i]);
    }
}, assertIterator(
    function* (this: Iterator<unknown>, next: Iterator<unknown, unknown, unknown>["next"], ...iterators: IterableIterator<unknown>[]) {
        yield* { [iterator]: () => ({ next }) };
        for (var i = 0, l = iterators.length; i < l;) {
            yield* iterators[i++];
        }
    }
)));
