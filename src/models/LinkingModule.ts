/***************************************
 * 4.3 DMLex Linking Module
 ***************************************/

import { SameAs } from './Uri';
import { BaseId, BaseListingOrder, UUID } from './DMLex';

export interface LinkingModule {
    relations?: Relation[]; // relations
    relationTypes?: RelationType[]; // relationTypes
}

// const RelationTypeTypes = ['Phrase'] as const;
// export type RelationTypeType = (typeof RelationTypeTypes)[number];

export type MemberMetaKey = 'members' | 'memberTypes';

export interface MemberMeta {
    role?: MemberTypeRoleType;
}

/**
 * There;s a relationship here between
 * Relation.type (RelationTypeType) and
 * the Member.role(s)
 */
export interface Relation extends BaseId {
    /** Specifies what type of relation it is, for example a relation between synonyms or a relation between a sense and a subsense. Optionally, relation-Type objects can be used to explain those types and to constrain which types of relations are allowed to exist in the lexicographic resource. */
    /**
     * type required (exactly one). Non-empty string.
        Uniqueness constraint. No two instances of relationType in the same lexicographicResource can have the same type.
     */
    type: string;
    // A human-readable explanation of this relation.
    description?: string;
    members: [Member, Member, ...Member[]]; // the minimum is 2 Members
}

export interface Member
    extends MemberMeta,
        /** The position of this member among other members of the same relation. When showing members of the relation to human users (for example: when listing the synonyms in a synonymy relation), the members should be listed in this order. This can be implicit from the serialization. */
        BaseListingOrder {
    memberId: UUID;
    // the ID of an object
    // not sure how "role" is optional
    role?: MemberTypeRoleType;
    /** An indication of the role the member has in this relation: whether it is the hypernym or the hyponym (in a hyperonymy/hyponymy relation), or whether it is one of the synonyms (in a synonymy relation), and so on. You can use memberType objects to explain those roles and to constrain which relations are allowed to contain which roles, what their object types are allowed to be (eg. entries or senses) and how many members with this role each relation is allowed to have. */

    /** The position of this relation among other relations this member is involved in. When an object - such as an entry or a sense - is a member of several relations (for example: when a sense is a member of a synonymy relation and also of an antonymy relation) then, when showing the object (the entry or the sense) to human users, the relations should be listed in this order (for example: the synonyms first, the antonyms second). */
    obverseListingOrder?: number; // seems like it's actually optional?
}

export type ScopeRestrictionType =
    // members must be within the same entry
    | 'sameEntry'
    // members must be within the same lexicographicResource
    | 'sameResource'
    // no restriction
    | 'any';

/** Represents one of possible values for the type of relation. */
export interface RelationType {
    scopeRestriction?: ScopeRestrictionType;
    memberTypes?: MemberType[];
    sameAs?: SameAs[];
    type: string;
    description?: string;
}

// const MemberTypeRoleTypes = ['dummy'] as const;
// export type MemberTypeRoleType = (typeof MemberTypeRoleTypes)[number];

export type MemberTypeRoleType = string;

export type MemberTypeType = 'sense' | 'entry' | 'collocate';
export type MemberTypeHint = 'embed' | 'navigate' | 'none';

/** Represents one of possible values for the role of member,
 * as well as various restrictions on members having this role.
 * */
export interface MemberType extends MemberMeta {
    //  If the value is empty, then members having this role do not need to have a role property.
    role: MemberTypeRoleType;
    // No two instances of memberType in the same relationType can have the same role.
    // That is, the role is the UUID within a RelationType
    description?: string;

    min?: number;
    max?: number;
    type: MemberTypeType;
    hint?: MemberTypeHint;
    sameAs?: SameAs[];
}

/**
 * @returns array of when relations array has a type that is not
 * set in relationTypes array
 */
export function RelationTypeTypesTest(relationTypes, relations: Relation[]) {
    const allowedTypes = new Set(relationTypes.map(({ type }) => type));
    const violations = relations.reduce((accum, curr) => {
        if (!allowedTypes.has(curr.type)) {
            accum.push(curr.type);
        }
        return accum;
    }, []);
    return violations;
}

// if a set of unique items is not the same length as the
// array, it means there is at least one duplicate
export function RelationTypeTypesUniqueTest(relationTypes) {
    // const a = relationTypes.map((r) => r.type);
    // const b = new Set(a);
    // const c = Array.from(b);
    // console.log({ a, b, c });

    return (
        relationTypes.length ===
        Array.from(new Set(relationTypes.map((r) => r.type))).length
    );
}
