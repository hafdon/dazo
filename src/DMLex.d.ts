// TypeScript is a Structural Type System. A structural type
// system means that when comparing types, TypeScript only
// takes into account the members on the type.

// This is in contrast to nominal type systems, where you
// could create two types but could not assign them to each
// other. See example:nominal-typing

// For example, these two interfaces are completely
// transferrable in a structural type system:

type UUID = string;

interface BaseUri {
    uri: string;
}

interface LexicographicResource extends BaseUri {
    langCode: string;
    title?: string;
    entry?: Entry[];
}

const lr: LexicographicResource = {
    uri: 'blah',
    langCode: 'blah2',
};

interface Entry {
    id?: UUID;
    headword: string;
    homographNumber?: number[];
    partOfSpeech?: PartOfSpeech[];
    label?: Label[];
    pronunciation?: Pronunciation[];
    inflectedForm?: InflectedForm[];
    sense?: Sense[];
}

/** The way to model other grammatical properties of the headword
 *  besides part of speech, such as gender (of nouns) or aspect (of verbs)
 *  in DMLex is to combine them with the part of speech into a single part-of-speech tag,
 *  for example noun-masc and noun-fem, or v-perf and v-imperf.
 */
interface PartOfSpeech {
    tag: string; // see PartOfSpeechTag
    // egs. "n" (noun); "v" (verb); "adj" (adjective)
    listingOrder: number;
    // The position of this part-of-speech label among other part-of-speech labels
    // of the same entry.
    // This can be implicit from the serialization.
}

/**
 * The inflectedForm object type is intended to model the inflectional morphology
 * of a headword. To model derivational morphology, for example feminine forms of
 * masculine nouns, the recommended way to do that in DMLex is to create separate
 * entries for the two words, and link them using the Linking Module.
 */
interface InflectedForm {
    id?: UUID;
    tag?: string[]; // see InflectedFormTag
    // An abbreviation, a code or some other string of text which identifies
    // the inflected form, for example pl for plural, gs for genitive singular,
    // com for com- parative. The inflectedFormTag object type can be used to
    // explain the meaning of the inflection tags, to constrain which inflection
    // tags are allowed to occur in the lexicographic resource, and to map them
    // onto external inventories and ontologies.
    text: string;
    label?: Label[];
    pronunciation?: Pronunciation[];
    listingOrder: number;
    // The position of this inflected form among other inflected forms of the same entry.
    // This can be implicit from the serialization.
}

/**
 * The properties of entry are, apart from sense, formal properties of the headword
 * such as orthography, morphology, syntax and pronunciation. A sense is a container
 * for statements about the head-word's semantics. DMLex deliberately makes it impossible
 * to include morphological information at sense level. It is impossible in DMLex to model
 * an entry where each sense has slightly different morphological properties
 * (e.g. a noun has a weak plural in one sense and a strong plural in another).
 * Such phenomena need to be treated as two entries (homographs) and can be linked using
 * the Linking Module to make sure they are always shown together to human users.
 */
interface Sense {
    id?: UUID;
    listingOrder: number;
    indicator?: string[];
    // A short statement, in the same language as the headword, that gives an indication
    // of the meaning of a sense and permits its differentiation from other senses in
    // the entry. Indicators are sometimes used in dictionaries instead of or in addition
    // to definitions.
    label?: Label[];
    definition?: Definition[];
    example?: Example[];
}

/**
 * Represents one of possibly several definitions of a sense.
 */
interface Definition {
    id?: UUID;
    text: string;
    // A statement, in the same language as the headword, that describes and/or explains
    // the meaning of a sense. In DMLex, the term definition encompasses not only formal
    // definitions, but also less formal explanations.
    definitionType?: string; // see DefinitionTypeTag
    //  If a sense contains multiple definitions, indicates the difference between them,
    // for example that they are intended for different audiences. The definitionTypeTag
    // object type can be used to constrain and/or explain the definition types that occur
    // in the lexicographic resource.
    listingOrder: number;
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
interface Label {
    tag: string; // see LabelTag
    // An abbreviation, a code or some other string of text which identifies the label,
    // for example neo for neologism, colloq for colloquial, polit for politics.
    // The labelTag object type can be used to explain the meaning of the labels,
    // to constrain which labels are allowed to occur in the lexicographic resource,
    // and to map them onto external inventories and ontologies.
    listingOrder: number;
}

interface Pronunciation {
    id?: UUID;

    // At least one of:
    soundFile?: string;
    transcription?: Transcription[];

