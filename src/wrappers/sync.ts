import { IteratorPrototype, call, setPrototypeOf, undefined } from "tslib";
import { ClassField } from "@utils/safePrivateFields.js";
import { assertIsIterator } from "@utils/utils.js";


var next: ClassField<Iterator<unknown, unknown, unknown>["next"]>, iterator: ClassField<Iterator<unknown, unknown, unknown>>;

@ClassField.link("WrapForVaildIteratorPrototype")
export class WrapForVaildIteratorPrototype extends ClassField.init(next = new ClassField(assertIsIterator), iterator = new ClassField(x => x as never)) {
    public ["constructor"]?: WrapForVaildIteratorPrototype;
    @ClassField.check
    public next(value: unknown) {
        return 0 in arguments ? call(next.get(this)!, iterator.get(this), value) : call(next.get(this)!, iterator.get(this));
    }
    @ClassField.check
    public return(value: unknown) {
        const $return = iterator.get(this)!.return;

        return { value: $return !== undefined ? call($return, iterator.get(this)) : value, done: true };
    }
    @ClassField.check
    public throw(value: unknown) {
        const $throw = iterator.get(this)!.throw;

        if ($throw !== undefined) {
            call($throw, iterator.get(this), value);
        } else {
            throw value;
        }
    }
}

const { prototype } = WrapForVaildIteratorPrototype;

delete prototype.constructor;
setPrototypeOf(prototype, IteratorPrototype);
