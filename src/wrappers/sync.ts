import { AnyFunction, IteratorPrototype, call, setPrototypeOf, undefined } from "tslib";
import { ClassField } from "@utils/safePrivateFields.js";
import { assertIsIterator } from "@utils/utils.js";

var next: ClassField<Iterator<unknown>["next"]>, iterator: ClassField<Iterator<unknown>>;

@ClassField.link("WrapForVaildIteratorPrototype")
export class WrapForVaildIteratorPrototype extends ClassField.init(next = new ClassField(assertIsIterator as never), iterator = new ClassField(x => x as never)) {
    ["constructor"]?: WrapForVaildIteratorPrototype;
    @ClassField.check
    next(value: any) {
        return 0 in arguments ? call(next.get(this) as AnyFunction, iterator.get(this), value) : call(next.get(this) as AnyFunction, iterator.get(this));
    }
    @ClassField.check
    return(value: any) {
        const $return = iterator.get(this).return;
        return { value: $return !== undefined ? call($return, iterator.get(this)) : value, done: true };
    }
    @ClassField.check
    throw(value: any) {
        const $throw = iterator.get(this).throw;
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
