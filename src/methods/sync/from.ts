import { call, iterator, undefined } from "tslib";
import { mimic } from "@utils/utils.js";
import { Iterator } from "@utils/iterators.js";
import { WrapForVaildIteratorPrototype } from "@wrappers/sync.js";

export default mimic(1, "from", function (O: unknown) {
    var object = Object(O);
    var usingIterator = object[iterator];
    var iteratorRecord: Iterator<unknown>;
    if (usingIterator != undefined) {
        iteratorRecord = call(usingIterator, object);
        if (iteratorRecord instanceof Iterator) return iteratorRecord as Iterator<unknown>;
    } else iteratorRecord = object;
    return new WrapForVaildIteratorPrototype(iteratorRecord);
}) as IteratorConstructor["from"];
