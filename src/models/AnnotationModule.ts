import { BaseId, Label } from './DMLex';

export interface AnnotationModule {
    entries?: {
        placeholderMarkers?: PlaceholderMarker[];
        senses?: {
            definitions?: {
                headwordMarkers?: HeadwordMarker[];
                collocateMarkers?: CollocateMarker[];
            }[];
        }[];
    }[];
}

/** Marks up a substring inside a headword or inside a headword translation which is not part of the expression itself but stands for things that can take its place. An application can use the inline markup to format the placeholders differently from the rest of the text, to ignore the placeholder in full-text search, and so on. */
export interface PlaceholderMarker {
    /**
     * These are only suggested attributes:
     *
     * startIndex: number
     * endIndex: number
     */
}

// TODO
/**
 * Extends the headwordTranslation object type from the Crosslingual module.
Additional properties
• placeholderMarker optional (zero or more)
 */

/** Marks up a substring inside an example, inside an example translation or inside a definition which corresponds to the headword (or to a translation of the headword). An application can use the inline markup to highlight the occurrence of the headword for human readers through formatting.  */
export interface HeadwordMarker {
    /**
     * These are only suggested attributes:
     *
     * startIndex: number
     * endIndex: number
     */
}

/** Marks up a substring other than the headword inside an example, inside an example translation or inside a definition. An application can use the inline markup to highlight collocates or constituents. */
export interface CollocateMarker extends BaseId {
    lemma?: string;
    // The lemmatized form of the collocate.
    label?: Label[];
    // Can be used to communicate facts about the role or type of the item in the sentence, for example its syntactic role (subject, direct object etc.), its semantic role (agent, affected etc) or its semantic type (human, institution etc.) The labelTag object type can be used to explain and/or constrain the collocate labels that are allowed to appear in the lexicographic resource.
}
