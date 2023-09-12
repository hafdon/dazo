import { BaseUri } from './Uri';
import { RequireAtLeastOne } from './UtilityTypes';

export type UUID = string | number;

export function uuidv4(): UUID {
    // import { v4 as uuidv4 } from 'uuid';
    return Math.random().toString().slice(2) as UUID;
}

/**
 * A pointer to a file, such as a filename or a URI, containing a
 * sound recording of the pronunciation
 */
export type SoundFilePointerType = string;

export interface BaseId {
    // actually id?: UUID
    id?: UUID;
}

export interface BaseListingOrder {
    listingOrder?: number;
    // This can be implicit from the serialization.
}

export interface LexicographicResource extends BaseUri {
    langCode: string;
    title?: string;
    entries?: Entry[];
}

export interface Entry extends BaseId {
    headword: string;
    // Entry has a homographNumber instead of a listingOrder
    // for some reason
    // The entry's homograph number, as a guide to
    // distinguish entries with the same headword.
    homographNumber?: number;
    partsOfSpeech?: PartOfSpeech[];
    labels?: Label[];
    pronunciations?: Pronunciation[];
    inflectedForms?: InflectedForm[];
    senses?: Sense[];
}

/**
 * The way to model other grammatical properties of the headword
 * besides part of speech, such as gender (of nouns) or aspect (of verbs)
 * in DMLex is to combine them with the part of speech into a single
 * part-of-speech tag, for example noun-masc and noun-fem,
 * or v-perf and v-imperf.
 */
export interface PartOfSpeech
    /**
     * BaseListingOrder specifies listingOrder: The position of
     * this part-of-speech label among other part-of-speech labels
     * of the same entry. This can be implicit from the
     * serialization.
     */
    extends BaseListingOrder {
    /* Non-empty string. An abbreviation, a code or some other string of text which identifies the part-of-speech label, for example n for noun, v for verb, adj for adjective. 
    
    MODULE: The PartOfSpeechTag object type can be used to explain the meaning of the part-of-speech tags, to constrain which part-of-speech tags are allowed to occur in the lexicographic resource, and to map them onto external inventories and ontologies.
    */
    tag: string;
}

/**
 * The inflectedForm object type is intended to model the
 * inflectional morphology of a headword. To model derivational
 * morphology, for example feminine forms of masculine nouns, the
 * recommended way to do that in DMLex is to create separate
 * entries for the two words, and link them using the Linking
 * Module.
 */
export interface InflectedForm
    extends BaseId,
        // listingOrder defines:
        // The position of this inflected form among other inflected forms
        // of the same entry.
        BaseListingOrder {
    /**
     * An abbreviation, a code or some other string of text which identifies
     * the inflected form, for example pl for plural, gs for genitive
     * singular, com for com- parative.
     *
     * MODULE The inflectedFormTag object type
     * can be used to explain the meaning of the inflection tags, to
     * constrain which inflection tags are allowed to occur in the
     * lexicographic resource, and to map them onto external inventories
     * and ontologies.
     * */
    tag?: string;
    /**
     * The text of the inflected form.
     */
    text: string;
    labels?: Label[];
    pronunciations?: Pronunciation[];
}

/**
 * The properties of entry are, apart from sense, formal properties of
 * the headword such as orthography, morphology, syntax and pronunciation.
 *
 * A sense is a container for statements about the headword's semantics.
 * DMLex deliberately makes it impossible to include morphological
 * information at sense level. It is impossible in DMLex to model
 * an entry where each sense has slightly different morphological properties
 * (e.g. a noun has a weak plural in one sense and a strong plural in another).
 * Such phenomena need to be treated as two entries (homographs) and can be linked using
 * the Linking Module to make sure they are always shown together to human users.
 *
 * Sense: Represents one of possibly many meanings (or meaning potentials) of the headword.
 */
export interface Sense extends BaseId, BaseListingOrder {
    /**
     * A short statement, in the same language as the headword, that
     * gives an indication of the meaning of a sense and permits its
     * differentiation from other senses in the entry. Indicators are
     * sometimes used in dictionaries instead of or in addition to
     * definitions.
     */
    indicator?: string;
    labels?: Label[];
    definitions?: Definition[];
    examples?: Example[];
}

/**
 * Represents one of possibly several definitions of a sense.
 */
export interface Definition extends BaseId, BaseListingOrder {
    // A statement, in the same language as the headword, that describes and/or explains
    // the meaning of a sense. In DMLex, the term definition encompasses not only formal
    // definitions, but also less formal explanations.
    text: string;

    /**
     * @definitionType If a sense contains multiple definitions,
     * indicates the difference between them, for example that they are
     * intended for different audiences.
     *
     * MODULE: [ControlledValuesModule.DefinitionTypeTag] can be used to
     * constrain and/or explain the definition types that occur
     * in the lexicographic resource.
     */
    definitionType?: string;
}

/**
 * Represents a restriction on its parent such as temporal (old-fashioned, neologism),
 * regional (dialect), register (formal, colloquial), domain (medicine, politics)
 * or grammar (singular-only)
 *
 * A label applies to the object that it is a child of. When the label is a child of Entry,
 * then it applies to the headword in all its senses. When the label is a child of Sense,
 * then it applies to the headword in that sense only (not including any subsenses
 * linked to it using the Linking Module). When the label is a child of InflectedForm,
 * then it applies only to that inflected form of the headword (in all senses).
 * When the label is a child of Pronunciation, then it applies only to that pronunciation
 * of the headword (in all senses).
 */
export interface Label extends BaseListingOrder {
    /**
     * @tag An abbreviation, a code or some other string of text which
     * identifies the label, for example neo for neologism, colloq for
     * colloquial, polit for politics.
     *
     * MODULE: [ControlledValuesModule.DefinitionTypeTag] can be
     * used to explain the meaning of the labels, to constrain which
     * labels are allowed to occur in the lexicographic resource,
     * and to map them onto external inventories and ontologies.
     */
    tag: string;
}

export type Pronunciation = BaseId &
    BaseListingOrder &
    RequireAtLeastOne<{
        soundFile: SoundFilePointerType;
        transcriptions: [Transcription, ...[Transcription]];
    }> & {
        labels?: Label[];
    };

export interface Transcription extends BaseId, BaseListingOrder {
    text: string;
    /**
     * @scheme IETF language tag.
     * Identifies the transcription scheme used here.
     * Example: en-fonipa for English IPA. This can be implicit if the
     * lexicographic resource uses only one transcription scheme throughout.
     *
     * MODULE: [ControlledValuesModule.TranscriptionSchemeTag] can be
     * used to define which transcription schemes are allowed in
     * the lexicographic resource.
     */
    scheme?: string;
}

export interface Example extends BaseId, BaseListingOrder {
    text: string;
    /**
     * @sourceIdentity An abbreviation, a code or some other string of text which identifies the source.
     *
     * MODULE: [ControlledValuesModule.SourceIdentityTag] can be used to
     * explain the meaning of the source identifiers, to constrain which
     * source identifiers are allowed to occur in the lexicographic
     * resource, and to map them onto external inventories and ontologies.
     */
    sourceIdentity?: string;
    /**
     * @sourceElaboration A free-form statement about the source of the
     * example. If `sourceIdentity` is present, then `sourceElaboration`
     * can be used for information about where in the source the example
     * can be found: page number, chapter and so on. If `sourceIdentity`
     * is absent then `sourceElaboration` can be used to fully name the source.
     */
    sourceElaboration?: string;
    labels?: Label[];
    soundFile?: SoundFilePointerType;
}
