import {
    __throw,
    AnyFunction, apply, bind, call, create, defineProperties, defineProperty, emptyObject, floor, get, getOwnPropertyDescriptor, getOwnPropertyDescriptors,
    getPrototypeOf, isExtensible, keys, preventExtensions, Proxy, Set, set, setPrototypeOf, shift, Symbol, toPrimitive, TypeError, undefined, WeakMap, WeakSet
} from "tslib";


const MimicedFunctionSymbol: unique symbol = Symbol() as never;

// gaudy name btw
export const concealSourceCode = <T extends AnyFunction = AnyFunction>(func: T, name = func.name, prototypeHolder = create(null)): T => new Proxy(call, {
    apply(_, thisArg, args): unknown {
        return apply(func, thisArg, args);
    },
    construct(): never {
        throw `${ name } is not a constructor!`;
    },
    defineProperty(_, property, attrs): boolean {
        return defineProperty(property === "prototype" ? prototypeHolder : func, property, attrs);
    },
    deleteProperty(_, property): boolean {
        return delete (property === "prototype" ? prototypeHolder : func)[property];
    },
    get(_, property, reciever): unknown {
        return get(property === "prototype" ? prototypeHolder : func, property, reciever);
    },
    getPrototypeOf(): object {
        return getPrototypeOf(func);
    },
    getOwnPropertyDescriptor(_, property): PropertyDescriptor | undefined {
        return getOwnPropertyDescriptor(property === "prototype" ? prototypeHolder : func, property);
    },
    has(_, property): boolean {
        return property in (property === "prototype" ? prototypeHolder : func);
    },
    isExtensible(): boolean {
        return isExtensible(func);
    },
    ownKeys(): string[] {
        return [...keys(func), ...keys(prototypeHolder)];
    },
    preventExtensions(): boolean {
        return preventExtensions(prototypeHolder) && preventExtensions(func);
    },
    set(_, property, value, reciever): boolean {
        return set(property === "prototype" ? prototypeHolder : func, property, value, reciever);
    },
    setPrototypeOf(_, proto): boolean {
        return setPrototypeOf(func, proto);
    },
}) as T;

export const closeIterator = <T>(iterator: Iterator<unknown>, completion?: T, { return: $return } = iterator): T | undefined => {
    if ($return !== undefined) call($return as AnyFunction, iterator);

    return completion;
};

export const closeAsyncIterator = async <T>(iterator: AsyncIterator<T>, completion?: T, { return: $return } = iterator): Promise<T | undefined> => {
    if ($return !== undefined) await call($return as AnyFunction, iterator);

    return completion;
};

export const assertIsIterator = (O: unknown): Iterator<unknown>["next"] => {
    var next: Iterator<unknown>["next"] | AsyncIterator<unknown>["next"];

    if (!O || !isFunction(next = (O as Iterator<unknown>).next)) {
        throw TypeError("Iterator method is called on incompatible reciever " + O);
    }

    return next;
};

export const assertIsAsyncIterator: (O: unknown) => AsyncIterator<unknown>["next"] = assertIsIterator as never;

export const assertIterator = <T extends AnyFunction>(func: T): T => {
    function $function(this: ThisParameterType<T>) {
        const next = assertIsIterator(this);

        return call(func, this, (...args: readonly unknown[]) => apply(next, this, args), ...arguments);
    }
    $function[MimicedFunctionSymbol as never] = (func[MimicedFunctionSymbol as never] || func) as never;

    return $function as T;
};

export const assert = (asserter: AnyFunction, message: (argument: unknown) => string, func: AnyFunction): AnyFunction => {
    function $function(this: unknown, _: unknown) {
        if (!asserter(_)) {
            throw TypeError(message(_));
        }

        return apply(func, this, arguments);
    }
    $function[MimicedFunctionSymbol as never] = (func[MimicedFunctionSymbol as never] || func) as never;

    return $function;
};

export const assertReplace = (asserter: (argument: unknown) => unknown, func: AnyFunction): AnyFunction => {
    function $function(this: unknown, $: unknown) {
        arguments.length ||= 1;
        arguments[0] = asserter($);

        return apply(func, this, arguments);
    }
    $function[MimicedFunctionSymbol as never] = (func[MimicedFunctionSymbol as never] || func) as never;

    return $function;
};

