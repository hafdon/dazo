/***********************************
 * Etymology Module
 ***********************************/
import { BaseId, BaseListingOrder, PartOfSpeech } from './DMLex';

export interface EtymologyModule {
    etymonLanguages?: EtymonLanguage[];
    etymonTypes?: EtymonType[];
    entries?: {
        /**
         * If an entry can contains more than one etymology object, then the different etymology objects represent different hypotheses about the origin of the headword.
         */
        etymology?: Etymology[];
    }[];
}

export interface EtymonType {
    /**
     * No two instances of etymonType in the same
     * lexicographicResource can have the same type.
     */
    type: string;
    description?: string;
}

/**
 * Represents one of several allowed values for the language property
 * of etymonUnit objects.
 */
interface EtymonLanguage {
    // Etymologies frequently refer to languages that are not covered by ISO standards.
    // It may be necessary to avail of private-use subtags when composing IETF language tags
    // for etymology, and to explain their meaning in the displayName.
    langCode: string;
    displayName?: string;
}

export interface Etymology extends BaseId, BaseListingOrder {
    description?: string;
    etymons?: Etymon[];
}

/**
 * Represents one stage (of possibly several) in the
 * etymological history of the headword.
 */
export interface Etymon extends BaseId, BaseListingOrder {
    when?: string;
    /**
     * @type
     * SELF-MODULE: [EtymologyModule.EtymonType] The values
     * can be explained and constrained using the EtymonType
     * object type.
     **/
    type?: string;
    note?: string;
    etymonUnits: EtymonUnit[];
    translation?: string;
}

/**
 * Represents a form (typically a word) which is the etymological
 * origin of the headword, or another etymologically related form.
 */
export interface EtymonUnit extends BaseId, BaseListingOrder {
    // An IETF tag. The tags can be explained and constrained using the etymonLanguage object type.
    langCode: string;
    text: string;
    reconstructed?: boolean;
    partsOfSpeech?: PartOfSpeech[];
    translation?: string;
}

/******************************************
 * Tests, etc/
 ******************************************/

const etymonTypeTypes = (lr: EtymologyModule) =>
    lr.etymonTypes.map(({ type }) => type);

const etymonLanguageLangCodes = (lr: EtymologyModule) =>
    lr.etymonLanguages.map(({ langCode }) => langCode);

/**
 * No two instances of etymonType in the same lexicographicResource
 * can have the same type.
 */
export function AreEtymonTypeTypesUnique(lr: EtymologyModule) {
    const all = etymonTypeTypes(lr);
    const uniques = Array.from(new Set(all));
    return all.length === uniques.length;
}

/**
 * No two instances of etymonType in the same lexicographicResource
 * can have the same type.
 */
export function AreEtymonLanguageLangCodesUnique(lr: EtymologyModule) {
    const all = etymonLanguageLangCodes(lr);
    const uniques = Array.from(new Set(all));
    return all.length === uniques.length;
}

export function AreEtymologyEtymonsTypesConstrained(lr: EtymologyModule) {
    /**
     * The values can be explained and constrained using
     * the EtymonType object type.
     **/
    const constraints = etymonTypeTypes(lr);
    return lr.entries.every((e) =>
        e.etymology.every((t) =>
            t.etymons.every((y) => constraints.includes(y.type))
        )
    );
}

export function AreEtymonLanguageLangCodesConstrained(lr: EtymologyModule) {
    /**
     * The values can be explained and constrained using
     * the EtymonLanguage object type.
     **/
    const constraints = etymonLanguageLangCodes(lr);
    return lr.entries.every((e) =>
        e.etymology.every((t) =>
            t.etymons.every((y) =>
                y.etymonUnits.every((u) => constraints.includes(u.langCode))
            )
        )
    );
}
