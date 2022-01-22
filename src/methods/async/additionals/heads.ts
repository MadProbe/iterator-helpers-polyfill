import { assertIterator, assertReplaceStar, mimic } from "@utils/utils.js";
import { type AnyFunction, bind, undefined, unshift } from "tslib";
import from from "@async/statics/from.js";


export default mimic(undefined, "heads", assertReplaceStar(args => {
    for (var i = 0, t: AsyncIterator<null>, l = args.length; i < l; i++) {
        args[i] = bind((t = from(args[i])).next as AnyFunction, t);
    }
}, assertIterator(
    async function* (this: AsyncIterator<unknown>, next: AsyncIterator<unknown, unknown, unknown>["next"], ...nexts: AsyncIterator<unknown, unknown, unknown>["next"][]) {
        var index, length = unshift(nexts, next), doneCount = 0, l: number, array: unknown[];

        while (doneCount < length) {
            for (index = 0, l = 0, array = []; index < length; index++) {
                if (index in nexts) {
                    var { done, value } = await nexts[index]!();

                    if (done && ++doneCount) { delete nexts[index]; continue; }
                    array[l++] = value;
                }
            }
            l && (yield array);
        }
    }
)));
