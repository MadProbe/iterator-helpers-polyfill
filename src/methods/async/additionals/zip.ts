import { assertIsIterator, assertIterator, assertReplaceStar, mimic } from "@utils/utils.js";
import { type AnyFunction, Array, bind, undefined, unshift } from "tslib";


export default mimic(undefined, "zip", assertReplaceStar(args => {
    for (var i = 0, l = args.length; i < l; i++) {
        args[i] = bind(assertIsIterator(args[i]) as AnyFunction, args[i]);
    }
}, assertIterator(
    async function* (this: AsyncIterator<unknown>, next: AsyncIterator<unknown, unknown, unknown>["next"], ...nexts: readonly AsyncIterator<unknown, unknown, unknown>["next"][]) {
        var index, length = unshift(nexts, next), array: unknown[];

        while ((array = Array(length))) {
            for (index = 0; index < length; index++) {
                const { done, value } = await nexts[index]();

                if (done) return;
                array[index] = value;
            }
            yield array;
        }
    }
)));
