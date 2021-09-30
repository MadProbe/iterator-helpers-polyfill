import { assertIsIterator, assertIterator, assertReplaceStar, mimic } from "@utils/utils.js";
import { Array, bind, undefined, unshift } from "tslib";


export default mimic(undefined, "zipLongest", assertReplaceStar(args => {
    for (var i = 0, l = args.length; i < l; i++) {
        args[i] = bind(assertIsIterator(args[i]), args[i]);
    }
}, assertIterator(
    async function* (this: AsyncIterator<unknown>, next: AsyncIterator<unknown, unknown, unknown>["next"], ...nexts: AsyncIterator<unknown, unknown, unknown>["next"][]) {
        var index, i = 0, length = unshift(nexts, next), array: unknown[], doneIndicators = Array<boolean>(length), lastValue: unknown, broken: boolean;
        while ((array = Array(length))) {
            for (index = 0; index < length;) {
                const { done, value } = await nexts[index](lastValue);
                if (done) {
                    doneIndicators[index] = true;
                    for (i = 0, broken = false; i < length;) {
                        if (!doneIndicators[index++]) {
                            broken = true;
                            break;
                        }
                    }
                    if (broken) {
                        return;
                    }
                }
                array[index++] = value;
            }
            lastValue = yield array;
        }
    }
)));
