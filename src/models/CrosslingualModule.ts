import {
    BaseId,
    BaseListingOrder,
    InflectedForm,
    Label,
    PartOfSpeech,
    Pronunciation,
} from './DMLex';

export interface CrosslingualModule {
    translationLanguages?: TranslationLanguage[];

    entries?: {
        senses?: {
            headwordTranslations?: HeadwordTranslation[];
            headwordExplanations?: HeadwordExplanation[];
            examples?: {
                exampleTranslations?: ExampleTranslation[];
            };
        }[];
    }[];
}

export interface TranslationLanguage
    //  Sets the order in which translations (of headwords and examples)
    // should be shown. It outranks the listing order given in
    // headwordTranslation, headwordExplanation and exampleTranslation
    // objects.
    extends BaseListingOrder {
    langCode: string; // can type narrow this in Class definition
    // for instance if you create an enum or Object/dictionary/hash
    // for allowed values
    // The IETF language code of the language.
}

/**
 * Represents one of possibly multiple translations of a headword.
 */
export interface HeadwordTranslation extends BaseId {
    // Entry has a homographNumber instead of a listingOrder
    // for some reason
    // The entry's homograph number, as a guide to
    // distinguish entries with the same headword.
    partsOfSpeech?: PartOfSpeech[];
    labels?: Label[];
    pronunciations?: Pronunciation[];
    inflectedForms?: InflectedForm[];
    text: string;

    // (zero or one) if only one translation language exists in the lexicographic resource,
    // required (exactly one) otherwise.
    langCode?: string; // see TranslationLanguage
    // IETF language tag. Indicates the language of this translation.
    // The translationLanguage datatype can be used to explain the meaning of the
    // language codes that appear here and/or to constrain which language codes are allowed.
    listingOrder: number;
}

/**
 * Represents a statement in the translation language which explains
 * (but does not translate) the meaning of the headword.
 *
 * It is assumed that there will always be a maximum of one headwordExplanation
 * per translation language in each sense. For this reason, headwordExplanation
 * does not have a listingOrder.
 */
export interface HeadwordExplanation extends BaseId {
    text: string;
    langCode?: string; // see TranslationLanguage
    // if only one translation language exists in the lexicographic resource,
    // required (exactly one) otherwise. IETF language tag. Indicates the language
    // in which this explana- tion is written. The translationLanguage datatype
    // can be used to explain the meaning of the language codes that appear
    // here and/or to constrain which language codes are allowed.
}

export interface ExampleTranslation extends BaseId {
    text: string;
    langCode?: string;
    //  if only one translation language exists in the lexicographic resource, required (exactly one) otherwise. IETF language tag. Indicates the language of this translation. The translationLanguage datatype can be used to explain the meaning of the language codes that appear here and/or to constrain which language codes are allowed.
    labels?: Label[];
    soundFile?: string;
    listingOrder: number;
}

/**
 * It is assumed that there will always be a maximum of one headwordExplanation per transla- tion language in each sense. For this reason, headwordExplanation does not have a listin- gOrder.
 */
export function explanationConstraint(lr: CrosslingualModule) {
    return lr.entries.every((e) =>
        e.senses.every((s) => {
            const all = s.headwordExplanations.map(({ langCode }) => langCode);
            const unique = Array.from(new Set(all));
            return all.length === unique.length;
        })
    );
}

const testCase: HeadwordExplanation[] = [
    {
        id: 0,
        langCode: 'en',
        text: 'hello',
    },
    {
        id: 1,
        langCode: 'en',
        text: 'hi',
    },
    {
        id: 2,
        langCode: 'ga',
        text: 'dia duit',
    },
    {
        id: 3,
        langCode: 'es',
        text: 'hola',
    },
];

// test 1
const res = explanationConstraint({
    entries: [{ senses: [{ headwordExplanations: testCase }] }],
});

console.log({ res });