    listingOrder: number;
    label?: Label[];
}

interface Transcription {
    id?: UUID;
    text: string;
    scheme?: string; // see TranscriptionSchemeTag
    // IETF language tag. Identifies the transcription scheme used here.
    // Example: en-fonipa for English IPA. This can be implicit if the lexicographic
    // resource uses only one transcription scheme throughout. The transcriptionSchemeTag
    // object type can be used to define which transcription schemes are allowed in
    // the lexicographic resource.
    listingOrder: number;
}

interface Example {
    id?: UUID;
    text: string;
    sourceIdentity?: string; // see SourceIdentityTag
    //  An abbreviation, a code or some other string of text which identifies the source.
    // The sourceIdentityTag object type can be used to explain the meaning of the source
    // identifiers, to constrain which source identifiers are allowed to occur in the
    // lexicographic resource, and to map them onto external inventories and ontologies.
    sourceElaboration?: string;
    // A free-form statement about the source of the example. If sourceIdentity is present,
    // then sourceElaboration can be used for information about where in the source the
    // example can be found: page number, chapter and so on. If sourceIdentity is absent
    // then sourceElaboration can be used to fully name the source.
    label?: Label[];
    soundFile?: string;
    listingOrder: number;
}

interface CrosslingualModule extends LexicographicResource {
    translationLanguagae?: TranslationLanguage[];
}

interface TranslationLanguage {
    langCode: string;
    // The IETF language code of the language.
    listingOrder: number;
    //  Sets the order in which translations (of headwords and examples) should be shown.
    // It outranks the listing order given in headwordTranslation, headwordExplanation
    // and exampleTranslation objects.
}

interface CrosslingualSense extends Sense {
    headwordExplanation?: HeadwordExplanation[];
    headwordTranslation?: HeadwordTranslation[];
}

// type BaseEntry = Omit<Entry, 'headword' | 'homographNumber' | 'sense'>;

/**
 * Represents one of possibly multiple translations of a headword.
 */
interface HeadwordTranslation
    extends Omit<Entry, 'headword' | 'homographNumber' | 'sense'> {
    // id ?: UUID;
    text: string;

    // (zero or one) if only one translation language exists in the lexicographic resource,
    // required (exactly one) otherwise.
    langCode?: string; // see GranslationLanguage
    // IETF language tag. Indicates the language of this translation.
    // The translationLanguage datatype can be used to explain the meaning of the
    // language codes that appear here and/or to constrain which language codes are allowed.
    listingOrder: number;
    // partOfSpeech ?: PartOfSpeech[];
    // label ?: Label[];
    // pronunciation ?: Pronunciation[];
    // inflectedForm ?: InflectedForm[]
}

/**
 * Represents a statement in the translation language which explains
 * (but does not translate) the meaning of the headword.
 *
 * It is assumed that there will always be a maximum of one headwordExplanation
 * per translation language in each sense. For this reason, headwordExplanation
 * does not have a listingOrder.
 */
interface HeadwordExplanation {
    id?: UUID;
    text: string;
    langCode?: string; // see TranslationLanguage
    // if only one translation language exists in the lexicographic resource,
    // required (exactly one) otherwise. IETF language tag. Indicates the language
    // in which this explana- tion is written. The translationLanguage datatype
    // can be used to explain the meaning of the language codes that appear
    // here and/or to constrain which language codes are allowed.
}

interface CrosslingualExample extends Example {
    exampleTranslation?: ExampleTranslation[];
}

interface ExampleTranslation {
    id?: UUID;
    text: string;
    langCode?: string;
    //  if only one translation language exists in the lexicographic resource, required (exactly one) otherwise. IETF language tag. Indicates the language of this translation. The translationLanguage datatype can be used to explain the meaning of the language codes that appear here and/or to constrain which language codes are allowed.
    label?: Label[];
    soundFile?: string;
    listingOrder: number;
}

interface ControllValuesLexicographicResource extends LexicographicResource {
    definitionTypeTag?: DefinitionTypeTag[];
    inflectedFormTag?: InflectedFormTag[];
    labelTag?: LabelTag[];
    labelTypeTag?: LabelTypeTag[];
    partOfSpeechTag?: PartOfSpeechTag[];
    sourceIdentityTag?: SourceIdentityTag[];
    transcriptionSchemeTag?: TranscriptionSchemeTag[];
}

interface BaseTag {
    tag: string;
    // An abbreviation, a code or some other string of text.
    // Uniqueness constraint. No two instances of X-Tag
    // in the same lexicographicResource can have the same tag.
    description?: string;
    // A human-readable description of what the tag means.
    sameAs?: SameAs[];
}

/**
 * Represents one (of many) possible values for definitionType of definition.
 */
interface DefinitionTypeTag extends BaseTag {}

interface BaseInflectedFormTag {
    forHeadwords?: boolean;
    // If present, indicates whether this tag is intended to be used
    // on the headword side of the lexicographic resource:
    // as inflectedForm of entry.
    forTranslations?: boolean;
    //  If present, indicates whether this tag is intended to be used
    // on the translation side of the lexicographic resource:
    // as headwordTranslation of headwordTranslation.
    forLanguage?: string[];
    //  If present, says that: If this tag is being used inside a
    // headwordTranslation object, then it is intended to be used
    // only inside a headwordTranslation object labelled with this
    // language.
}

interface InflectedFormTag extends BaseTag, BaseInflectedFormTag {
    forPartOfSpeech?: string[];
    /** If this tag is used as a inflectedForm of a headwordTranslation, then the headwordTranslation must have this part of speech. If this tag is used as a inflectedForm of an entry, then the entry must have this part of speech.
     */
}

interface LabelTag extends InflectedFormTag {
    typeTag?: string;
    /** An abbreviation, a code or some other string of text which identifies the type of the label, for example temporal for temporal labels (archaic, neologism etc) or dialect for labels of dialects. The LabelTypeTag object type can be used to explain the meaning of the type tags, to constrain which type tags are allowed to occur in the lexicographic resource, and to map them onto external inventories and ontologies. */
    forCollocates?: boolean;
    /** If present, indicates whether this tag is intended to be used on the collocates annotated inside examples: inside a collocateMarker object. */
}

interface LabelTypeTag extends BaseTag {}

interface PartOfSpeechTag extends BaseTag, BaseInflectedFormTag {
    forEtymology?: boolean;
    // If present, indicates whether this tag is intended to be
    // used in etymology: as PartOfSpeech of etymon.
}

interface SourceIdentityTag extends BaseTag {}

/**
 * The transcriptionSchemeTag does not have a sameAs property because
 * the tag itself - which is an IETF language tag - defines fully what
 * the tag means.
 */
interface TranscriptionSchemeTag
    extends Omit<BaseTag, 'sameas'>,
        BaseInflectedFormTag {}

/** Represents the fact that the parent object is equivalent
 * to an item available from an external authority. */
interface SameAs extends BaseUri {
    // The URI of an item in an external inventory.
}
