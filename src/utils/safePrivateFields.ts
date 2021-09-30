import { AnyFunction, apply, getPrototypeOf, setPrototypeOf, TypeError } from "tslib";
import { bound, concealSourceCode, SafeWeakMap } from "./utils.js";

interface FieldMetadata { methods: string[], fields: ClassField[]; }
type ConstructorPrototype = object;

export class ClassField<T = unknown> {
    private static map = new SafeWeakMap<ConstructorPrototype, FieldMetadata>();
    private map = new SafeWeakMap<object, T | undefined>();
    constructor(private initializer?: (this: object, ...args: unknown[]) => T) { }
    static init(...fields: ClassField<unknown>[]): new (...args: unknown[]) => object {
        const { length } = fields;
        const self = this;
        return class {
            constructor() {
                for (var index = 0; index < length; index++) {
                    const field = fields[index];
                    field.map.set(this, field.initializer && apply(field.initializer, this, arguments));
                }
            }
            static {
                // @ts-ignore; false-positive ts(2454)
                self.map.set(this.prototype, { methods: [], fields });
            }
        };
    }
    @bound
    static link(name: string, decorator: AnyFunction = concealSourceCode): <T extends new (...args: unknown[]) => {}>(Class: T) => T {
        return Class => {
            const prototype = Class.prototype;
            const proto = getPrototypeOf(prototype);
            const { methods, fields } = this.map.get(proto)!;
            for (var index = 0, length = methods.length; index < length; index++) {
                const method = methods[index];
                const errorString = `${ name }.prototype.${ method }: called on incompatible reciever `;
                const func = prototype[method];
                prototype[method] = decorator(function (this: never) {
                    if (!fields[0].has(this)) throw TypeError(errorString + typeof this);
                    return apply(func, this, arguments);
                });
            }
            setPrototypeOf(prototype, getPrototypeOf(proto));
            return Class;
        };
    }
    @bound
    static check<T = unknown>(target: unknown, property: string, descriptor: TypedPropertyDescriptor<T>) {
        const methods = this.map.get(getPrototypeOf(target))!.methods;
        methods[methods.length] = property;
        return descriptor;
    }
    get<R extends T = T>(thisArg: object): R | undefined {
        return this.map.get(thisArg) as R;
    }
    has(thisArg: object): boolean {
        return this.map.has(thisArg);
    }
    set(thisArg: object, value: T): this {
        this.map.set(thisArg, value);
        return this;
    }
}