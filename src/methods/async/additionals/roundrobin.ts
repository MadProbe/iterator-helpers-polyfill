import { assertIterator, assertReplaceStar, mimic } from "@utils/utils.js";
import { AnyFunction, bind, undefined, unshift } from "tslib";
import from from "@async/from.js";


export default mimic(undefined, "roundrobin", assertReplaceStar(args => {
    for (var i = 0, t: AsyncIterator<null>, l = args.length; i < l; i++) {
        args[i] = bind((t = from(args[i])).next as AnyFunction, t);
    }
}, assertIterator(
    async function* (this: AsyncIterator<unknown>, next: AsyncIterator<unknown, unknown, unknown>["next"], ...nexts: Array<AsyncIterator<unknown, unknown, unknown>["next"] | null>) {
        var index, length = unshift(nexts, next), lastValue: unknown, doneCount = 0;

        while (doneCount < length) {
            for (index = 0; index < length; index++) {
                if (nexts[index]) {
                    const { done, value } = await nexts[index]!(lastValue);

                    if (done && ++doneCount) { nexts[index] = null; continue; }
                    lastValue = yield value;
                }
            }
        }
    }
)));
