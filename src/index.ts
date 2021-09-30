import { $globalThis, defineProperty, IteratorPrototype, AsyncIteratorPrototype, hasOwnProperty, AnyFunction, freeze, keys, toStringTag, getOwnPropertyDescriptor } from "tslib";
import { Iterator, AsyncIterator } from "@utils/iterators.js";
import * as async_methods from "@async/all.js";
import * as sync_methods from "@sync/all.js";
import * as additionals_async from "@async/additionals/all.js";
import * as additionals_sync from "@sync/additionals/all.js";
import async_from from "@async/from.js";
import from from "@sync/from.js";


type Prototype = Record<string, AnyFunction>;


function defineMethods(prototype: object, methods: Prototype) {
    for (const key in methods) {
        if (hasOwnProperty(methods, key)) {
            const value = methods[key];
            defineProperty(prototype, key, { value, configurable: true, writable: true });
        }
    }
}

function deleteMethods(prototype: object, methods: string[]) {
    for (let i = 0, l = methods.length; i < l; i++) {
        delete prototype[methods[i]];
    }
}

function initPrototype(constructor: unknown, prototype: object, methods: Prototype) {
    defineMethods(prototype, methods);
    defineProperty(constructor, "prototype", { value: prototype });
}

const initialIteratorPrototype = freeze({ ...freeze(sync_methods), ...freeze(additionals_sync) });
const initialAsyncIteratorPrototype = freeze({ ...freeze(async_methods), ...freeze(additionals_async) });


initPrototype(Iterator, IteratorPrototype, initialIteratorPrototype);


initPrototype(AsyncIterator, AsyncIteratorPrototype, initialAsyncIteratorPrototype);

AsyncIterator.from = async_from;
Iterator.from = from;

$globalThis["Iterator"] = Iterator;
$globalThis["AsyncIterator"] = AsyncIterator;

const configOption = (additionalOptions: Record<string, (state: boolean) => void> = {}): MethodDecorator =>
((target, property, descriptor) => {
    const setState = descriptor.value as never as (state: boolean) => void, o = {};
    for (let $keys = keys(additionalOptions), i = 0, l = $keys.length; i < l; i++) {
        const key = $keys[i];
        defineProperty(o, key, configOption()({}, "", getOwnPropertyDescriptor(additionalOptions, key)!)!);
    }
    freeze(o);
    delete descriptor.value;
    delete descriptor.writable;
    descriptor.get = (() => o) as never;
    descriptor.set = ((x: boolean) => {
        setState!(x);
    }) as never;
    return descriptor;
});

const _ = (method: string, state: boolean, prototype: object, initialPrototype: Prototype) => {
    if (state) {
        defineMethods(prototype, { [method]: initialPrototype[method] });
    } else {
        deleteMethods(prototype, [method]);
    }
};
const defaultStateChange = (method: string) => (state: boolean) => {
    _(method, state, IteratorPrototype, initialIteratorPrototype);
    _(method, state, AsyncIteratorPrototype, initialAsyncIteratorPrototype);
};

const makeAdditionalsFrom = (keys: string[]) => {
    const entries = {};
    for (var i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        entries[key] = defaultStateChange(key);
    }
    return entries;
};

class Config {
    @configOption(makeAdditionalsFrom(keys(additionals_sync)))
    additionals(state: boolean) {
        if (state) {
            defineMethods(AsyncIteratorPrototype, additionals_async);
            defineMethods(IteratorPrototype, additionals_sync);
        } else {
            const k = keys(additionals_async);
            deleteMethods(AsyncIteratorPrototype, k);
            deleteMethods(IteratorPrototype, k);
        }
    }
    @configOption(makeAdditionalsFrom(keys(sync_methods)))
    polyfilled(state: boolean) {
        if (state) {
            defineMethods(AsyncIteratorPrototype, async_methods);
            defineMethods(IteratorPrototype, sync_methods);
        } else {
            const k = keys(async_methods);
            deleteMethods(AsyncIteratorPrototype, k);
            deleteMethods(IteratorPrototype, k);
        }
    }
}

defineProperty(IteratorPrototype, toStringTag, { value: "Iterator", configurable: true });
defineProperty(AsyncIteratorPrototype, toStringTag, { value: "AsyncIterator", configurable: true });

export const config = new Config;

export * from "@utils/iterators.js";
