import { $globalThis, defineProperty, IteratorPrototype, AsyncIteratorPrototype, hasOwnProperty, AnyFunction } from "tslib";
import { Iterator, AsyncIterator } from "@utils/iterators.js";
import * as async_methods from "@async/all.js";
import * as sync_methods from "@sync/all.js";
import async_from from "@async/from.js";
import from from "@sync/from.js";
import { WrapForVaildIteratorPrototype } from "@wrappers/sync.js";

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

// @ts-ignore; Are you serious?
AsyncIterator.from = async_from;
// @ts-ignore; same!
Iterator.from = from;

$globalThis["Iterator"] = Iterator as never;
$globalThis["AsyncIterator"] = AsyncIterator as never;
// @ts-ignore
$globalThis["asdfasdf"] = WrapForVaildIteratorPrototype as never;

export * from "@utils/iterators.js";
