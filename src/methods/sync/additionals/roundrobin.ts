import { assertIterator, assertReplaceStar, mimic } from "@utils/utils.js";
import { type AnyFunction, Array, bind, undefined, unshift } from "tslib";
import from from "@sync/statics/from.js";


export default mimic(undefined, "roundrobin", assertReplaceStar(args => {
    for (var i = 0, t: Iterator<null>, l = args.length; i < l; i++) {
        args[i] = bind((t = from(args[i])).next as AnyFunction, t);
    }
}, assertIterator(
    function* (this: Iterator<unknown>, next: Iterator<unknown, unknown, unknown>["next"], ...nexts: Iterator<unknown, unknown, unknown>["next"][]) {
        var index, length = unshift(nexts, next), doneCount = 0, lastValues: unknown[] = Array(length);

        while (doneCount < length) {
            for (index = 0; index < length; index++) {
                if (nexts[index]) {
                    const { done, value } = nexts[index]!(lastValues[index]);

                    if (done && ++doneCount) { delete nexts[index]; continue; }
                    lastValues[index] = yield value;
                }
            }
        }
    }
)));
