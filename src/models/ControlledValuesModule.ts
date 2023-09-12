/**
 * Treating controlled values as constraints in an implementation of
 * DMLex, for example as business rules in a dictionary-writing system,
 * is optional.
 */

import { SameAs } from './Uri';
import { PartOfSpeech } from './DMLex';
import { TranslationLanguage } from './CrosslingualModule';

export interface ControlledValuesModule {
    definitionTypeTag?: DefinitionTypeTag[];
    inflectedFormTag?: InflectedFormTag[];
    labelTag?: LabelTag[];
    labelTypeTag?: LabelTypeTag[];
    partOfSpeechTag?: PartOfSpeechTag[];
    sourceIdentityTag?: SourceIdentityTag[];
    transcriptionSchemeTag?: TranscriptionSchemeTag[];
}

type DefinitionTypeTagType = string;
//const DefinitionTypeTagTypes = ['Education'] as const;
//export type DefinitionTypeTagType = (typeof DefinitionTypeTagTypes)[number];

/**
 * Represents one (of many) possible values for definitionType of definition.
 */
export interface DefinitionTypeTag extends BaseTag {
    // Non-empty string. An abbreviation, a code or some other string of text. Uniqueness constraint. No two instances of definitionTypeTag in the same lexicographicResource can have the same tag.
    // narrow BaseTag.tag type string
    tag: DefinitionTypeTagType; // OPTIONAL OR REQUIRED?
}

export interface LabelTag {
    tag: LabelTagType;

    typeTag?: LabelTypeTagType;
    /** An abbreviation, a code or some other string of text which identifies the type of the label, for example temporal for temporal labels (archaic, neologism etc) or dialect for labels of dialects. The LabelTypeTag object type can be used to explain the meaning of the type tags, to constrain which type tags are allowed to occur in the lexicographic resource, and to map them onto external inventories and ontologies. */

    forHeadwords?: boolean;
    /**
     * If present, indicates whether this tag is intended to
     * be used on the translation side of the lexicographic
     * resource: as headwordTranslation of headwordTranslation.
     */
    forTranslations?: boolean;
    /** If present, indicates whether this tag is intended to
     * be used on the collocates annotated inside examples:
     * inside a collocateMarker object. */
    forCollocates?: boolean;
    /**
     * If present, says that if this tag is being used inside
     * a head- wordTranslation object, then it is intended to
     * be used only inside a headwordTranslation object
     * labelled with this language.
     */
    forLanguages?: TranslationLanguage[];
    // example has langCode as attribute

    /**
     * If present, says that:
        • If this tag is used inside a headwordTranslation, then it is intended to be used only inside a
        headwordTranslation labelled with this part of speech.
        • If this tag is used outside a headwordTranslation, then it is intended to be used only inside
        entries that are labelled with this part of speech.
     */
    forPartOfSpeech?: PartOfSpeech[]; // I'm guessing at type

    sameAs?: SameAs[];
}

const TranscriptionSchemeTagTypes = [] as const;
export type TranscriptionSchemeTagType =
    (typeof TranscriptionSchemeTagTypes)[number];

/**
 * The transcriptionSchemeTag does not have a sameAs property because
 * the tag itself - which is an IETF language tag - defines fully what
 * the tag means.
 */
export interface TranscriptionSchemeTag
    extends Omit<BaseTag, 'sameas'>,
        BaseInflectedFormTag {
    tag: TranscriptionSchemeTagType;
}

/*******************************
 * InflectedFormTag
 *******************************/

const InflectedFormTagTypes = [] as const;
type InflectedFormTagType = (typeof InflectedFormTagTypes)[number];

export interface InflectedFormTag extends BaseTag, BaseInflectedFormTag {
    tag: InflectedFormTagType;
    // Overwrite BaseTag `tag` property

    forPartOfSpeech?: string[];
    /** If this tag is used as a inflectedForm of a headwordTranslation, then the headwordTranslation must have this part of speech. If this tag is used as a inflectedForm of an entry, then the entry must have this part of speech.
     */
}

/**
 *
 */

const LabelTypeTagTypes = [] as const;
export type LabelTypeTagType = (typeof LabelTypeTagTypes)[number];

export interface LabelTypeTag extends BaseTag {
    tag: LabelTypeTagType;
}

// const PartOfSpeechTagTypes = ['noun-m'] as const;
// export type PartOfSpeechTagType = (typeof PartOfSpeechTagTypes)[number];

export type PartOfSpeechTagType = string;

export interface PartOfSpeechTag extends BaseTag, BaseInflectedFormTag {
    tag: PartOfSpeechTagType;

    forEtymology?: boolean;
    // If present, indicates whether this tag is intended to be
    // used in etymology: as PartOfSpeech of etymon.
}

export const SITT = {
    FGB: 'fgb',
};

const SourceIdentityTagTypes = [SITT.FGB] as const;
export type SourceIdentityTagType = (typeof SourceIdentityTagTypes)[number];

export interface SourceIdentityTag extends BaseTag {
    // An abbreviation, a code or some other string of text.
    // Uniqueness constraint. No two instances of X-Tag
    // in the same lexicographicResource can have the same tag.
    tag: SourceIdentityTagType;

    description?: string;
    // A human-readable description of what the tag means.
    sameAs?: SameAs[];
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

interface BaseInflectedFormTag {
    // If present, indicates whether this tag is intended to be used
    // on the headword side of the lexicographic resource:
    // as inflectedForm of entry.
    forHeadwords?: boolean;
    // If present, indicates whether this tag is intended to be used
    // on the translation side of the lexicographic resource:
    // as headwordTranslation of headwordTranslation.
    forTranslations?: boolean;
    // If present, says that: If this tag is being used inside a
    // headwordTranslation object, then it is intended to be used
    // only inside a headwordTranslation object labelled with this
    // language.
    forLanguage?: string[];
}
