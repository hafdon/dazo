import {
    type PartOfSpeech,
    type Entry,
    type Sense,
    type Definition,
    type BaseId,
    type UUID,
    type Label,
    type Pronunciation,
    type InflectedForm,
    type Transcription,
    type Example,
    type LexicographicResource,
} from './DMLex';
import { type CrosslingualModule } from './CrosslingualModule';
import {
    RelationTypeTypesTest,
    RelationTypeTypesUniqueTest,
} from './LinkingModule';

class PartOfSpeechClass implements PartOfSpeech {
    listingOrder?: number;
    tag: PartOfSpeechTagType;

    constructor(args) {
        this.tag = args.tag;
        this.listingOrder = args.listingOrder ?? null;
    }
}
class IdClass implements Required<BaseId> {
    id: UUID;

    constructor() {
        this.id = uuidv4();
    }
}
export class DazoSenseClass
    extends IdClass
    implements Sense, CrosslingualModuleSense
{
    listingOrder?: number;
    indicator?: string;
    labels?: Label[];
    definitions?: Definition[];
    examples?: Example[];
    headwordExplanations?: HeadwordExplanation[];
    headwordTranslations?: HeadwordTranslation[];

    constructor(args: Omit<DazoSenseClass, 'id'>) {
        super();
        this.listingOrder = args.listingOrder ?? null;
        this.indicator = args.indicator ?? null;
        this.labels = args.labels ?? [];
        this.definitions = args.definitions ?? [];
        this.examples = args.examples ?? [];
        this.headwordExplanations = args.headwordExplanations ?? [];
        this.headwordTranslations = args.headwordTranslations ?? [];
    }
}
export class DefinitionClass extends IdClass implements Definition {
    listingOrder?: number;
    text: string;
    definitionType?: DefinitionTypeTagType;

    constructor(args: Omit<Definition, 'id'>) {
        super();
        this.text = args.text;
        this.definitionType = args.definitionType ?? null;
    }
}
export class InflectedFormClass extends IdClass implements InflectedForm {
    tag?: never;
    text: string;
    labels?: Label[];
    pronunciations?: Pronunciation[];
    listingOrder?: number;
    constructor(args: Omit<InflectedForm, 'id'>) {
        super();
        this.tag = args.tag ?? null;
        this.text = args.text;
        this.labels = args.labels ?? [];
        this.pronunciations = args.pronunciations ?? [];
        this.listingOrder = args.listingOrder ?? null;
    }
}
export class LabelClass implements Label {
    tag: LabelTagType;
    listingOrder?: number;

    constructor(args: Omit<Label, 'id'>) {
        this.listingOrder = args.listingOrder ?? null;
        this.tag = args.tag;
    }
}
export class PronunciationClass extends IdClass implements Pronunciation {
    listingOrder?: number;
    soundFile?: string;
    transcriptions?: Transcription[];
    labels?: Label[];

    constructor(args: Omit<Pronunciation, 'id'>) {
        super();
        this.listingOrder = args.listingOrder ?? null;
        this.soundFile = args.soundFile ?? null;
        this.transcriptions = args.transcriptions ?? [];
        this.labels = args.labels ?? [];
    }
}
export class TranscriptionClass extends IdClass implements Transcription {
    listingOrder?: number;
    text: string;
    scheme?: TranscriptionSchemeTagType;

    constructor(args: Omit<Transcription, 'id'>) {
        super();
        this.text = args.text;
        this.listingOrder = args.listingOrder ?? null;
        this.scheme = args.scheme ?? null;
    }
}
export class ExampleClass extends IdClass implements Example {
    listingOrder?: number;
    text: string;
    sourceIdentity?: string;
    sourceElaboration?: string;
    labels?: Label[];
    soundFile?: string;

    constructor(args: Omit<Example, 'id'>) {
        super();
        this.text = args.text;
        this.sourceIdentity = args.sourceIdentity ?? null;
        this.sourceElaboration = args.sourceElaboration ?? null;
        this.labels = args.labels ?? [];
        this.soundFile = args.soundFile ?? null;
        this.listingOrder = args.listingOrder ?? null;
    }
}

export class EntryClass extends IdClass implements Entry {
    headword: string;
    homographNumber?: number;
    partsOfSpeech?: PartOfSpeech[];
    labels?: Label[];
    pronunciations?: Pronunciation[];
    inflectedForms?: InflectedForm[];
    senses?: Sense[];

