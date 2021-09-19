import { $globalThis, defineProperty, IteratorPrototype, AsyncIteratorPrototype, hasOwnProperty, AnyFunction } from "tslib";
import { Iterator, AsyncIterator } from "@utils/iterators.js";
import * as async_methods from "@async/all.js";
import * as sync_methods from "@sync/all.js";
import async_from from "@async/from.js";
import from from "@sync/from.js";

function initPrototype(constructor: AnyFunction, prototype: unknown, methods: Record<string, AnyFunction>) {
    for (const key in methods) {
        if (hasOwnProperty(methods, key)) {
            const value = methods[key];
            defineProperty(prototype, key, { value, configurable: true, writable: true });
        }
    }
    defineProperty(constructor, "prototype", { value: prototype })
}

initPrototype(Iterator, IteratorPrototype, sync_methods);


initPrototype(AsyncIterator, AsyncIteratorPrototype, async_methods);

AsyncIterator.from = async_from;
Iterator.from = from;

$globalThis["Iterator"] = Iterator;
$globalThis["AsyncIterator"] = AsyncIterator;

export * from "@utils/iterators.js";
