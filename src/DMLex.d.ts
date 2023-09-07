type UUID = string;

interface BaseUri {
    uri: string;
}

interface BaseId {
    id?: UUID;
}

interface BaseListingOrder {
    listingOrder: number;
    // This can be implicit from the serialization.
}

interface LexicographicResource extends BaseUri {
    langCode: string;
    title?: string;
    entry?: Entry[]; // entries
}

interface Entry extends BaseId {
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
interface PartOfSpeech extends BaseListingOrder {
    tag: string; // see PartOfSpeechTag
    // egs. "n" (noun); "v" (verb); "adj" (adjective)
}

/**
 * The inflectedForm object type is intended to model the inflectional morphology
 * of a headword. To model derivational morphology, for example feminine forms of
 * masculine nouns, the recommended way to do that in DMLex is to create separate
 * entries for the two words, and link them using the Linking Module.
 */
interface InflectedForm
    extends BaseId,
        // listingOrder defines:
        // The position of this inflected form among other inflected forms
        // of the same entry.
        BaseListingOrder {
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
interface Sense extends BaseId, BaseListingOrder {
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
interface Definition extends BaseId, BaseListingOrder {
    text: string;
    // A statement, in the same language as the headword, that describes and/or explains
    // the meaning of a sense. In DMLex, the term definition encompasses not only formal
    // definitions, but also less formal explanations.
    definitionType?: string; // see DefinitionTypeTag
    // If a sense contains multiple definitions, indicates the difference
    // between them, for example that they are intended for different
    // audiences. The definitionTypeTag object type can be used to
    // constrain and/or explain the definition types that occur
    // in the lexicographic resource.
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
interface Label extends BaseListingOrder {
    tag: string; // see LabelTag
    // An abbreviation, a code or some other string of text which identifies the label,
    // for example neo for neologism, colloq for colloquial, polit for politics.
    // The labelTag object type can be used to explain the meaning of the labels,
    // to constrain which labels are allowed to occur in the lexicographic resource,
    // and to map them onto external inventories and ontologies.
}

interface Pronunciation extends BaseId, BaseListingOrder {
    // At least one of:
    soundFile?: string;
    transcription?: Transcription[];
    label?: Label[];
}

interface Transcription extends BaseId, BaseListingOrder {
    text: string;
    scheme?: string; // see TranscriptionSchemeTag
    // IETF language tag. Identifies the transcription scheme used here.
    // Example: en-fonipa for English IPA. This can be implicit if the lexicographic
    // resource uses only one transcription scheme throughout. The transcriptionSchemeTag
    // object type can be used to define which transcription schemes are allowed in
    // the lexicographic resource.
}

interface Example extends BaseId, BaseListingOrder {
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
}

interface CrosslingualModule extends LexicographicResource {
    translationLanguagae?: TranslationLanguage[];
}

interface TranslationLanguage
    //  Sets the order in which translations (of headwords and examples)
    // should be shown. It outranks the listing order given in
    // headwordTranslation, headwordExplanation and exampleTranslation
    // objects.
    extends BaseListingOrder {
    langCode: string;
    // The IETF language code of the language.
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
interface HeadwordExplanation extends BaseId {
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

interface ExampleTranslation extends BaseId {
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

interface LinkingLexicographicResource extends LexicographicResource {
    relation?: Relation[]; // relations
    relationType?: RelationType[]; // relationTypes
}

interface BaseRelation {
    type: string;
    /** Specifies what type of relation it is, for example a relation between synonyms or a relation between a sense and a subsense. Optionally, relation- Type objects can be used to explain those types and to constrain which types of relations are al- lowed to exist in the lexicographic resource. */
    description?: string;
    // A human-readable explanation of this re- lation.
}

interface Relation extends BaseId, BaseRelation {
    member: [Member, Member, ...Member[]]; // the minimum is 2 Members
}

interface Member
    /** The position of this member among other members of the same relation. When showing members of the relation to human users (for example: when listing the synonyms in a synonymy relation), the members should be listed in this order. This can be implicit from the serialization. */
    extends BaseListingOrder {
    memberId: UUID;
    // the ID of an object
    role?: string;
    /** An indication of the role the member has in this relation: whether it is the hypernym or the hyponym (in a hyperonymy/hyponymy relation), or whether it is one of the synonyms (in a synonymy relation), and so on. You can use memberType objects to explain those roles and to constrain which relations are allowed to contain which roles, what their object types are allowed to be (eg. entries or senses) and how many members with this role each relation is allowed to have. */

    obverseListingOrder: number;
    /** The position of this relation among other relations this member is involved in. When an object - such as an entry or a sense - is a member of several relations (for example: when a sense is a member of a synonymy relation and also of an antonymy relation) then, when showing the object (the entry or the sense) to human users, the relations should be listed in this order (for example: the synonyms first, the antonyms second). */
}

type ScopeRestrictionType = 'sameEntry' | 'sameResource' | 'any';

/** Represents one of possible values for the type of relation. */
interface RelationType extends BaseRelation {
    scopeRestriction?: ScopeRestrictionType;
    memberType?: MemberType[];
    sameAs?: SameAs[];
}

/** Represents one of possible values for the role of member,
 * as well as various restrictions on members having this role.
 * */
interface MemberType {
    role: string;
    //  If the value is empty, then members having this role do not need to have a role property.
    // No two instances of memberTYpe in the same relationType can have the same role.
    description?: string;
    type: 'sense' | 'entry' | 'collocate';
    min?: number;
    max?: number;
    hint?: 'embed' | 'navigate' | 'none';
    sameAs?: SameAs[];
}

interface AnnotationLexicographicResource extends LexicographicResource {}

interface BasePlaceholderMarker {
    placeholderMarker?: PlaceholderMarker[];
}

interface AnnotationEntry extends Entry, BasePlaceholderMarker {}

interface AnnotationHeadwordTranslation
    extends HeadwordTranslation,
        BasePlaceholderMarker {}

/** Marks up a substring inside a headword or inside a headword translation which is not part of the ex- pression itself but stands for things that can take its place. An application can use the inline markup to format the placeholders differently from the rest of the text, to ignore the placeholder in full-text search, and so on. */
interface PlaceholderMarker {}

interface BaseAnnotationMarkers {
    headwordMarker?: HeadwordMarker[];
    collocateMarker?: CollocateMarker[];
}

interface AnnotationDefinition extends Definition, BaseAnnotationMarkers {}

interface AnnotationExample extends Example, BaseAnnotationMarkers {}

interface AnnotationExampleTranslation
    extends ExampleTranslation,
        BaseAnnotationMarkers {}

/** Marks up a substring inside an example, inside an example translation or inside a definition which corresponds to the headword (or to a translation of the headword). An application can use the inline markup to highlight the occurrence of the headword for human readers through formatting.  */
interface HeadwordMarker {}

/** Marks up a substring other than the headword inside an example, inside an example translation or inside a definition. An application can use the inline markup to highlight collocates or constituents. */
interface CollocateMarker extends BaseId {
    lemma?: string;
    // The lemmatized form of the collocate.
    label?: Label[];
    // Can be used to communicate facts about the role or type of the item in the sentence, for example its syntactic role (subject, direct object etc.), its semantic role (agent, affected etc) or its semantic type (human, institution etc.) The labelTag object type can be used to explain and/or constrain the collocate labels that are allowed to appear in the lexicographic resource.
}

/***********************************
 * Etymology Module
 ***********************************/

interface EtymologyEntry extends Entry {
    etymology?: Etymology[];
    /**
     * If an entry can contains more than one etymology object, then the different etymology objects represent different hypotheses about the origin of the headword.
     */
}

interface Etymology extends BaseId, BaseListingOrder {
    description?: string;
    etymon?: Etymon[];
}

/**
 * Represents one stage (of possibly several) in the
 * etymological history of the headword.
 */
interface Etymon extends BaseId, BaseListingOrder {
    when?: string;
    type?: string;
    // The values can be ex- plained and constrained using the EtymonType object type.
    note?: string;
    etymonUnit: EtymonUnit[];
    translation?: string;
}

/**
 * Represents a form (typically a word) which is the etymological
 * origin of the headword, or another etymologically related form.
 */
interface EtymonUnit extends BaseId, BaseListingOrder {
    // langCode: string;
    langCode: EtymonLanguageLangCodesType;
    // An IETF tag. The tags can be explained and constrained using the etymonLanguage object type.
    text: string;
    reconstructed?: boolean;
    partOfSpeech?: PartOfSpeech[];
    translation?: string;
}

interface EtymonModule {
    etymonLanguage?: EtymonLanguage[];
    etymonType?: EtymonType[];
}

interface EtymonLexicographicResources
    extends LexicographicResource,
        EtymonModule {}

interface EtymonType {
    type: string;
    description?: string;
}

const EtymonLanguageLangCodes = ['one', 'two'] as const;
type EtymonLanguageLangCodesType = (typeof EtymonLanguageLangCodes)[number];

/**
 * Represents one of several allowed values for the language property of etymonUnit objects.
 */
interface EtymonLanguage {
    // Etymologies frequently refer to languages that are not covered by ISO standards.
    // It may be necessary to avail of private-use subtags when composing IETF language tags
    // for etymology, and to explain their meaning in the displayName.
    langCode: EtymonLanguageLangCodesType;
    displayName?: string;
}

const etymonLanguage1: EtymonLanguage = {
    langCode: 'one',
    displayName: 'Language Code 1',
};
