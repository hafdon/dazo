import type {
    PartOfSpeech,
    Entry,
    Sense,
    Definition,
    DefinitionTypeTagType,
    BaseId,
    UUID,
    Label,
    Pronunciation,
    InflectedForm,
    PartOfSpeechTagType,
    LabelTagType,
    Transcription,
    TranscriptionSchemeTagType,
    Example,
    HeadwordExplanation,
    HeadwordTranslation,
    Etymology,
} from './DMLex';

function uuidv4(): UUID {
    // import { v4 as uuidv4 } from 'uuid';
    return Math.random().toString().slice(2) as UUID;
}
class PartOfSpeechClass implements PartOfSpeech {
    listingOrder?: number;
    tag: PartOfSpeechTagType;

    constructor(args) {
        this.tag = args.tag;
        this.listingOrder = args.listingOrder ?? null;
    }
}
export const posNounMasc = new PartOfSpeechClass({
    tag: 'noun-m',
});
class IdClass implements Required<BaseId> {
    id: UUID;

    constructor() {
        this.id = uuidv4();
    }
}
export class SenseClass extends IdClass implements Sense {
    listingOrder?: number;
    indicator?: string;
    labels?: Label[];
    definitions?: Definition[];
    examples?: Example[];

    constructor(args: Omit<Sense, 'id'>) {
        super();
        this.listingOrder = args.listingOrder ?? null;
        this.indicator = args.indicator ?? null;
        this.labels = args.labels ?? [];
        this.definitions = args.definitions ?? [];
        this.examples = args.examples ?? [];
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
export class CrosslingualSense extends SenseClass implements CrosslingualSense {
    headwordExplanations?: HeadwordExplanation[];
    headwordTranslations?: HeadwordTranslation[];

    constructor(args: Omit<CrosslingualSense, 'id'>) {
        super(args);
        this.headwordExplanations = args.headwordExplanations ?? [];
        this.headwordTranslations = args.headwordTranslations ?? [];
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

export class EtymologyClass extends IdClass implements Required<Etymology> {
    constructor(args: Omit<Etymology, 'id'>) {
        super();
    }
}
