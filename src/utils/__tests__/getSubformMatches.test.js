import Dictionary from '../__mocks__/dictionary'
import getSubformMatches from '../getSubformMatches'


describe('getSubformMatches', () => {

    test(`Dictionary to have 16 elements`, () => {
        expect(Object.keys(Dictionary)).toHaveLength(16)
    })

    const test1 = 'dualgais'
    const test1Matches = [{
        matches: [
            { dualgais: "cp" },
            { dualgais: "gs" },
        ],
        index: 0,
        headword: 'dualgas',
        listing: {}
    }]

    test(`${test1}`, () => {
        expect(getSubformMatches(test1, Dictionary)).toMatchObject(test1Matches)
    })

    const test2 = "tráchtála"
    const test2Matches = [{
        matches: [
            { tráchtála: "gs" }
        ],
        index: 0,
        headword: 'tráchtáil',
        listing: {}
    }]

    test(`${test2}`, () => {
        expect(getSubformMatches(test2, Dictionary)).toMatchObject(test2Matches)
    })

    const test3 = "eispéiris"
    const test3Matches = [{
        matches: [
            { eispéiris: "gs" }
        ],
        index: 0,
        headword: 'eispéireas',
        listing: {}
    }]


    test(`${test3} should return ${JSON.stringify(test3Matches, null, 2)}`, () => {
        expect(getSubformMatches(test3, Dictionary)).toMatchObject(test3Matches)
    })

})