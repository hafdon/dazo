import nonEmptyArray from '../nonEmptyArray'

test(`'null' returns 'false'`, () => {
    expect(nonEmptyArray(null)).toBe(false)
})
test(`'undefined' returns 'false'`, () => {
    expect(nonEmptyArray(undefined)).toBe(false)
})
test(`'1' returns 'false'`, () => {
    expect(nonEmptyArray(1)).toBe(false)
})
test(`'[]' returns 'false'`, () => {
    expect(nonEmptyArray([])).toBe(false)
})
test(`'[1]' returns 'true'`, () => {
    expect(nonEmptyArray([1])).toBe(true)
})
