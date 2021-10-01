import { AnyFunction, AsyncIteratorPrototype, call, setPrototypeOf, undefined } from "tslib";
import { ClassField } from "@utils/safePrivateFields.js";
import { assertIsIterator } from "@utils/utils.js";


var next: ClassField<AsyncIterator<unknown>["next"]>, iterator: ClassField<AsyncIterator<unknown>>;

@ClassField.link("WrapForVaildAsyncIteratorPrototype")
export class WrapForVaildAsyncIteratorPrototype extends ClassField.init(next = new ClassField(assertIsIterator as never), iterator = new ClassField(x => x as never)) {
    ["constructor"]?: WrapForVaildAsyncIteratorPrototype;
    @ClassField.check
    async next(value: unknown) {
        return await (0 in arguments ? call(next.get(this) as AnyFunction, iterator.get(this), value) : call(next.get(this) as AnyFunction, iterator.get(this)));
    }
    @ClassField.check
    async return(value: unknown) {
        const $return = iterator.get(this)!.return;
        return { value: $return !== undefined ? await call($return, iterator.get(this)) : value, done: true };
    }
    @ClassField.check
    async throw(value: unknown) {
        const $throw = iterator.get(this)!.throw;
        if ($throw !== undefined) {
            await call($throw, iterator.get(this), value);
        } else {
            throw value;
        }
    }
}
const { prototype } = WrapForVaildAsyncIteratorPrototype;
delete prototype.constructor;
setPrototypeOf(prototype, AsyncIteratorPrototype);
