import Dictionary from '../__mocks__/db.dictionary'
import getSubformMatchesDb from '../getSubformMatchesDb'


describe('getSubformMatchesDb', () => {

    test(`Dictionary to have 17 elements`, () => {
        expect(Dictionary).toHaveLength(17)
    })

    test(`Dictionary[0].id to be 1`, () => {
        expect(Dictionary[0].id).toBe(1)
    })


    test(`Dictionary[0].headword to be "ar fud"`, () => {
        expect(Dictionary[0].headword).toBe("ar fud")
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


    test(`'dualgais'`, () => {
        expect(getSubformMatchesDb('dualgais', Dictionary)[0].headword).toBe('dualgas')
    })

    test(`${test1}`, () => {
        expect(getSubformMatchesDb(test1, Dictionary)).toMatchObject(test1Matches)
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


    test(`'trachtala' headword to be 'tráchtáil'`, () => {
        expect(getSubformMatchesDb("trachtala", Dictionary)[0].headword).toBe('tráchtáil')
    })

    test(`'trachtala' to return two matches on returned object`, () => {
        expect(getSubformMatchesDb("trachtala", Dictionary)[0].matches).toHaveLength(2)
    })

    // test(`${test2}`, () => {
    //     expect(getSubformMatchesDb(test2, Dictionary)).toMatchObject(test2Matches)
    // })

    const test3 = "eispéiris"
    const test3Matches = [{
        matches: [
            { eispéiris: "gs" }
        ],
        index: 0,
        headword: 'eispéireas',
        listing: {}
    }]


    test(`'eispéiris' headword to be 'eispéireas'`, () => {
        expect(getSubformMatchesDb("eispéiris", Dictionary)[0].headword).toBe('eispéireas')
    })


    // test(`${test3} should return ${JSON.stringify(test3Matches, null, 2)}`, () => {
    //     expect(getSubformMatchesDb(test3, Dictionary)).toMatchObject(test3Matches)
    // })

})