import { AsyncIteratorPrototype, call, setPrototypeOf, undefined } from "tslib";
import { ClassField } from "@utils/safePrivateFields.js";
import { assertIsAsyncIterator } from "@utils/utils.js";


var next: ClassField<AsyncIterator<unknown, unknown, unknown>["next"]>, iterator: ClassField<AsyncIterator<unknown, unknown, unknown>>;

@ClassField.link("WrapForVaildAsyncIteratorPrototype")
export class WrapForVaildAsyncIteratorPrototype extends ClassField.init(next = new ClassField(assertIsAsyncIterator), iterator = new ClassField) {
    public ["constructor"]?: WrapForVaildAsyncIteratorPrototype;
    @ClassField.check
    public async next() {
        return await call(next.get(this)!, iterator.get(this)!);
    }
    @ClassField.check
    public async return() {
        const $return = iterator.get(this)!.return;

        return $return !== undefined ? await call($return, iterator.get(this)!) : { value: undefined, done: true };
    }
}

const { prototype } = WrapForVaildAsyncIteratorPrototype;

delete prototype.constructor;
setPrototypeOf(prototype, AsyncIteratorPrototype);
