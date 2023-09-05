import addLenition from '../addLenition'

const expectations = [
    ['bád', 'bhád'],
    ['roinnt', 'roinnt'],
    ['scadán', 'scadán']
]

expectations.forEach(e => {

    test(`lenites '${e[0]}' to '${e[1]}'`, () => {
        expect(addLenition(e[0])).toBe(e[1])
    })
})
