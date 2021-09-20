import {
    AnyFunction, apply, bind, call, create, defineProperties, defineProperty, floor, get, getOwnPropertyDescriptor,
    getPrototypeOf, isExtensible, iterator, keys, preventExtensions, set, setPrototypeOf, TypeError, undefined
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
export class SafeWeakMap<K extends object, V> extends WeakMap<K, V> {
    static {
        const { prototype } = WeakMap;
        for (const key of ["get", "has", "set", "delete"]) {
            // @ts-ignore
            this.prototype[key] = prototype[key];
        }
    }
}
export const bound = <T extends AnyFunction>(target: Object, property: string, descriptor: TypedPropertyDescriptor<T>) =>
    (descriptor.value = bind(descriptor.value! as any, target), descriptor);
export const isFunction = (value: unknown): value is AnyFunction => typeof value === "function";
export const isPositiveInteger = (argument: unknown) => {
    var number = +(argument as never);
    if (number !== number || number === 0) {
        return 0;
    }
    if (number === 1 / 0 || number === -1 / 0) {
        return number;
    }
    var integer = floor(number);
    if (integer < 0) {
        throw TypeError("Negative integers are not supported by this function");
    }
    if (integer === 0) {
        return 0;
    }
    return integer;
};
export const mimic = (argsLength: number | undefined, name: string, $function: AnyFunction) => {
    // @ts-ignore
    const { length } = $function[MimicedFunctionSymbol] || $function;
    // default is original function arguments length - 1 since
    // it will be very common to have next parameter as first parameter
    // while still having opportunity to change it manually
    argsLength ??= length - 1;
    defineProperties($function, { length: { value: argsLength, configurable: true }, name: { value: name, configurable: true } });
    // @ts-ignore
    delete $function[MimicedFunctionSymbol];
    return concealSourceCode($function);
};
