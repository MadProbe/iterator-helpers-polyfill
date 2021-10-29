import {
    AnyFunction, apply, bind, call, create, defineProperties, defineProperty, floor, get, getOwnPropertyDescriptor, getOwnPropertyDescriptors,
    getPrototypeOf, isExtensible, keys, preventExtensions, Proxy, Set, set, setPrototypeOf, Symbol, TypeError, undefined, WeakMap, WeakSet
} from "tslib";


const MimicedFunctionSymbol = Symbol();

// gaudy name btw
export const concealSourceCode = (func: AnyFunction, name = func.name, prototypeHolder = create(null)) => new Proxy(call, {
    apply(_, thisArg, args) {
        return apply(func, thisArg, args);
    },
    construct() {
        throw `${ name } is not a constructor!`;
    },
    defineProperty(_, property, attrs) {
        return defineProperty(property === "prototype" ? prototypeHolder : func, property, attrs);
    },
    deleteProperty(_, property) {
        return delete (property === "prototype" ? prototypeHolder : func)[property];
    },
    get(_, property, reciever) {
        return get(property === "prototype" ? prototypeHolder : func, property, reciever);
    },
    getPrototypeOf() {
        return getPrototypeOf(func);
    },
    getOwnPropertyDescriptor(_, property) {
        return getOwnPropertyDescriptor(property === "prototype" ? prototypeHolder : func, property);
    },
    has(_, property) {
        return property in (property === "prototype" ? prototypeHolder : func);
    },
    isExtensible() {
        return isExtensible(func);
    },
    ownKeys() {
        return [...keys(func), ...keys(prototypeHolder)];
    },
    preventExtensions() {
        return preventExtensions(prototypeHolder) && preventExtensions(func);
    },
    set(_, property, value, reciever) {
        return set(property === "prototype" ? prototypeHolder : func, property, value, reciever);
    },
    setPrototypeOf(_, proto) {
        return setPrototypeOf(func, proto);
    },
});

export const closeIterator = (iterator: Iterator<unknown>, completion?: unknown, { return: $return } = iterator) => {
    if ($return !== undefined) call($return as AnyFunction, iterator);

    return completion;
};

export const closeAsyncIterator = async (iterator: AsyncIterator<unknown>, completion?: unknown, { return: $return } = iterator) => {
    if ($return !== undefined) await call($return as AnyFunction, iterator);

    return completion;
};

export const assertIsIterator = (O: unknown) => {
    var next: Iterator["next"] | AsyncIterator<unknown>["next"];

    if (!O || !isFunction(next = (O as Iterator).next)) {
        throw TypeError("Iterator method is called on incompatible reciever " + O);
    }

    return next;
};

export const assertIsAsyncIterator = assertIsIterator as never as (O: unknown) => AsyncIterator<unknown>["next"];

export const assertIterator = (func: AnyFunction) => {
    function $function(this: unknown) {
        const next = assertIsIterator(this);

        return call(func, this, (...args: unknown[]) => apply(next, this, args), ...arguments);
    }
    $function[MimicedFunctionSymbol] = func[MimicedFunctionSymbol] || func;

    return $function;
};

export const assert = (asserter: AnyFunction, message: (argument: unknown) => string, func: AnyFunction) => {
    function $function(this: unknown, _: unknown) {
        if (!asserter(_)) {
            throw TypeError(message(_));
        }

        return apply(func, this, arguments);
    }
    $function[MimicedFunctionSymbol] = func[MimicedFunctionSymbol] || func;

    return $function;
};

export const assertReplace = (asserter: (argument: unknown) => unknown, func: AnyFunction) => {
    function $function(this: unknown, $: unknown) {
        arguments.length ||= 1;
        arguments[0] = asserter($);

        return apply(func, this, arguments);
    }
    $function[MimicedFunctionSymbol] = func[MimicedFunctionSymbol] || func;

    return $function;
};

export const assertReplaceStar = (asserter: (argument: IArguments) => void, func: AnyFunction) => {
    function $function(this: unknown) {
        asserter(arguments);

        return apply(func, this, arguments);
    }
    $function[MimicedFunctionSymbol] = func[MimicedFunctionSymbol] || func;

    return $function;
};

const savePrototype = ({ prototype }: { readonly prototype: object }, constructor: { readonly prototype: object; }) => {
    defineProperties(prototype, getOwnPropertyDescriptors(constructor.prototype));
};

export class SafeWeakMap<K extends object, V> extends WeakMap<K, V> { }

export class SafeWeakSet<V extends object> extends WeakSet<V> { }

export class SafeSet<V> extends Set<V> { }

savePrototype(SafeWeakMap, WeakMap);
savePrototype(SafeWeakSet, WeakSet);
savePrototype(SafeSet, Set);

const isObject = (x: unknown): x is object => typeof x === "function" || typeof x === "object";

export class WeakenedSet {
    private readonly _weakSet = new SafeWeakSet;
    private readonly _set = new SafeSet;
    public has(item: unknown) {
        return isObject(item) ? this._weakSet.has(item) : this._set.has(item);
    }
    public add(item: unknown) {
        return isObject(item) ? this._weakSet.add(item) : this._set.add(item), this;
    }
    public delete(item: unknown) {
        return isObject(item) ? this._weakSet.delete(item) : this._set.delete(item);
    }
}

export const bound = <T extends AnyFunction>(target: unknown, property: string, descriptor: TypedPropertyDescriptor<T>) =>
    (descriptor.value = bind(descriptor.value! as AnyFunction, target) as never, descriptor);

export const isFunction = (value: unknown): value is AnyFunction => typeof value === "function";

export const isPositiveInteger = (argument: unknown) => {
    const number = +(argument as never);

    if (number !== number || number === 0) {
        return 0;
    }
    if (number === 1 / 0 || number === -1 / 0) {
        return number;
    }
    const integer = floor(number);

    if (integer < 0) {
        throw TypeError("Negative integers are not supported by this function");
    }
    if (integer === 0) {
        return 0;
    }

    return integer;
};

export const mimic = (argsLength: number | undefined, name: string, $function: AnyFunction) => {
    const { length } = $function[MimicedFunctionSymbol] || $function;

    // default is original function arguments length - 1 since
    // it will be very common to have next parameter as first parameter
    // while still having opportunity to change it manually
    defineProperties($function, { length: { value: argsLength ?? length - 1, configurable: true }, name: { value: name, configurable: true } });
    delete $function[MimicedFunctionSymbol];

    return concealSourceCode($function);
};
