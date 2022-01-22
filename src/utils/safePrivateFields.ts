import { type AnyFunction, apply, getPrototypeOf, setPrototypeOf, TypeError } from "tslib";
import { bound, concealSourceCode, SafeWeakMap } from "./utils.js";


interface FieldMetadata { readonly methods: readonly string[], readonly fields: readonly ClassField[]; }
type ConstructorPrototype = object;

export class ClassField<T = unknown> {
    private static readonly _map = new SafeWeakMap<ConstructorPrototype, FieldMetadata>();
    private readonly _map = new SafeWeakMap<object, T | undefined>();
    public constructor(private initializer: (this: object, ...args: readonly unknown[]) => T = x => x as never) { }
    public static init(...fields: readonly ClassField[]): new (...args: readonly unknown[]) => object {
        const { length } = fields;
        const { _map } = this;

        return class {
            public constructor() {
                for (var index = 0; index < length; index++) {
                    const field = fields[index];

                    field._map.set(this, apply(field.initializer, this, arguments));
                }
            }
            static {
                _map.set(this.prototype, { methods: [], fields });
            }
        };
    }
    @bound
    public static link(name: string, decorator: (...args: readonly unknown[]) => AnyFunction = concealSourceCode as never): <T extends new (...args: readonly unknown[]) => object>(Class: T) => T {
        return Class => {
            const prototype: Record<string, AnyFunction> = Class.prototype;
            const proto = getPrototypeOf(prototype);
            const { methods, fields } = this._map.get(proto)!;
            const length = methods.length;

            for (var index = 0; index < length; index++) {
                const method = methods[index];
                const errorString = `${ name }.prototype.${ method }: called on incompatible reciever `;
                const func: AnyFunction = prototype[method];

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
    public static check<T = unknown>(target: unknown, property: string, descriptor: TypedPropertyDescriptor<T>) {
        const methods = this._map.get(getPrototypeOf(target))!.methods as string[];

        methods[methods.length] = property;

        return descriptor;
    }
    public get<R extends T = T>(thisArg: object): R | undefined {
        return this._map.get(thisArg) as R;
    }
    public has(thisArg: object): boolean {
        return this._map.has(thisArg);
    }
    public set(thisArg: object, value: T): this {
        return this._map.set(thisArg, value), this;
    }
}
