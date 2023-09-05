import widthMask from '../widthMask'

/**
 * const mp = {
  1: "V", // broad vowel
  2: "V'", // slender vowel
  3: "C", // broad consonant
  4: "C'", // slender consonant
};
 */

const expectations = [
    ['bád', '313'],
    ['scailp', '331244']
]

expectations.forEach(e => {

    test(`Width mask for '${e[0]}' to be '${e[1]}'`, () => {
        expect(widthMask(e[0])).toBe(e[1])
    })
})
