import {
    CrosslingualModule,
    ExampleTranslation,
    HeadwordExplanation,
    HeadwordTranslation,
} from './CrosslingualModule';
import { Entry, Example, LexicographicResource, Sense } from './DMLex';
import { LinkingModule, Relation, RelationType } from './LinkingModule';

type DazoExample = Example & { exampleTranslations?: ExampleTranslation[] };

type DazoEntry = Entry & {
    senses?: DazoSense[];
};

type DazoSense = Sense & {
    headwordTranslations?: HeadwordTranslation[];
    headwordExplanations?: HeadwordExplanation[];
    examples?: DazoExample[];
};

type DazoDictionary = LexicographicResource &
    CrosslingualModule &
    LinkingModule;

const beathatch_1: DazoEntry = {
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
    inflectedForms: [], // why is this also in headwordTranslations?
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

const minimalEntry: DazoEntry = {
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

const bochtaineacht: DazoEntry = {
    headword: 'bochtaineacht',
    id: 'bochtaineacht',
};

const Variation: RelationType = {
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
            min: 1, // no max for variants
            type: 'entry',
            hint: 'embed',
        },
    ],
    type: 'variant',
    description: 'Sub is variant of dom.',
};

const VariationDom1: Relation = {
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

export const dazoDictionary: DazoDictionary = {
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
