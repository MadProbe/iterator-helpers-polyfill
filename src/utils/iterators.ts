import { undefined, $globalThis, TypeError } from "tslib";

export function Iterator() {
    if (new.target === undefined || new.target as any === $globalThis) {
        throw TypeError("Iterator constructor cannot be called without `new`");
    }
}

export function AsyncIterator() {
    if (new.target === undefined || new.target as any === $globalThis) {
        throw TypeError("AsyncIterator constructor cannot be called without `new`");
    }
}
