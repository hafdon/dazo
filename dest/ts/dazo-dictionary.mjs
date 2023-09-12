var beathatch_1 = {
    headword: 'beathach',
    id: 'beathach',
    homographNumber: 0,
    partsOfSpeech: [
        {
            tag: 'adjective',
            listingOrder: 0,
        },
        {
            tag: 'fgb-1',
            listingOrder: 0,
        },
    ],
    labels: [],
    pronunciations: [],
    inflectedForms: [],
    senses: [
        {
            id: 'beathach_1',
            indicator: '',
            labels: [],
            definitions: [
                {
                    text: '(In phrase)',
                    definitionType: '',
                    id: '',
                    listingOrder: 0,
                },
            ],
            examples: [
                {
                    text: 'Beo beathach',
                    sourceIdentity: 'fgb',
                    sourceElaboration: '',
                    labels: [],
                    soundFile: '',
                    id: '',
                    listingOrder: 0,
                    exampleTranslations: [
                        {
                            text: 'alive and active',
                            langCode: 'en',
                            label: [],
                            soundFile: '',
                            listingOrder: 0,
                            id: '',
                        },
                    ],
                },
                {
                    text: "D'íosfaidís beo beathach thú",
                    sourceIdentity: 'fgb',
                    sourceElaboration: '',
                    labels: [],
                    soundFile: '',
                    id: '',
                    listingOrder: 0,
                    exampleTranslations: [
                        {
                            text: 'they would eat you alive',
                            langCode: 'en',
                            label: [],
                            soundFile: '',
                            listingOrder: 0,
                            id: '',
                        },
                    ],
                },
            ],
            listingOrder: 0,
            headwordTranslations: [
                {
                    partsOfSpeech: [],
                    labels: [],
                    pronunciations: [],
                    inflectedForms: [],
                    text: '',
                    langCode: '',
                    listingOrder: 0,
                    id: '',
                },
            ],
            headwordExplanations: [],
        },
    ],
};
var minimalEntry = {
    headword: 'bochtanas',
    id: 'bochtanas',
    homographNumber: 0,
    partsOfSpeech: [
        {
            tag: 'noun-m-1',
            listingOrder: 0,
        },
    ],
};
var bochtaineacht = {
    headword: 'bochtaineacht',
    id: 'bochtaineacht',
};
var Variation = {
    scopeRestriction: 'sameResource',
    memberTypes: [
        {
            role: 'dom',
            min: 1,
            max: 1,
            type: 'entry',
            hint: 'navigate',
        },
        {
            role: 'sub',
            min: 1,
            type: 'entry',
            hint: 'embed',
        },
    ],
    type: 'variant',
    description: 'Sub is variant of dom.',
};
var VariationDom1 = {
    type: 'variant',
    members: [
        {
            memberId: 'bochtaineacht',
            role: 'sub',
        },
        {
            memberId: 'bochtanas',
            role: 'dom',
        },
    ],
};
var dazoDictionary = {
    langCode: 'ga',
    title: 'My Gaelic-English Dictionary',
    uri: 'http://github.com/hafdon/dazo',
    translationLanguages: [
        {
            langCode: 'en',
        },
    ],
    relationTypes: [Variation],
    relations: [VariationDom1],
    entries: [beathatch_1, bochtaineacht, minimalEntry],
};
console.dir(dazoDictionary, { depth: 10 });

export { dazoDictionary };
