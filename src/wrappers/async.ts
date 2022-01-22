import { AsyncIteratorPrototype, call, setPrototypeOf, undefined } from "tslib";
import { ClassField } from "@utils/safePrivateFields.js";
import { assertIsAsyncIterator } from "@utils/utils.js";


var next: ClassField<AsyncIterator<unknown, unknown, unknown>["next"]>, iterator: ClassField<AsyncIterator<unknown, unknown, unknown>>;

@ClassField.link("WrapForVaildAsyncIteratorPrototype")
export class WrapForVaildAsyncIteratorPrototype extends ClassField.init(next = new ClassField(assertIsAsyncIterator), iterator = new ClassField) {
    public ["constructor"]?: WrapForVaildAsyncIteratorPrototype;
    @ClassField.check
    public async next(value: unknown) {
        return await (0 in arguments ? call(next.get(this)!, iterator.get(this)!, value) : call(next.get(this)!, iterator.get(this)!));
    }
    @ClassField.check
    public async return(value: unknown) {
        const $return = iterator.get(this)!.return;

        return { value: $return !== undefined ? await call($return, iterator.get(this)!) : value, done: true };
    }
    @ClassField.check
    public async throw(value: unknown) {
        const $throw = iterator.get(this)!.throw;

        if ($throw !== undefined) {
            await call($throw, iterator.get(this)!, value);
        } else {
            throw value;
        }
    }
}

const { prototype } = WrapForVaildAsyncIteratorPrototype;

delete prototype.constructor;
setPrototypeOf(prototype, AsyncIteratorPrototype);
