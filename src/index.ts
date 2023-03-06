import { $globalThis, defineProperty, IteratorPrototype, AsyncIteratorPrototype, hasOwnProperty, AnyFunction, freeze, keys, toStringTag, getOwnPropertyDescriptor } from "tslib";
import { Iterator, AsyncIterator } from "@utils/iterators.js";
import * as async_methods from "@async/all.js";
import * as sync_methods from "@sync/all.js";
import * as additional_async from "@async/additionals/all.js";
import * as additional_sync from "@sync/additionals/all.js";
import * as additional_async_statics from "@async/statics/additionals/all.js";
import * as async_statics from "@async/statics/all.js";
import * as additional_sync_statics from "@sync/statics/additionals/all.js";
import * as sync_statics from "@sync/statics/all.js";


type Methods = Record<string, AnyFunction>;


function defineMethods(O: object, methods: Methods) {
    for (const key in methods) {
        if (hasOwnProperty(methods, key)) {
            const value = methods[key];

            defineProperty(O, key, { value, configurable: true, writable: true });
        }
    }
}

function deleteMethods(O: object, methods: string[]) {
    for (let i = 0, l = methods.length; i < l; i++) {
        delete O[methods[i] as never];
    }
}

function initPrototype(constructor: unknown, prototype: object, methods: Methods) {
    defineMethods(prototype, methods);
    defineProperty(constructor, "prototype", { value: prototype });
}

const initialIteratorPrototype = freeze({ ...freeze(sync_methods), ...freeze(additional_sync) });
const initialAsyncIteratorPrototype = freeze({ ...freeze(async_methods), ...freeze(additional_async) });
const initialIteratorStaticMethods = freeze({ ...freeze(sync_statics), ...freeze(additional_sync_statics) });
const initialAsyncIteratorStaticMethods = freeze({ ...freeze(async_statics), ...freeze(additional_async_statics) });


initPrototype(Iterator, IteratorPrototype, initialIteratorPrototype);
initPrototype(AsyncIterator, AsyncIteratorPrototype, initialAsyncIteratorPrototype);

defineMethods(AsyncIterator, initialAsyncIteratorStaticMethods);
defineMethods(Iterator, initialIteratorStaticMethods);

const configOption: (additionalOptions?: Record<string, (state: boolean) => void>) => MethodDecorator = (additionalOptions = {}) =>
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
const _ = (method: string, state: boolean, prototype: object, initialPrototype: Methods) => {
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

        entries[key as never] = defaultStateChange(key) as never;
    }

    return entries;
};

class Config {
    @configOption(makeAdditionalsFrom(keys(additional_sync)))
    public additionals(state: boolean) {
        if (state) {
            defineMethods(AsyncIteratorPrototype, additional_async);
            defineMethods(IteratorPrototype, additional_sync);
        } else {
            const k = keys(additional_sync);

            deleteMethods(AsyncIteratorPrototype, k);
            deleteMethods(IteratorPrototype, k);
        }
    }
    @configOption(makeAdditionalsFrom(keys(sync_methods)))
    public polyfilled(state: boolean) {
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

export const installIntoGlobal = () => {
    $globalThis["Iterator"] = Iterator;
    $globalThis["AsyncIterator"] = AsyncIterator;
};

export * from "@utils/iterators.js";