export const assertReplaceStar = (asserter: (argument: IArguments) => void, func: AnyFunction): AnyFunction => {
    function $function(this: unknown) {
        asserter(arguments);

        return apply(func, this, arguments);
    }
    $function[MimicedFunctionSymbol as never] = (func[MimicedFunctionSymbol as never] || func) as never;

    return $function;
};

const savePrototype = ({ prototype }: { readonly prototype: object; }, constructor: { readonly prototype: object; }) => {
    defineProperties(prototype, getOwnPropertyDescriptors(constructor.prototype));
};

export class SafeWeakMap<K extends object, V> extends WeakMap<K, V> { }

export class SafeWeakSet<V extends object> extends WeakSet<V> { }

export class SafeMap<K, V> extends Map<K, V> {
    public getSet(key: K, value: () => V): V {
        if (this.has(key)) return this.get(key) as V;
        const result = value();

        this.set(key, result);

        return result;
    }
}

export class SafeSet<V> extends Set<V> { }

savePrototype(SafeWeakMap, WeakMap);
savePrototype(SafeWeakSet, WeakSet);
savePrototype(SafeSet, Set);
savePrototype(SafeMap, Map);

const isObject = (x: unknown): x is Record<PropertyKey, unknown> => typeof x === "function" || typeof x === "object" && x !== null;

export class WeakenedSet<T> {
    private readonly _weakSet = new SafeWeakSet<T extends object ? T : never>();
    private readonly _set = new SafeSet<T>();
    public has(item: T): boolean {
        return isObject(item) ? this._weakSet.has(item as never) : this._set.has(item);
    }
    public add(item: T): this {
        return isObject(item) ? this._weakSet.add(item as never) : this._set.add(item), this;
    }
    public delete(item: T): boolean {
        return isObject(item) ? this._weakSet.delete(item as never) : this._set.delete(item);
    }
}

export const bound = <T extends AnyFunction>(target: unknown, property: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> =>
    (descriptor.value = bind(descriptor.value! as AnyFunction, target) as never, descriptor);

export const isFunction = (value: unknown): value is AnyFunction => typeof value === "function";

export const isPositiveInteger = (argument: unknown): number => {
    const number = isNumber(argument as never);

    if (number < 0) {
        __throw(TypeError("Negative integers are not supported by this function"));
    }

    return floor(number);
};

// There's no need to be so explicit and do one-by-one operation as in spec as they are already packed in + and || operators
export const isNumber = (argument: unknown): number => +(argument as never) || 0;

export const uncurryThis = (func: AnyFunction): AnyFunction =>
    mimic(func.length + 1, func.name, (...args: readonly unknown[]) => apply(func, shift(args), args));

export const mimic = (argsLength: number | undefined, name: string, $function: AnyFunction): AnyFunction => {
    const { length } = $function[MimicedFunctionSymbol as never] || $function;

    // default is original function arguments length - 1 since
    // it will be very common to have next parameter as first parameter
    // while still having opportunity to change it manually
    defineProperties($function, { length: { value: argsLength ?? length - 1, configurable: true }, name: { value: name, configurable: true } });
    delete $function[MimicedFunctionSymbol as never];

    return concealSourceCode($function);
};


export const safeObjectMethodCall = (object: Record<never, unknown>, name: string) => {
    const method = object[name as never];

    if (typeof method === "function") {
        return call(method, object as never);
    }

    return object;
};

export { isObject as isNonNullObject }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const self_referencing_object: typeof emptyObject = { toString: (_: unknown) => self_referencing_object, valueOf: (_: unknown) => self_referencing_object };

export const toPropertyKey = (property: unknown): PropertyKey => {
    if (isObject(property)) { // is it right to do here null check or not?
        const method = property[toPrimitive];

        if (method !== undefined) {
            property = call(method as never, property as never, "string") as never;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            if (isObject(property)) emptyObject[{ [toPrimitive]: (_: unknown) => property } as never];
        } else {
            property = safeObjectMethodCall(property as never, "toString") as never;
            if (isObject(property)) {
                property = safeObjectMethodCall(property as never, "valueOf") as never;
                if (isObject(property)) {
                    emptyObject[self_referencing_object as never];
                }
            }
        }
    }

    return property as never;
};

export const pushValue = <T>(array: readonly T[], value: T): T => (array as T[])[array.length] = value;
