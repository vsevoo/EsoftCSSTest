function deepCopy(obj, clonedObjects = new WeakMap()) {
    if (clonedObjects.has(obj)) {
        return clonedObjects.get(obj);
    }

    let clone;
    if (obj instanceof Date) {
        clone = new Date(obj);
    } else if (obj instanceof Map) {
        clone = new Map(Array.from(obj, ([key, val]) => [key, deepCopy(val, clonedObjects)]));
    } else if (obj instanceof Set) {
        clone = new Set(Array.from(obj, val => deepCopy(val, clonedObjects)));
    } else if (typeof obj === 'object' && obj !== null) {
        clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
        clonedObjects.set(obj, clone);

        // Copy enumerable properties
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clone[key] = deepCopy(obj[key], clonedObjects);
            }
        }

        // Copy non-enumerable properties
        const allPropertyNames = Object.getOwnPropertyNames(obj);
        for (let key of allPropertyNames) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                clone[key] = deepCopy(obj[key], clonedObjects);
            }
        }

        // Copy symbol properties
        const symbolProperties = Object.getOwnPropertySymbols(obj);
        for (let symbol of symbolProperties) {
            clone[symbol] = deepCopy(obj[symbol], clonedObjects);
        }
    } else {
        return obj;
    }

    return clone;
}

const obj1 = {
    a: 1,
    b: {
        c: 2,
        d: [3, 4]
    },
    [Symbol('sym')]: 'symbol value',
    func: function() { return 'function value'; }
};

const obj2 = deepCopy(obj1);

obj2.a = 5;
obj2.b.c = 6;
obj2.b.d.push(7);

console.log(obj1);
console.log(obj2);
