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
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clone[key] = deepCopy(obj[key], clonedObjects);
            }
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
    }
};

const obj2 = deepCopy(obj1);

obj2.a = 5;
obj2.b.c = 6;
obj2.b.d.push(7);

console.log(obj1);
console.log(obj2);