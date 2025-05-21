import {
    varNameToString,
    convertToToggleableObject,
    convertToRegularObject,
    isObject, // Used by functions under test
    // getDefaultValueForVariableType is implicitly tested by convertToRegularObject
} from './utils';

describe('Utility Functions', () => {
    describe('varNameToString', () => {
        it('should return the variable name for a simple variable', () => {
            const myVar = 123;
            expect(varNameToString({ myVar })).toBe('myVar');
        });

        it('should return the variable name for an object variable', () => {
            const myObj = { data: 'test' };
            expect(varNameToString({ myObj })).toBe('myObj');
        });

        it('should return the variable name for an array variable', () => {
            const myArray = [1, 2, 3];
            expect(varNameToString({ myArray })).toBe('myArray');
        });
    });

    describe('convertToToggleableObject', () => {
        it('should not mutate the original object', () => {
            const original = { a: 1, b: { c: 2 } };
            const originalCopy = JSON.parse(JSON.stringify(original));
            convertToToggleableObject(original);
            expect(original).toEqual(originalCopy);
        });

        it('should return the original input if it is not a plain object (as per isObject)', () => {
            const inputString = "not an object";
            expect(convertToToggleableObject(inputString)).toBe(inputString);
            
            const inputNumber = 123;
            expect(convertToToggleableObject(inputNumber)).toBe(inputNumber);

            const inputArray = [1, {a: 1}]; // isObject(array) is false
            expect(convertToToggleableObject(inputArray)).toEqual(inputArray);

            expect(convertToToggleableObject(null)).toBe(null);
        });
        
        it('should convert properties to toggleable format for simple objects', () => {
            const simpleInput = { foo: "bar", num: 100 };
            const simpleExpected = {
                foo: { value: "bar", enabled: true },
                num: { value: 100, enabled: true }
            };
            expect(convertToToggleableObject(simpleInput)).toEqual(simpleExpected);
        });

        it('should convert properties to toggleable format for nested objects', () => {
            const nestedInput = { a: "valA", b: { c: "valC", d: { e: "valE" } } };
            // Based on the logic:
            // convertToToggleableObject is called on b's value: { c: "valC", d: { e: "valE" } }
            // Result for c: { value: "valC", enabled: true }
            // Result for d: { value: { e: { value: "valE", enabled: true } }, enabled: true }
            // So the value of 'b' becomes: { c: { value: "valC", enabled: true }, d: { value: { e: { value: "valE", enabled: true } }, enabled: true } }
            // Then this whole thing is wrapped.
            const nestedExpected = {
                a: { value: "valA", enabled: true },
                b: {
                    value: {
                        c: { value: "valC", enabled: true },
                        d: { 
                            value: { e: { value: "valE", enabled: true } }, 
                            enabled: true 
                        }
                    },
                    enabled: true
                }
            };
            expect(convertToToggleableObject(nestedInput)).toEqual(nestedExpected);
        });
        
        it('should convert arrays within objects correctly, making object elements toggleable', () => {
            const inputWithArray = {
                name: "ArrayTest",
                items: [
                    { id: 1, data: "first" }, // This is an object, should be made toggleable
                    "second_item",             // This is a primitive, should remain as is
                    { id: 3, data: "third" }  // This is an object, should be made toggleable
                ]
            };
            // The recursive call `convertToToggleableObject(item, ignoredProperties)` happens for object items in the array.
            // The array itself is then wrapped in { value: ..., enabled: ... }.
            const expectedWithArray = {
                name: { value: "ArrayTest", enabled: true },
                items: {
                    value: [
                        // Result of convertToToggleableObject({ id: 1, data: "first" })
                        { id: { value: 1, enabled: true }, data: { value: "first", enabled: true } },
                        "second_item",
                        // Result of convertToToggleableObject({ id: 3, data: "third" })
                        { id: { value: 3, enabled: true }, data: { value: "third", enabled: true } }
                    ],
                    enabled: true
                }
            };
            expect(convertToToggleableObject(inputWithArray)).toEqual(expectedWithArray);
        });

        it('should ignore specified properties at the top level', () => {
            const input = { name: 'Test', meta: { version: 1 }, data: { value: 5 } };
            // `meta` will be deleted because `ignoredProperties.includes('meta')` is true.
            // `data` will be processed.
            const expected = {
                name: { value: 'Test', enabled: true },
                data: { 
                    value: { value: { value: 5, enabled: true } }, // data.value is {value:5}, which is an object, so it's made toggleable
                    enabled: true                                   // then the result is wrapped.
                }
            };
            expect(convertToToggleableObject(input, ['meta'])).toEqual(expected);
        });

        it('should handle properties that are empty strings or empty arrays correctly (deleted)', () => {
            const input = { a: "", b: "value", c: [] };
            const expected = { 
                b: { value: "value", enabled: true }
                // a and c should be deleted because their length is 0
            };
            expect(convertToToggleableObject(input)).toEqual(expected);
        });

        it('should handle empty objects (they are not deleted, enabled becomes false)', () => {
            const input = { emptyObj: {}, d: "value" };
            const expected = { 
                emptyObj: { value: {}, enabled: false }, // enabled: false because Object.values({}).some(...) is false
                d: { value: "value", enabled: true }
            };
            expect(convertToToggleableObject(input)).toEqual(expected);
        });
    });

    describe('convertToRegularObject', () => {
        it('should not mutate the original object', () => {
            const original = { a: { value: 1, enabled: true }, b: { value: { c: { value: 2, enabled: true } }, enabled: true } };
            const originalCopy = JSON.parse(JSON.stringify(original));
            convertToRegularObject(original);
            expect(original).toEqual(originalCopy);
        });
        
        it('should return the original input if it is not a plain object (as per isObject)', () => {
            const inputString = "not an object";
            expect(convertToRegularObject(inputString)).toBe(inputString);
            
            const inputNumber = 123;
            expect(convertToRegularObject(inputNumber)).toBe(inputNumber);

            // Arrays are not "plain" objects according to isObject, so they should be returned as is at the top level.
            // However, the implementation of convertToRegularObject for arrays (if it's a property of an object)
            // *does* process them. This test focuses on the top-level input.
            const inputArray = [1, {a: {value: 1, enabled: true}}];
            expect(convertToRegularObject(inputArray)).toEqual(inputArray);

            expect(convertToRegularObject(null)).toBe(null);
        });

        it('should convert toggleable properties back to regular format (enabled and disabled fields)', () => {
            const input = {
                name: { value: 'Test', enabled: true },
                age: { value: 30, enabled: false }, // This should become default (0 for number)
                address: { 
                    value: { 
                        city: { value: 'City', enabled: true }, 
                        street: { value: 'Street', enabled: false } // Becomes ""
                    }, 
                    enabled: true 
                },
                contact: { // This whole object is disabled
                    value: {
                        email: { value: 'test@example.com', enabled: true }, // This enabled won't matter
                        phone: { value: '12345', enabled: true }      // This enabled won't matter
                    },
                    enabled: false 
                }
            };
            const expected = {
                name: 'Test',
                age: 0, 
                address: { city: 'City', street: '' },
                contact: {} // Default for object as 'contact' itself was disabled
            };
            expect(convertToRegularObject(input)).toEqual(expected);
        });
        
        it('should correctly handle arrays of mixed toggleable/non-toggleable items', () => {
            const inputWithArray = {
                items: {
                    value: [
                        { value: 'item1', enabled: true }, // Becomes 'item1'
                        { value: 'item2', enabled: false }, // Becomes '' (default for string)
                        { 
                            value: { 
                                id: {value: 3, enabled: true}, 
                                name: {value: "Complex", enabled: false} // name becomes ""
                            }, 
                            enabled: true 
                        },
                        "alreadyRegular", // Stays as is
                        { plain: "object", nested: { sub: "val"} } // This is not in toggleable format, should recurse
                    ],
                    enabled: true
                }
            };
            const expectedWithArray = {
                items: [
                    'item1',
                    '', 
                    { id: 3, name: "" },
                    "alreadyRegular",
                    { plain: "object", nested: { sub: "val"} } // Remains as is because it's not toggleable
                ]
            };
            expect(convertToRegularObject(inputWithArray)).toEqual(expectedWithArray);
        });

        it('should retain ignored properties as they are if they are not in toggleable format', () => {
            const input = {
                name: { value: 'Test', enabled: true },
                __translation__: { key: 'val' } // Not in toggleable format
            };
            const expected = {
                name: 'Test',
                __translation__: { key: 'val' }
            };
            expect(convertToRegularObject(input, ['__translation__'])).toEqual(expected);
        });

        it('should retain ignored properties as they are even if they are in toggleable format (top-level ignore)', () => {
            const inputWithToggleableIgnored = {
                name: { value: 'Test', enabled: true },
                meta: { value: { version: 1 }, enabled: true } 
            };
            const expectedIgnoredToggleable = {
                name: 'Test',
                meta: { value: { version: 1 }, enabled: true } // meta is ignored, so it's not processed further
            };
            expect(convertToRegularObject(inputWithToggleableIgnored, ['meta'])).toEqual(expectedIgnoredToggleable);
        });

        it('should handle properties that are already regular or have a different structure', () => {
            const input = {
                name: { value: 'Test', enabled: true },
                alreadyRegular: "I'm regular",
                nestedRegular: { a: 1, b: "bee" },
                partiallyToggleable: { 
                    sub1: { value: "Sub1Value", enabled: true},
                    sub2Regular: "Sub2RegularValue"
                }
            };
            const expected = {
                name: 'Test',
                alreadyRegular: "I'm regular",
                nestedRegular: { a: 1, b: "bee" },
                partiallyToggleable: { // The function will recurse into this.
                    sub1: "Sub1Value",
                    sub2Regular: "Sub2RegularValue"
                }
            };
            expect(convertToRegularObject(input)).toEqual(expected);
        });
    });
});