    constructor(args: Omit<Entry, 'id'>) {
        super();
        this.headword = args.headword;
        this.homographNumber = args.homographNumber ?? null;
        this.partsOfSpeech = args.partsOfSpeech ?? [];
        this.labels = args.labels ?? [];
        this.pronunciations = args.pronunciations ?? [];
        this.inflectedForms = args.inflectedForms ?? [];
        this.senses = args.senses ?? [];
    }
}

export class EtymonClass extends IdClass implements Etymon {
    when?: string;
    type?: EtymonTypeType;
    note?: string;
    etymonUnits: EtymonUnit[];
    translation?: string;
    listingOrder?: number;

    constructor(args: Omit<Etymon, 'id'>) {
        super();
        this.when = args.when ?? null;
        this.type = args.type ?? null;
        this.note = args.note ?? null;
        this.etymonUnits = args.etymonUnits ?? [];
        this.translation = args.translation ?? null;
        this.listingOrder = args.listingOrder ?? null;
    }
}

export class EtymologyClass extends IdClass implements Etymology {
    description?: string;
    etymons?: Etymon[];
    listingOrder?: number;

    constructor(args: Omit<Etymology, 'id'>) {
        super();
        this.description = args.description ?? null;
        this.etymons = args.etymons ?? [];
        this.listingOrder = args.listingOrder ?? null;
    }
}

export class MemberClass implements Member {
    memberId: UUID; // FK to an IdClass.id
    role?: MemberTypeRoleType;
    obverseListingOrder: number;
    listingOrder?: number;

    constructor(args: Member) {
        this.memberId = args.memberId;
        this.role = args.role ?? null;
        this.obverseListingOrder = args.obverseListingOrder;
        this.listingOrder = args.listingOrder ?? null;
    }
}

export class RelationClass extends IdClass implements Relation {
    members: [Member, Member, ...Member[]];
    type: RelationTypeTypes;
    description?: string;

    constructor(args: Omit<Relation, 'id'>) {
        super();
        this.members = args.members;
        this.type = args.type as RelationTypeTypes;
        this.description = args.description ?? null;
    }
}

export class RelationTypeClass implements RelationType {
    type: string;
    scopeRestriction?: ScopeRestrictionType;
    memberTypes?: MemberType[];
    sameAs?: SameAs[];
    description?: string;

    constructor(args: RelationType) {
        this.type = args.type;
        this.scopeRestriction = args.scopeRestriction ?? null;
        this.memberTypes = args.memberTypes ?? [];
        this.sameAs = args.sameAs ?? [];
        this.description = args.description ?? null;
    }
}

export class MemberTypeClass implements MemberType {
    role: MemberTypeRoleType;
    type: MemberTypeType;
    description?: string;
    min?: number;
    max?: number;
    hint?: MemberTypeHint;
    sameAs?: SameAs[];

    constructor(args) {
        this.role = args.role as never;
        this.type = args.type;
        this.description = args.description ?? null;
        this.min = args.min ?? null;
        this.max = args.max ?? null;
        this.hint = args.hint ?? null;
        this.sameAs = args.sameAs ?? [];
    }
}

export const POS = {
    NounMasc: new PartOfSpeechClass({
        tag: 'noun-m',
    }),
    Preposition: new PartOfSpeechClass({
        tag: 'prep',
    }),
};

export const LABEL = {
    Locational: new LabelClass({ tag: 'Locational' }),
};

const a = {
    id: 1,
    headword: 'ar fud',
    freq: '3100+',
    listings: [
        {
            title: 'ar fud',
            partOfSpeech: ['⎄ [location]', 'prep'],
            grammar: ['[⇉Ɣ noun]'],
            etym: ['fud (in phrase) ar fud'],
            senses: {
                enumerated: [
                    {
                        gloss: '',
                        examples: [
                            {
                                gaelic: '',
                            },
                        ],
                    },
                ],
            },
        },
    ],
};

