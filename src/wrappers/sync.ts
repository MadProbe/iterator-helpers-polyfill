import { IteratorPrototype, call, setPrototypeOf, undefined } from "tslib";
import { ClassField } from "@utils/safePrivateFields.js";
import { assertIsIterator } from "@utils/utils.js";


var next: ClassField<Iterator<unknown, unknown, unknown>["next"]>, iterator: ClassField<Iterator<unknown, unknown, unknown>>;

@ClassField.link("WrapForVaildIteratorPrototype")
export class WrapForVaildIteratorPrototype extends ClassField.init(next = new ClassField(assertIsIterator), iterator = new ClassField(x => x as never)) {
    public ["constructor"]?: WrapForVaildIteratorPrototype;
    @ClassField.check
    public next() {
        return call(next.get(this)!, iterator.get(this));
    }
    @ClassField.check
    public return() {
        const $return = iterator.get(this)!.return;

        return $return !== undefined ? call($return, iterator.get(this)) : { value: undefined, done: true };
    }
}

const { prototype } = WrapForVaildIteratorPrototype;

delete prototype.constructor;
setPrototypeOf(prototype, IteratorPrototype);
