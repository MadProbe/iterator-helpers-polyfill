import { asyncIterator, call, iterator, undefined } from "tslib";
import { mimic } from "@utils/utils.js";
import { AsyncIterator } from "@utils/iterators.js";
import { WrapForVaildAsyncIteratorPrototype } from "@wrappers/async.js";


export default mimic(1, "from", function (O: unknown) {
    var object = Object(O);
    var usingAsyncIterator = object[asyncIterator];
    var usingIterator = usingAsyncIterator != undefined ? usingAsyncIterator : object[iterator];
    var asyncIteratorRecord: AsyncIterator<unknown>;

    if (usingIterator != undefined) {
        asyncIteratorRecord = call(usingIterator, object);
        if (asyncIteratorRecord instanceof AsyncIterator) return asyncIteratorRecord as AsyncIterator<unknown>;
    } else asyncIteratorRecord = object;

    return new WrapForVaildAsyncIteratorPrototype(asyncIteratorRecord);
}) as AsyncIteratorConstructor["from"];
