import { assertIsIterator, assertIterator, assertReplaceStar, mimic } from "@utils/utils.js";
import { Array, bind, undefined, unshift } from "tslib";


export default mimic(undefined, "zipLongest", assertReplaceStar(args => {
    for (var i = 0, l = args.length; i < l; i++) {
        args[i] = bind(assertIsIterator(args[i]), args[i]);
    }
}, assertIterator(
    function* (this: Iterator<unknown>, next: Iterator<unknown, unknown, unknown>["next"], ...nexts: Iterator<unknown, unknown, unknown>["next"][]) {
        var index, i = 0, length = unshift(nexts, next), array: unknown[], doneIndicators = Array<boolean>(length), broken: boolean;

        while ((array = Array(length))) {
            for (index = 0; index < length;) {
                const { done, value } = nexts[index]();

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
            yield array;
        }
    }
)));
