import { assertReplaceStar, isNumber, mimic } from "@utils/utils.js";
import { RangeError, undefined, __throw } from "tslib";


export default mimic(1, "range", assertReplaceStar(args => {
    args[0] = isNumber(args[0]);
    args[1] = args[1] !== undefined ? isNumber(args[1]) : undefined;
    args[2] = args[2] !== undefined ? isNumber(args[2]) || __throw(RangeError("AsyncIterator.range(): step argument cannot be 0")) : undefined;
}, async function* range(/** start */ i: number, end: number = (_ => (i = 0, _))(i), step: number = 1, inclusive: boolean = false) {
    if (inclusive) {
        if (step > 0) {
            for (; i <= end; i += step) {
                yield i;
            }
        } else {
            for (i; i >= end; i += step) {
                yield i;
            }
        }
    } else {
        if (step > 0) {
            for (; i < end; i += step) {
                yield i;
            }
        } else {
            for (i; i > end; i += step) {
                yield i;
            }
        }
    }
}));
