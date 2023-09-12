export type URI = string;

export interface BaseUri {
    uri: URI;
}

/** Represents the fact that the parent object is equivalent
 * to an item available from an external authority. */
export interface SameAs
    // The URI of an item in an external inventory.
    extends BaseUri {}
