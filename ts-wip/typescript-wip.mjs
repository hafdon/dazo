/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/***************************************
 * 4.3 DMLex Linking Module
 ***************************************/
/**
 * @returns array of when relations array has a type that is not
 * set in relationTypes array
 */
function RelationTypeTypesTest(relationTypes, relations) {
    var allowedTypes = new Set(relationTypes.map(function (_a) {
        var type = _a.type;
        return type;
    }));
    var violations = relations.reduce(function (accum, curr) {
        if (!allowedTypes.has(curr.type)) {
            accum.push(curr.type);
        }
        return accum;
    }, []);
    return violations;
}
// if a set of unique items is not the same length as the
// array, it means there is at least one duplicate
function RelationTypeTypesUniqueTest(relationTypes) {
    // const a = relationTypes.map((r) => r.type);
    // const b = new Set(a);
    // const c = Array.from(b);
    // console.log({ a, b, c });
    return (relationTypes.length ===
        Array.from(new Set(relationTypes.map(function (r) { return r.type; }))).length);
}

function uuidv4() {
    // import { v4 as uuidv4 } from 'uuid';
    return Math.random().toString().slice(2);
}
var PartOfSpeechClass = /** @class */ (function () {
    function PartOfSpeechClass(args) {
        var _a;
        this.tag = args.tag;
        this.listingOrder = (_a = args.listingOrder) !== null && _a !== void 0 ? _a : null;
    }
    return PartOfSpeechClass;
}());
var IdClass = /** @class */ (function () {
    function IdClass() {
        this.id = uuidv4();
    }
    return IdClass;
}());
var DazoSenseClass = /** @class */ (function (_super) {
    __extends(DazoSenseClass, _super);
    function DazoSenseClass(args) {
        var _a, _b, _c, _d, _e, _f, _g;
        var _this = _super.call(this) || this;
        _this.listingOrder = (_a = args.listingOrder) !== null && _a !== void 0 ? _a : null;
        _this.indicator = (_b = args.indicator) !== null && _b !== void 0 ? _b : null;
        _this.labels = (_c = args.labels) !== null && _c !== void 0 ? _c : [];
        _this.definitions = (_d = args.definitions) !== null && _d !== void 0 ? _d : [];
        _this.examples = (_e = args.examples) !== null && _e !== void 0 ? _e : [];
        _this.headwordExplanations = (_f = args.headwordExplanations) !== null && _f !== void 0 ? _f : [];
        _this.headwordTranslations = (_g = args.headwordTranslations) !== null && _g !== void 0 ? _g : [];
        return _this;
    }
    return DazoSenseClass;
}(IdClass));
var DefinitionClass = /** @class */ (function (_super) {
    __extends(DefinitionClass, _super);
    function DefinitionClass(args) {
        var _a;
        var _this = _super.call(this) || this;
        _this.text = args.text;
        _this.definitionType = (_a = args.definitionType) !== null && _a !== void 0 ? _a : null;
        return _this;
    }
    return DefinitionClass;
}(IdClass));
var InflectedFormClass = /** @class */ (function (_super) {
    __extends(InflectedFormClass, _super);
    function InflectedFormClass(args) {
        var _a, _b, _c, _d;
        var _this = _super.call(this) || this;
        _this.tag = (_a = args.tag) !== null && _a !== void 0 ? _a : null;
        _this.text = args.text;
        _this.labels = (_b = args.labels) !== null && _b !== void 0 ? _b : [];
        _this.pronunciations = (_c = args.pronunciations) !== null && _c !== void 0 ? _c : [];
        _this.listingOrder = (_d = args.listingOrder) !== null && _d !== void 0 ? _d : null;
        return _this;
    }
    return InflectedFormClass;
}(IdClass));
var LabelClass = /** @class */ (function () {
    function LabelClass(args) {
        var _a;
        this.listingOrder = (_a = args.listingOrder) !== null && _a !== void 0 ? _a : null;
        this.tag = args.tag;
    }
    return LabelClass;
}());
var PronunciationClass = /** @class */ (function (_super) {
    __extends(PronunciationClass, _super);
    function PronunciationClass(args) {
        var _a, _b, _c, _d;
        var _this = _super.call(this) || this;
        _this.listingOrder = (_a = args.listingOrder) !== null && _a !== void 0 ? _a : null;
        _this.soundFile = (_b = args.soundFile) !== null && _b !== void 0 ? _b : null;
        _this.transcriptions = (_c = args.transcriptions) !== null && _c !== void 0 ? _c : [];
        _this.labels = (_d = args.labels) !== null && _d !== void 0 ? _d : [];
        return _this;
    }
    return PronunciationClass;
}(IdClass));
var TranscriptionClass = /** @class */ (function (_super) {
    __extends(TranscriptionClass, _super);
    function TranscriptionClass(args) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this.text = args.text;
        _this.listingOrder = (_a = args.listingOrder) !== null && _a !== void 0 ? _a : null;
        _this.scheme = (_b = args.scheme) !== null && _b !== void 0 ? _b : null;
        return _this;
    }
    return TranscriptionClass;
}(IdClass));
var ExampleClass = /** @class */ (function (_super) {
    __extends(ExampleClass, _super);
    function ExampleClass(args) {
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this) || this;
        _this.text = args.text;
        _this.sourceIdentity = (_a = args.sourceIdentity) !== null && _a !== void 0 ? _a : null;
        _this.sourceElaboration = (_b = args.sourceElaboration) !== null && _b !== void 0 ? _b : null;
        _this.labels = (_c = args.labels) !== null && _c !== void 0 ? _c : [];
        _this.soundFile = (_d = args.soundFile) !== null && _d !== void 0 ? _d : null;
        _this.listingOrder = (_e = args.listingOrder) !== null && _e !== void 0 ? _e : null;
        return _this;
    }
    return ExampleClass;
}(IdClass));
var EntryClass = /** @class */ (function (_super) {
    __extends(EntryClass, _super);
    function EntryClass(args) {
        var _a, _b, _c, _d, _e, _f;
        var _this = _super.call(this) || this;
        _this.headword = args.headword;
        _this.homographNumber = (_a = args.homographNumber) !== null && _a !== void 0 ? _a : null;
        _this.partsOfSpeech = (_b = args.partsOfSpeech) !== null && _b !== void 0 ? _b : [];
        _this.labels = (_c = args.labels) !== null && _c !== void 0 ? _c : [];
        _this.pronunciations = (_d = args.pronunciations) !== null && _d !== void 0 ? _d : [];
        _this.inflectedForms = (_e = args.inflectedForms) !== null && _e !== void 0 ? _e : [];
        _this.senses = (_f = args.senses) !== null && _f !== void 0 ? _f : [];
        return _this;
    }
    return EntryClass;
}(IdClass));
var EtymonClass = /** @class */ (function (_super) {
    __extends(EtymonClass, _super);
    function EtymonClass(args) {
        var _a, _b, _c, _d, _e, _f;
        var _this = _super.call(this) || this;
        _this.when = (_a = args.when) !== null && _a !== void 0 ? _a : null;
        _this.type = (_b = args.type) !== null && _b !== void 0 ? _b : null;
        _this.note = (_c = args.note) !== null && _c !== void 0 ? _c : null;
        _this.etymonUnits = (_d = args.etymonUnits) !== null && _d !== void 0 ? _d : [];
        _this.translation = (_e = args.translation) !== null && _e !== void 0 ? _e : null;
        _this.listingOrder = (_f = args.listingOrder) !== null && _f !== void 0 ? _f : null;
        return _this;
    }
    return EtymonClass;
}(IdClass));
var EtymologyClass = /** @class */ (function (_super) {
    __extends(EtymologyClass, _super);
    function EtymologyClass(args) {
        var _a, _b, _c;
        var _this = _super.call(this) || this;
        _this.description = (_a = args.description) !== null && _a !== void 0 ? _a : null;
        _this.etymons = (_b = args.etymons) !== null && _b !== void 0 ? _b : [];
        _this.listingOrder = (_c = args.listingOrder) !== null && _c !== void 0 ? _c : null;
        return _this;
    }
    return EtymologyClass;
}(IdClass));
var MemberClass = /** @class */ (function () {
    function MemberClass(args) {
        var _a, _b;
        this.memberId = args.memberId;
        this.role = (_a = args.role) !== null && _a !== void 0 ? _a : null;
        this.obverseListingOrder = args.obverseListingOrder;
        this.listingOrder = (_b = args.listingOrder) !== null && _b !== void 0 ? _b : null;
    }
    return MemberClass;
}());
var RelationClass = /** @class */ (function (_super) {
    __extends(RelationClass, _super);
    function RelationClass(args) {
        var _a;
        var _this = _super.call(this) || this;
        _this.members = args.members;
        _this.type = args.type;
        _this.description = (_a = args.description) !== null && _a !== void 0 ? _a : null;
        return _this;
    }
    return RelationClass;
}(IdClass));
var RelationTypeClass = /** @class */ (function () {
    function RelationTypeClass(args) {
        var _a, _b, _c, _d;
        this.type = args.type;
        this.scopeRestriction = (_a = args.scopeRestriction) !== null && _a !== void 0 ? _a : null;
        this.memberTypes = (_b = args.memberTypes) !== null && _b !== void 0 ? _b : [];
        this.sameAs = (_c = args.sameAs) !== null && _c !== void 0 ? _c : [];
        this.description = (_d = args.description) !== null && _d !== void 0 ? _d : null;
    }
    return RelationTypeClass;
}());
var MemberTypeClass = /** @class */ (function () {
    function MemberTypeClass(args) {
        var _a, _b, _c, _d, _e;
        this.role = args.role;
        this.type = args.type;
        this.description = (_a = args.description) !== null && _a !== void 0 ? _a : null;
        this.min = (_b = args.min) !== null && _b !== void 0 ? _b : null;
        this.max = (_c = args.max) !== null && _c !== void 0 ? _c : null;
        this.hint = (_d = args.hint) !== null && _d !== void 0 ? _d : null;
        this.sameAs = (_e = args.sameAs) !== null && _e !== void 0 ? _e : [];
    }
    return MemberTypeClass;
}());
var POS = {
    NounMasc: new PartOfSpeechClass({
        tag: 'noun-m',
    }),
    Preposition: new PartOfSpeechClass({
        tag: 'prep',
    }),
};
var LABEL = {
    Locational: new LabelClass({ tag: 'Locational' }),
};
var ar_fud = new EntryClass({
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
});
var teagasc = new EntryClass({
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
var ENTRIES = [ar_fud, teagasc];
var TranslationLanguageClass = /** @class */ (function () {
    function TranslationLanguageClass(args) {
        var _a;
        this.langCode = args.langCode;
        this.listingOrder = (_a = args.listingOrder) !== null && _a !== void 0 ? _a : null;
    }
    return TranslationLanguageClass;
}());
var DazoDictionary = /** @class */ (function () {
    function DazoDictionary(args) {
        var _a, _b, _c, _d;
        this.langCode = 'GA';
        this.title = 'Dazo Dictionary';
        this.uri = uuidv4();
        this.translationLanguages = (_a = args.translationLanguages) !== null && _a !== void 0 ? _a : [];
        this.relations = (_b = args.relations) !== null && _b !== void 0 ? _b : [];
        this.relationTypes = (_c = args.relationTypes) !== null && _c !== void 0 ? _c : [];
        this.entries = (_d = args.entries) !== null && _d !== void 0 ? _d : [];
    }
    return DazoDictionary;
}());
// Not yet compliant with RelationType[]
var RELATION_TYPES = [
    {
        type: 'synonyms',
        description: 'synonyms and near synonyms',
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
    },
    {
        type: 'phrase',
        description: 'synonyms and near synonyms',
        memberTypes: [
            {
                // 'type' options are from MemberTypeType ["sense" | "entry" | "collocate"]
                // note: "collocate" is interface CollocateMarker
                type: 'sense',
                min: 2,
                hint: 'navigate',
            },
        ],
    },
];
var RELATIONS = [
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
var lex = new DazoDictionary({
    translationLanguages: [
        new TranslationLanguageClass({
            langCode: IETF.EN,
            listingOrder: 0,
        }),
    ],
    entries: ENTRIES,
    relations: RELATIONS,
    relationTypes: [RELATION_TYPES],
});
console.dir(lex, { depth: 10 });
console.dir(JSON.parse(JSON.stringify(lex)), { depth: 10 });
var test1 = RelationTypeTypesTest(RELATION_TYPES, RELATIONS);
console.log('test1', test1.length === 0 ? true : test1);
var test2 = RelationTypeTypesUniqueTest(RELATION_TYPES);
console.log('test2', test2);

export { DazoDictionary, DazoSenseClass, DefinitionClass, EntryClass, EtymologyClass, EtymonClass, ExampleClass, InflectedFormClass, LABEL, LabelClass, MemberClass, MemberTypeClass, POS, PronunciationClass, RelationClass, RelationTypeClass, TranscriptionClass, TranslationLanguageClass, lex as default };