const ar_fud = new EntryClass({
    headword: 'ar fud',
    partsOfSpeech: [POS.Preposition],
    labels: [LABEL.Locational],
    etymologies: [],
    senses: [
        new DazoSenseClass({
            definitions: [
                new DefinitionClass({
                    text: 'throughout, among, all over',
                }),
            ],
            indicator: null,
            labels: [],
            examples: [
                new ExampleClass({
                    text: 'ar fud na tíre',
                    sourceIdentity: SITT.FGB,
                    //  béarla: 'all over the country',
                }),
            ],
        }),
    ],
} as EtymologyEntry);

const teagasc = new EntryClass({
    headword: 'teagasc',
    partsOfSpeech: [POS.NounMasc],
    labels: [],
    pronunciations: [],
    inflectedForms: [],
    senses: [
        new DazoSenseClass({
            definitions: [
                new DefinitionClass({
                    text: 'doctrine, body of teaching; belief, principles',
                }),
                new DefinitionClass({
                    text: 'teaching, education; tutoring',
                    definitionType: 'Education',
                }),
            ],
        }),
    ],
});

const ENTRIES: Entry[] = [ar_fud, teagasc];

export class TranslationLanguageClass implements TranslationLanguage {
    langCode: IETFLanguageTag;
    listingOrder?: number;

    constructor(
        args: Omit<TranslationLanguage, 'langCode'> & {
            langCode: IETFLanguageTag;
        }
    ) {
        this.langCode = args.langCode;
        this.listingOrder = args.listingOrder ?? null;
    }
}

export type LangCodeType = 'EN' | 'GA';

export class DazoDictionary
    implements LexicographicResource, LinkingModule, CrosslingualModule
{
    langCode: LangCodeType = 'GA';
    title?: string = 'Dazo Dictionary';
    uri: string = uuidv4();

    entries?: Entry[];
    relations?: Relation[];
    relationTypes?: RelationType[];
    translationLanguages?: TranslationLanguage[];

    constructor(args: Omit<DazoDictionary, 'uri' | 'title' | 'langCode'>) {
        this.translationLanguages = args.translationLanguages ?? [];
        this.relations = args.relations ?? [];
        this.relationTypes = args.relationTypes ?? [];
        this.entries = args.entries ?? [];
    }
}

// Not yet compliant with RelationType[]
const RELATION_TYPES = [
    {
        type: 'synonyms', // has to match a Relation.type
        description: 'synonyms and near synonyms', // describes the RelationType.type
        scopeRestriction: 'blah',
        memberTypes: [
            {
                // 'type' options are from MemberTypeType ["sense" | "entry" | "collocate"]
                // note: "collocate" is interface CollocateMarker
                type: 'sense',
                min: 2,
                hint: 'navigate',
            },
        ],
        sameAs: [],
    } as const,
    {
        type: 'phrase', // has to match a Relation.type
        description: 'synonyms and near synonyms', // describes the RelationType.type
        memberTypes: [
            {
                // 'type' options are from MemberTypeType ["sense" | "entry" | "collocate"]
                // note: "collocate" is interface CollocateMarker
                type: 'sense',
                min: 2,
                hint: 'navigate',
            },
        ],
    } as const,
];

type Flatten<T> = T extends Array<infer X> ? X : T;
type ValueOf<T> = T[keyof T];
type RelationTypeTypes = ValueOf<Pick<Flatten<typeof RELATION_TYPES>, 'type'>>;

type DazoRelation = Omit<Relation, 'type'> & { type: RelationTypeTypes };

const RELATIONS: DazoRelation[] = [
    new RelationClass({
        members: [
            new MemberClass({
                memberId: 'ar_fud',
                obverseListingOrder: 0,
            }),
            new MemberClass({
                memberId: 'fud',
                obverseListingOrder: 1,
            }),
        ],
        type: 'phrase',
    }),
];

const lex = new DazoDictionary({
    translationLanguages: [
        new TranslationLanguageClass({
            langCode: IETF.EN,
            listingOrder: 0,
        }),
    ],
    entries: ENTRIES,
    relations: RELATIONS,
    relationTypes: [RELATION_TYPES] as unknown as RelationType[],
});

console.dir(lex, { depth: 10 });

console.dir(JSON.parse(JSON.stringify(lex)), { depth: 10 });

const test1 = RelationTypeTypesTest(RELATION_TYPES, RELATIONS);
console.log('test1', test1.length === 0 ? true : test1);

const test2 = RelationTypeTypesUniqueTest(RELATION_TYPES);
console.log('test2', test2);

export default lex;
