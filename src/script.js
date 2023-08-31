//  <script type="text/javascript" src="_script.js"></script>

/**
 * @todo - dialog that shows other words (with clickable pronunciations) that have
 *         the same spelling, for sound comparison.
 * @todo - something like: this word has these spelling parts. they are usually
 *         pronounced like this. Do they match?
 */

function getElementById(id) {
  return document.getElementById(id);
}

const INTERVAL_INIT_DICT = 250;

const BASE_URL = {
  FUAIMEANNA_IE: "http://www.fuaimeanna.ie",
  TEANGLANN_IE: "https://www.teanglann.ie",
  LOCALHOST: "http://localhost:3001/",
};

const NOTES = {
  CUPLA: "Basic-d9c90", // card 1?
  NOUN: "noun", // card 1
  VERB: "verb",
  ADJECTIVE: "adjective",
  DICTIONARY: "dict",
};

const NOTES_USING_AUDIO_PORTAL = [
  NOTES.CUPLA,
  NOTES.NOUN,
  NOTES.VERB,
  NOTES.ADJECTIVE,
  NOTES.DICTIONARY,
];

const ENDPOINTS = {
  INTERFERES: "interferesIds",
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Dictionary = {
  eispéireas: {
    listings: [
      {
        title: "eispéireas",
        variants: ["eispéiris"],
        declensionCategory: {
          gender: "m",
          fgb: "1",
        },
        senses: {
          general: "Experience",
          predicates: ["Philosophy"],
          examples: [
            {
              gaelic: "bhí drocheispéireas aige leis na póilíní",
              béarla: "he had a bad experience with the police",
              source: "focloir.ie",
            },
          ],
          forms: [
            {
              eispéireas: "cs", // an t-eispéireas
              eispéiris: "gs", // an eispéiris
            },
          ],
        },
      },
    ],
  },

  tráchtáil: {
    listings: [
      {
        title: "tráchtáil",
        partOfSpeech: "f",
        fgbDeclension: "3",
        declensionCategory: {
          gender: "f",
          fgb: "3",
          carnieSg: null,
          carniePl: null,
        },
        senses: {
          general: "(act of) trading; trade, commerce",
          forms: [{ tráchtáil: "cs" }, { tráchtála: "gs" }],
        },
      },
    ],
  },

  "dá liacht": {
    listings: [
      {
        title: "dá liacht",
        partOfSpeech: [],
        senses: {
          general: "however many",
          examples: [
            {
              gaelic: "dá liacht uair a déarfá é",
              béarla: "no matter how many times you said it",
            },
          ],
        },
      },
    ],
  },

  "ceil ar": {
    listings: [
      {
        title: "ceil ar",
        partOfSpeech: null,
      },
    ],
  },

  luaithe: {
    freq: null,
    listings: [
      {
        title: "luaithe",
        partOfSpeech: [],
        senses: {
          general: "",
          examples: [],
          enumerated: [
            {
              partOfSpeech: ["f"],
              gloss: `Quickness, swiftness; earliness.`,
              examples: [
                {
                  gaelic: `ar a luaithe`,
                  béarla: `at the earliest; first thing`,
                  style: "bold",
                },
                {
                  gaelic: `Cá luaithe a thiocfaidh sé?`,
                  béaerla: `How soon will he come?`,
                  style: "italic",
                },
              ],
            },
            {
              partOfSpeech: ["gsf. & comp. of LUATH1."], // @todo this should get auto-gen'd?
            },
          ],
        },

        forms: [{ luaithe: "cs" }, { luaithe: "cp" }],
      },
    ],
  },
  théid: {
    freq: "4800+",
    listings: [
      {
        title: "théid",
        partOfSpeech: ["v"],
        senses: {
          general: `alternative present tense of téigh = 'to go' found in Ulster`,
          examples: [
            {
              gaelic: `má théid tú síos ansin go dtí an sruthán`,
              béarla: `if you go down there to the stream`,
            },
            { gaelic: `sin mar a théid sé`, béarla: `that's how it goes` },
          ],
        },
      },
    ],
  },

  "lig thar": {
    freq: null,
    listings: [
      {
        title: "lig thar",
        partOfSpeech: ["vt"],
        senses: {
          general: `Let pass.`,
          examples: [
            {
              gaelic: `Duine a ligean tharat`,
              béarla: `to let s.o. pass`,
              style: "bold",
            },
            {
              gaelic: `Rud a ligean tharat`,
              béarla: `to let sth. pass, to take no notice of sth`,
              style: "bold",
            },
            {
              gaelic: `Ná lig aon lá tharat (gan)`,
              béarla: `don’t miss a day (without)`,
              style: "italic",
            },
            {
              gaelic: `lig thar do chluasa é`,
              béarla: `don’t pretend to hear it`,
              style: "bold",
            },
            {
              gaelic: `Ní ligeann an bás aon duine thairis`,
              béarla: `death passes no one by`,
              style: "italic",
            },
            {
              gaelic: `an fhaill a ligean thart`,
              béarla: `to let an opportunity pass (to miss the boat)`,
            },
          ],

          enumerated: [],
        },
      },
    ],
  },

  caid: {
    freq: "0500+",
    listings: [
      {
        title: "caid",
        partOfSpeech: ["f"],
        fgbCategory: "2",
        fgbPuralStrength: "strong",
        senses: {
          enumerated: [{ gloss: "Ashlar, stone." }, { gloss: "Testicle." }],
        },
        forms: [
          { caid: "cs" },
          { caide: "cp" },
          { caideanna: "gs" },
          { caideanna: "gp" },
        ],
      },
      {
        title: "caid",
        partOfSpeech: ["f"],
        fgbCategory: "2",
        fgbPuralStrength: "strong",
        senses: {
          enumerated: [
            {
              gloss: "Stuffed ball; football.",
              examples: [
                {
                  gaelic: "Comh teann le caid",
                  béarla: "as tight as a football",
                  completeness: "phrase",
                },
              ],
            },
            {
              gloss: "(Game of) football.",
              examples: [
                {
                  gaelic: "Ag bualadh, ag imirt, caide",
                  béarla: "playing football",
                  completeness: "phrase",
                },
                {
                  gaelic: "Rug siad an chaid leo",
                  béarla: "they won the (football) game",
                  completeness: "phrase",
                },
                {
                  gaelic: "Ná ligigí an chaid leo",
                  béarla: "don’t let them away with the game",
                  completeness: "sentence",
                },
              ],
            },
          ],
        },
        forms: [
          { caid: "cs" },
          { caide: "cp" },
          { caideanna: "gs" },
          { caideanna: "gp" },
        ],
      },
    ],
  },
  bochtanas: {
    freq: "4700+",
    listings: [
      {
        title: "bochtanas",
        partOfSpeech: ["m"],
        fgbCategory: "1",
        equates: "bochtaineacht",
      },
    ],
  },
  beathach: {
    freq: "4300+",
    listings: [
      {
        title: "beathach",
        partOfSpeech: ["a"],
        fgbCategory: "1",
        senses: {
          general: "(In phrase)",
          examples: [
            {
              gaelic: "Beo beathach",
              béarla: "alive and active",
              completeness: "phrase",
            },
            {
              gaelic: `D'íosfaidís beo beathach thú`,
              béarla: "they would eat you alive",
              completeness: "sentence",
            },
          ],
          enumerated: [],
        },
      },
      {
        title: "beathach",
        equates: "beithíoch",
      },
      {
        title: "beathach",
        equates: "beitheach",
      },
    ],
  },
  cuimhne: {
    freq: "0500+",
    listings: [
      {
        title: "cuimne",
        partOfSpeech: ["f"],
        fgbCategory: "4",
        fgbPuralStrength: "strong",
        senses: {
          general: "memory",
          // @todo These "general examples" are not rendered right now,
          // and this is the only object (and upwards) a that they might be in
          examples: [],
          enumerated: [],
        },
        forms: [
          { cuimne: "cs" },
          { cuimne: "cp" },
          { cuimní: "gs" },
          { cuimní: "gp" },
        ],
      },
    ],
  },

  dualgas: {
    freq: "0600+",
    listings: [
      {
        title: "dualgas",
        partOfSpeech: ["m"],
        fgbCategory: "1",
        fgbPuralStrength: "weak",
        senses: {
          enumerated: [
            {
              gloss: "duty; natural right, due, customary fee or reward",
              examples: [],
            },
          ],
        },
        forms: [
          { dualgas: "cs" },
          { dualgais: "cp" },
          { dualgais: "gs" },
          { dualgas: "gp" },
        ],
      },
    ],
  },
  seamsán: {
    freq: null,
    notSureWhichSense: " síomsán, síomsánacht = SEAMSÁN [2], -acht.",
    listings: [
      {
        title: "seamsán",
        partOfSpeech: ["m"],
        senses: {
          general: "",
          enumerated: [
            {
              gloss: "Rivet, bolt, peg",
              grammar: "(gs. & npl. -áin, gpl. seamsán)",
              examples: [],
              variants: [
                {
                  title: "seamsa",
                  partOfSpeech: ["m"],
                },
              ],
            },
          ],
        },
      },
      {
        title: "seamsán",
        partOfSpeech: ["m"],
        grammar: "(gs. -áin)",
        senses: {
          enumerated: [
            {
              gloss: "Drone, hum, monotonous speech or song.",
              examples: [
                {
                  gaelic: `seamsán na bpíob`,
                  béarla: "the drone of the bagpipes",
                },
                {
                  gaelic: `seamsán a dhéanamh de rud`,
                  béarla: "to make a song of sth",
                },
                {
                  gaelic: `Tá an seamsán céanna i gcónaí aige`,
                  béarla: "he never changes his tune.",
                },
              ],
              variants: [],
            },
            {
              gloss: "Mutter, murmur, complaint.",
              examples: [],
            },
          ],
        },
      },
    ],
  },
  luaithrigh: {
    freq: null,
    listings: [
      {
        title: "luaithrigh",
        partOfSpeech: ["vt"],
        senses: {
          enumerated: [
            {
              gloss: "Sprinkle with ashes.",
              examples: [],
            },
          ],
        },
      },
    ],
  },
  "ar fud": {
    freq: "3100+",
    listings: [
      {
        title: "ar fud",
        partOfSpeech: ["⎄ [location]", "prep"],
        grammar: ["[⇉Ɣ noun]"],
        etym: ["fud (in phrase) ar fud"],
        senses: {
          enumerated: [
            {
              gloss: `throughout, among, all over`,
              examples: [
                {
                  gaelic: `ar fud na tíre`,
                  béarla: "all over the country",
                },
              ],
            },
          ],
        },
      },
    ],
  },

  luach: {
    // variants for each form?
    freq: "0500+",
    listings: [
      // listing 1? entry 1?
      {
        // assuming it's "luach" for now too
        title: "luach",
        partOfSpeech: ["m"], // part of speech
        fgbCategory: 3,

        grammar: `an luach/na luachanna, nm3 strong plural, an luacha/na luachanna`,

        senses: {
          general: "",
          enumerated: [
            {
              gloss: "value",
              examples: [
                {
                  gaelic: "X a fháil ar a luach",
                  béarla: "to get X at its proper value",
                  _meta: ["¬faigh"],
                },
                {
                  gaelic: "luach a chur [ar-X]",
                  béarla: "to value X",
                  _meta: ["¬cuir", "±", "[ar-X]"],
                },
              ],
            },
            {
              gloss: "price",
              examples: [
                {
                  gaelic: "ní fiú a luach é",
                  béarla: "it is not worth the money",
                  expex: "COP.NEG worth {} price it",
                },
              ],
            },
            {
              gloss: "reward, recompense; requital",
              examples: [
                { gaelic: "luach saothair", béarla: "reward (for effort)" },
              ],
            },
          ],
        },
      },
    ],
  },
};

const slenderVowelFadaLetters = ["é", "í", "É", "Í"];
const slenderVowelShortLetters = ["e", "i", "E", "I"];
const broadVowelFadaLetters = ["á", "ó", "ú", "Á", "Ó", "Ú"];
const broadVowelShortLetters = ["a", "o", "u", "A", "O", "U"];

const slenderVowelLetters = [
  ...slenderVowelShortLetters,
  ...slenderVowelFadaLetters,
];

const broadVowelLetters = [...broadVowelFadaLetters, ...broadVowelShortLetters];

const fadaVowelLetters = [...slenderVowelFadaLetters, ...broadVowelFadaLetters];

const shortVowelLetters = [
  ...slenderVowelShortLetters,
  ...broadVowelShortLetters,
];

const vowels = [...slenderVowelLetters, ...broadVowelLetters];

const lenitables = [
  "b",
  "B",
  "c",
  "C",
  "d",
  "D",
  "f",
  "F",
  "g",
  "G",
  "m",
  "M",
  "p",
  "P",
  "t",
  "T",
];

const mutableS = ["n", "l", "r", "N", "L", "R"];

const slenderVowelRegex = /[eéiíEÉIÍ]/g;
const broadVowelRegex = /[aáoóuúAÁOÓUÚ]/g;
const consonantRegex = /[bcdefghlmnprst]/i;

function htmlPronunciationMatches() {
  return "";
}

function _htmlPronunciationMatches() {
  const cardLexeme = getCardLexeme();
  const { matchesRegex, maskedConsonants, maskedVowels } =
    pronunciationRules(cardLexeme);

  const html =
    "<div><ul>" +
    `<p>maskedConsonants: ${maskedConsonants}</p>` +
    `<p>maskedVowels: ${maskedVowels}</p>` +
    matchesRegex.reduce((prev, curr) => {
      return (prev += `<li>${curr}</li>`);
    }, "") +
    "</ul></div>";

  return html;
}

function initPatterns() {
  const patterns = [
    {
      regexes: [/fh/i],
      ulster: "/-/",
      connacht: "/-/",
      munster: "/-/",
      examples: ["infheistíocht"],
    },
    {
      regexes: [/ón/i],
      ulster: "/on/",
      connacht: "/un/",
      munster: "/on/",
      examples: ["conaigh"],
    },
    {
      regexes: [/amh/i],
      ulster: "/aʊ/",
      connacht: "/aʊ/",
      munster: "/aʊ/",
      examples: [],
    },
    {
      regexes: [/cn/i],
      examples: ["cnoc", "tionscnamh"],

      ulster: ["/kr/", "/sk(ə)n"],
      connacht: ["/kr/", "/sk(ə)n"],
      munster: ["/kn/", "/sk(ə)n"],
    },
    {
      regexes: [/un/i],
      ulster: ["/un/", "ʌn"],
      connacht: ["/ʌn/", ""],
      munster: ["/un/", ""],
      examples: ["suntasach", "bunúsach"],
    },
    {
      regexes: [/ío[ns]?/i],
      examples: [
        ["cíos", "aníos"],
        ["díon", "comhlíon"],
        "faitíos",
        "díospóireacht",
      ],
      ulster: ["/i/", "/i/", "", "ɪ"],
      connacht: ["/i(ə)/", "/i(ə)/", "/i/", "/i/"],
      munster: ["/i/", "/i(ə)/", "", "/i/"],
    },
    {
      regexes: [/tl/i],
      examples: ["eitleán"],
      ulster: ["/t(ə)l/ [epenthesis]"],
      connacht: ["/tl/"],
      munster: ["/t(ə)l/ [epenthesis]"],
    },

    {
      regexes: [/in/i],
      examples: ["sinsear", "inis"],
      ulster: ["/ɪn/", "/ɛn/ ('hen')"],
      connacht: ["/in/ ('mean')", "/ɪn/ ('in')"],
      munster: ["/in/ ('mean')", "/ɪn/ ('in')"],
    },
    {
      regexes: [/e?ach\b/i],
      examples: [
        ["bunúsach", "ribeach"],
        "suntasach",
        "bainteach",
        "criosach",
        "gach",
      ],
      ulster: ["/ä(x)/", "", "", "ʌ", "/ä(x)/"],
      connacht: ["/ʌx/", "", "", "", "/äx/"],
      munster: ["/ʌx/", "", "", "", "/äx/"],
    },
    //
    {
      regexes: [/omhai/i],
      examples: ["comhairleoir"],
      ulster: "/o/",
      connacht: "/o/",
      munster: "/o/",
    },
    {
      regexes: [/ath\b/i],
      examples: ["brath"],
      ulster: "/e/",
      connacht: "/ä/",
      munster: "/ä(h)/",
    },

    {
      regexes: [/omhal/i],
      examples: ["comhaltas"],
      ulster: "/ol/",
      connacht: "/ol/",
      munster: "/ol/",
    },
    {
      regexes: [/nb/i],
      examples: ["leanbaí"],
      ulster: ["/n(ə)b [epenthesis]/"],
      connacht: ["/n(ə)b [epenthesis]/"],
      munster: ["/n(ə)b [epenthesis]/"],
    },
    {
      regexes: [/an/i],
      examples: [["montach", "planda"]],
      ulster: ["/än/"],
      connacht: ["/än/"],
      munster: ["/aʊn/"],
    },
    {
      regexes: [/urr/i],
      examples: ["urraim"],
      ulster: ["/ɛr/ ('erin')"],
      connacht: ["/ʊr/"],
      munster: ["/or/"],
    },
    {
      regexes: [/áith/i],
      examples: ["cáith"],
      ulster: ["/aɪ/"],
      connacht: ["/ɔ/"],
      munster: ["/ɔ/"],
    },
    {
      regexes: [/gn/i],
      examples: ["gnúsacht", "gné"],
      ulster: ["/gr/"],
      connacht: ["/gn/"],
      munster: ["/gn/"],
    },
    {
      regexes: [/eir/i],
      examples: ["ceird"],
      ulster: ["/ɛr/ ('cared')"],
      connacht: ["/æɛr/"],
      munster: ["/ɛr/ ('cared')"],
    },
    {
      regexes: [/o/i],
      examples: ["cothaigh", ["confadh", "dochar", "trom"], "moltach"],
      ulster: ["/ɔ/", "/ʌ/", "/o/"],
      connacht: ["/ʌ/", "/ʌ/", "/o/"],
      munster: ["/ʌ/", "/ʌ/ or /(aʊ)/ with trom", "/o/"],
    },

    {
      regexes: [/a?íocht?/i],
      examples: [
        ["uathoibríoch", "cíoch", "críochnaigh"],
        ["drámaíocht", "aíocht"],
        "infheistíocht",
      ],
      ulster: ["/iə(h)/", "/iəkt/", "/iät/"],
      connacht: ["/iəx/", "/iəxt/", "/iəxt/"],
      munster: ["/iəx/", "/iəxt/", "/iəxt/"],
    },
    {
      regexes: [/i?om/i],
      examples: ["compánach", "iompaigh"],
      ulster: "/ʌ/",
      connacht: "/ʌ/",
      munster: "/u/",
    },
    {
      regexes: [/uath/i],
      examples: ["uathoibríoch"],
      ulster: "/u/",
      connacht: "/u/",
      munster: "/u/",
    },
    {
      regexes: [/eamh/i],
      examples: ["gaineamh", "neamhspleách"],
      ulster: ["/ɪv/", "/æv/"],
      connacht: ["/ə/", "/æv/"],
      munster: ["/ɪv/", "/æv/"],
    },

    {
      regexes: [/nf[^h]/i],
      examples: ["confadh"],
      ulster: ["/nəf/ [epenthesis]"],
      connacht: ["/nf/"],
      munster: ["/nf/"],
    },

    {
      regexes: [/abha/i],
      examples: ["fabhalscéal", "abhainn"],
      ulster: ["/aʊə/ ('now')", "/o/"],
      connacht: ["/aʊə/ ('now')"],
      munster: ["/aʊə/ ('now')"],
    },
    {
      regexes: [/eoir\b/i],
      examples: ["comhairleoir"],
      ulster: "/är/ ('are')",
      connacht: "/or/",
      munster: "/or/",
    },
    {
      regexes: [/eách/i],
      examples: ["neamhspleách"],
      ulster: "/ɛə/",
      connacht: "/ɔx/",
      munster: "/ɔx/",
    },
    {
      regexes: [/agha\b/i],
      examples: ["saghas"],
      ulster: "/aɪ/ ('nice')",
      connacht: "/aɪ/ ('nice')",
      munster: "/aɪ/ ('eye')",
    },
    {
      regexes: [/umh\b/i],
      examples: ["cumhachtaigh"],
      ulster: "/u/",
      connacht: "/u/",
      munster: "/u/ or /ɔ/",
    },
    {
      regexes: [/éa/i],
      examples: ["méadaigh", "téacs", "déanach"],
      ulster: ["/e/", "/ɛ/", "/e/"],
      connacht: ["/eə/", "/e/", "/e(ə)/"],
      munster: ["/eə/", "/eɪə/", "/i(ə)/"],
    },
    {
      regexes: [/a?ithe$/i],
      examples: ["sínithe", "ardaithe"],
      ulster: "/ihɛ",
      connacht: "/i/",
      munster: "/əhɛ/",
    },
    {
      regexes: [/^ai[bcdefghlmnprst]/i],
      examples: ["Aibreán"],
      notes: "Ulster",
      ulster: "/ɛ/",
      connacht: "/aɪ/",
      munster: "/ə/ (?)",
    },
    {
      regexes: [/e?acht/i],
      examples: [
        "sneachta",
        "gluaiseacht",
        "ioidhreacht",
        "éifeacht",
        "reacht",
        "eachtra",
      ],
      ulster: [
        "~/a:rt/ ('cart')",
        "/ät/ ('shot')",
        "/ʌxt/ (iii)",
        "/ät/ ('shot')",
        "/æxt/",
        "/ät/",
      ],
      connacht: ["", "/ʌxt/", "/ʌxt/", "/ʌxt/", "/æxt/", "/æxt/"],
      munster: ["", "/ʌxt/", "/ʌxt/", "/ʌxt/", "/æxt/", "/äxt/"],
    },
    {
      regexes: [/thn/i],
      examples: ["breathnaigh"],
      ulster: [""],
      connacht: [""],
      munster: ["/h(ə)n/ [epenthesis]"],
    },
    {
      regexes: [/e?ann/i],
      examples: ["gleann", "craiceann", "gannchuid", "srann"],
      ulster: ["/æn/", "/ən/ [unstressed]", "/än/", "/än/"],
      connacht: ["/ɔn/", "/ən/ [unstressed]", "/ɔn/ ('gone')", "/än/ ('naan')"],
      munster: ["/aʊn/", "/ən/ [unstressed]", "/aʊn/ ('noun')", "/aʊn/"],
    },
    {
      regexes: [/aomh/i],
      examples: ["naomh"],
      ulster: ["iu"],
      connacht: ["/(e)iv/"],
      munster: ["/aɪəv/"],
    },
    {
      regexes: [/éir/i],
      examples: ["pinsinéir"],
      ulster: ["/ɛr/ ('air')"],
      connacht: ["/ɛr/ ('air')"],
      munster: ["/ɛr/ ('air')"],
    },
    {
      regexes: [/mh/i],
      examples: ["formhór"],
      ulster: ["/w/"],
      connacht: ["/w/"],
      munster: ["/v/"],
    },
    {
      regexes: [/aío?/i],
      examples: [["imeachtaí", "iomaí"], "ealaíontóir"],
      ulster: ["/i/", "/i(ə)/"],
      connacht: ["/i/", "/i(ə)/"],
      munster: ["/i/", "/i(ə)/"],
    },

    {
      regexes: [/aoi/i],
      examples: ["smaointe"],
      ulster: ["/wi/"],
      connacht: ["/wi/"],
      munster: ["/wi/"],
    },
    {
      regexes: [/thaoi/i],
      examples: ["cathaoirleach"],
      ulster: ["/hi/"],
      connacht: ["/hi/"],
      munster: ["/hi/"],
    },
    {
      regexes: [/ei/i],
      examples: [["meitheal", "ceil"]],
      ulster: ["/ɛ/"],
      connacht: ["/ɛ/"],
      munster: ["/ɛ/"],
    },
    {
      regexes: [/le/i],
      examples: ["le"],
      ulster: ["/lɛ/"],
      connacht: ["/lɛ/"],
      munster: ["/lɛ/"],
    },
    {
      regexes: [/iúr/i],
      examples: ["stiúrthóir"],
      ulster: ["/u/"],
      connacht: ["/u(ə)/"],
      munster: ["/u(ə)/"],
    },
    {
      regexes: [/dh/i],
      examples: ["mar dhea", "comhdháil"],
      ulster: ["/j/", "/ɣ/"],
      connacht: ["/j/", "/ɣ/"],
      munster: ["/j/", "/-/"],
    },
    {
      regexes: [/ao/i],
      examples: ["daor", "aonad", "caora"],
      ulster: ["/i/", "/e/", "/i/"],
      connacht: ["/i/", "/e(ə)/", "/wi/"],
      munster: ["/eə/", "/e(ə)/", "/wi/"],
    },
    {
      regexes: [/ionn?/i],
      examples: [["iontas", "tionscnamh"], "sionnach"],
      ulster: ["/ʌn/", "/ən/ [unstressed]"],
      connacht: ["/in/", "/ən/ [unstressed]"],
      munster: ["/un/", "/ən/ [unstressed]"],
    },
    {
      regexes: [/eoi?/i],
      examples: ["teorainn", "ainneoin"],
      ulster: ["/o/"],
      connacht: ["/o/"],
      munster: ["/o/", "/o(ə)/"],
    },
    {
      regexes: [/gl/i],
      examples: ["glúin"],
      ulster: ["/gl/"],
      connacht: ["/gl/"],
      munster: ["/gəl/ [epenthesis]"],
    },

    {
      regexes: [/aigh(?!\b)/i], // aigh not at the end of a word
      // that is, one or more non-spaces between aigh- and the next word boundary
      examples: ["taighde", "saighdiúir"],
      ulster: "/aɪ/",
      connacht: "/aɪ/",
      munster: "/aɪ/",
    },
    {
      regexes: [/[aeio]?ú[aeio]?/i],
      examples: ["saighdiúir", "comhaontú"],
      ulster: ["/ə/ [unstressed]", "/u/ [stressed]"],
      connacht: ["/u/"],
      munster: ["/u/"],
    },
    {
      regexes: [/ia/i],
      // coitianta doesn't quite line up
      examples: [["fianaise", "coitianta"], "scian", ["iasacht", "iarraidh"]],
      ulster: ["/i(ə)/", "ɪ", "/jɛ"],
      connacht: ["/i(ə)/", "", "/i/"],
      munster: ["/i(ə)/", "", "/i/"],
    },
    {
      regexes: [/mh/i],
      examples: ["tréimhse"],
      ulster: "/v/",
      connacht: "/v/",
      munster: "/v/",
    },
    {
      regexes: [/ghch/i],
      examples: ["toghchán"],
      ulster: "--",
      connacht: "--",
      munster: "gh/ə/ch [epenthesis]",
    },
    {
      regexes: [/ille/i],
      examples: ["bille"],
      ulster: "ɪljə",
      connacht: "ɪlə",
      munster: "ɪlə",
    },
    {
      regexes: [/rg/i],
      examples: ["fearg"],
      ulster: ["/rəg/ [epenthesis]"],
      connacht: ["/rəg/ [epenthesis]"],
      munster: ["/rəg/ [epenthesis]"],
    },
    {
      regexes: [/rm/i],
      examples: ["gairm", "formhór"],
      ulster: ["/rəm/ [epenthesis]", "/rw/"],
      connacht: ["/rəm/ [epenthesis]", "/rw/"],
      munster: ["/rəm/ [epenthesis]", "/rəv/ [epenthesis]"],
    },
    {
      regexes: [/uai?/i],
      examples: [["dualgas", "gluaiseacht"], "cuan"],
      ulster: ["/uə/", "/uæ/"],
      connacht: ["/uə/", "/u/"],
      munster: ["/uə/", "/uə/"],
    },

    {
      regexes: [/e?ái?/i],
      examples: [
        ["áis", "sáraigh", "cláraigh"],
        ["cumarsáid", "péinteáil", "áthas", "Aibreán"],
        "náisiúnta",
      ],
      ulster: ["/ɛ/", "/ä/", "/æ/"],
      connacht: ["/ɔ/"],
      munster: ["/ɔ/"],
    },

    {
      regexes: [/ogh/i],
      examples: ["toghchán"],
      ulster: ["eɪ ('hay')"],
      connacht: ["/aʊ/ ('now')"],
      munster: ["/aʊ/ ('now')"],
    },

    {
      regexes: [/il/i],
      examples: ["milseog"],
      ulster: ["/ɪl/"],
      connacht: ["/il/"],
      munster: ["/il/"],
    },
    {
      regexes: [/oi/i],
      examples: ["coitianta", "uathoibríoch", "oiliúint", "oideachas"],
      ulster: ["/ä/", "/ɛ/", "/ɪ/", "/ɛ/"],
      connacht: ["/ʌ/", "/aɪ/", "/ɛ/", "/ɛ/"],
      munster: ["/ʊ/", "/ɪ/", "/ɪ/", "/ɪ/"],
    },
    {
      regexes: [/[au]?inn/i],
      examples: ["crinnte", "teorainn", "binn", "cruinn"],
      ulster: ["/ɪn/ ('in')", "/äən/ or /ä(ɪ)n/", "/ɪn/ ('in')", "/ɪn/"],
      connacht: ["/in/ ('mean')", "/ɪn/", "/in/ ('mean')", "/in/"],
      munster: ["/ɪn/ ('in')", "n/a: teora", "/in/ ('mean')", "/in/"],
    },
    {
      regexes: [/ar/i],
      examples: ["ardaithe", "araon"],
      ulster: ["/ɛr/ ('fair')", "/ər/ [unstressed]"],
      connacht: ["/ɔr/ ('far')", "/ər/"],
      munster: ["/ɔr/ ('far')", "/ɛr/ ('meredith')"],
    },
    {
      regexes: [/áin$/i],
      examples: ["síocháin"],
      ulster: "/ʌn/",
      connacht: "/ɔn/",
      munster: "/ɔin/",
    },
    {
      regexes: [/uinnigh\b/i],
      examples: ["cruinnigh"],
      ulster: ["/ɪni/"],
      connacht: ["/ɪnjə/"],
      munster: ["/ɪnɪg/"],
    },
    {
      regexes: [/eidh/i],
      examples: ["feidhmigh"],
      ulster: ["/e/"],
      connacht: ["/aɪ/ ('eye')"],
      munster: ["/aɪ/ ('eye')"],
    },
    {
      regexes: [/a?igh\b/i],
      examples: [["ceadaigh", "eagraigh"], ["figh", "laistigh"], "cruaigh"],
      ulster: ["/i/", "/i/", "/eɪ/ ('hay')"],
      connacht: ["/ə/", "ɪ", "/ʌ/"],
      munster: ["/ɪg/", "/ɪg/", "/ɛg/"],
    },
    {
      regexes: [/earr?/i],
      examples: [["beartas", "dearc"], "earra", "deisceart"],
      ulster: ["/ɔr/ ('are')", "/är/", "/ɔr/ ('are')"],
      connacht: ["/ær/", "/ær/", "/ər/ ('dirt')"],
      munster: ["/ær/", "/ær/", "/ər/ ('dirt')"],
    },

    {
      regexes: [/ea/i],
      examples: [
        "ceadaigh",
        ["seachas", "corpoideachas"],
        "taifead",
        "eaglach",
        "feasta",
      ],
      ulster: ["/æ/", "/ä/", "/ə/ [unstressed]", "/ʌ/", "/æ/"],
      connacht: ["/æ/", "/ä/", "/ə/ [unstressed]", "/ɔ/", "/æ/"],
      munster: ["/æ/", "/ä/", "/ə/ [unstressed]", "/ä/", "/ɛ/"],
    },
    {
      regexes: [/or/i],
      examples: ["ord"],
      ulster: ["/ɔr/ ('or')"],
      connacht: ["/aʊər/ ('tower')"],
      munster: ["/ɔr/ ('or')"],
    },
    {
      regexes: [/im/i],
      examples: ["timpeallacht"],
      ulster: ["/ɪm/"],
      connacht: ["/im/"],
      munster: ["/im/"],
    },
    {
      regexes: [/uimh/i],
      examples: ["cuimhneamh"],
      ulster: ["/ʌv/"],
      connacht: ["/wim/"],
      munster: ["/wi/"],
    },
    {
      regexes: [/eith/i],
      examples: ["breith"],
      ulster: ["/e/"],
      connacht: ["/ɛ/"],
      munster: ["/ɛ/"],
    },
    {
      regexes: [/uí/i],
      examples: ["buí"],
      ulster: ["/wi/"],
      connacht: ["/wi/"],
      munster: ["/wi/"],
    },
    {
      regexes: [/aith/i],
      examples: ["sraith", "taithí"],
      ulster: ["/əɪ/ ('like')", "/ä(h)/"],
      connacht: ["/ä(h)/", "/ä(h)/"],
      munster: ["/ä(h)/", "/ä(h)/"],
    },
    {
      regexes: [/onn\b/i],
      examples: ["anonn"],
      ulster: "/ʌn/",
      connacht: "/un/",
      munster: "/un/",
    },
    {
      regexes: [/rch/i],
      examples: ["dorcha"],
      ulster: "/r(ə)h/",
      connacht: "/rəx/",
      munster: "/rəx/",
    },
    {
      regexes: [/ai/i],
      examples: [
        "taifead",
        "malairt",
        "craiceann",
        ["paiste", "bailithe", "caitheachas", "faitíos"],
      ],
      ulster: ["/ä/", "/ə/ [unstressed]", "/æ/", "/ä/"],
      connacht: ["/æ/", "/ə/ [unstressed]", "/æ/", "/ä/"],
      munster: ["/ä/", "/ə/ [unstressed]", "/ɪ/", "/ä/"],
    },
    {
      regexes: [/[aiou]?é[iou]?/i],
      examples: ["béim", "déileáil"],
      ulster: ["/e/", "/e/"],
      connacht: ["/e/", "/e/"],
      munster: ["/e/", "/aɪ/ ('eye')"],
    },
    {
      regexes: [/oidh/i],
      examples: ["oidhreacht"],
      ulster: "/aɪ/ ('eye')",
      connacht: "/aɪ/ ('eye')",
      munster: "/aɪ/ ('eye')",
    },
    {
      regexes: [/omh/i],
      examples: ["comhrá", "comhlacht"],
      ulster: ["/o/"],
      connacht: ["/o/"],
      munster: ["/ə/ [unstressed]", "/o/"],
    },
    {
      regexes: [/omhao/i],
      examples: ["comhaontú"],
      ulster: ["/ɔɪə/ ('boy'n')"],
      connacht: ["/oiə/"],
      munster: ["/ɔɪə/ ('boy'n')"],
    },
    {
      regexes: [/uaigh/i],
      examples: ["luaigh"],
      ulster: "/ueɪ/ (like 'y|ou a|te')",
      connacht: "/uʌ/",
      munster: "/uɪg/",
    },
    {
      regexes: [/uigh/i],
      examples: ["lasmuigh"],
      ulster: "/wi/",
      connacht: "/ʊ/",
      munster: "/ʊ/",
    },
    {
      regexes: [/ch/i],
      examples: ["dúchas"],
      ulster: "/h/",
      connacht: "/x/",
      munster: "/x/",
    },
    {
      regexes: [/uaith/i],
      examples: ["suaith"],
      ulster: "/ui/",
      connacht: "/uʌ/",
      munster: "/uʌ/",
    },
    {
      regexes: [/e?adh\b/i],
      examples: ["cáineadh", ["comhlíonadh", "conradh"]],
      ulster: ["/u/"],
      connacht: ["/ə/"],
      munster: ["/ɛ/", "/ə/"],
    },
    {
      regexes: [/a/i],
      examples: ["lasmuigh", "masc", ["dualgas", "iarthar"], "blas"],
      ulster: ["/æ/ [stressed]", "/æ/", "/ə/ [unstressed]", "/ä/"],
      connacht: ["/æ/ [stressed]", "/ä/", "/ə/ [unstressed]", "/ä/"],
      munster: ["/æ/ [stressed]", "/ä/", "/ə/ [unstressed]", "/ä/"],
    },
    {
      regexes: [/agh/i],
      examples: ["iniúch"],
      ulster: "/(j)u(h)/",
      connacht: "/(j)ux/",
      munster: "/ux/",
    },
    {
      regexes: [/sh/i],
      examples: ["dúshlán"],
      ulster: "/h/",
      connacht: "/-/",
      munster: "/h/",
    },
    {
      regexes: [/éith/i],
      examples: ["tréith"],
      ulster: "/e/",
      connacht: "/e/",
      munster: "/e/",
    },
    {
      regexes: [/ca$/i],
      examples: ["éasca"],
      ulster: "/(w)i/",
      connacht: "/ə/",
      munster: "/ə/",
    },
    {
      regexes: [/uth/i],
      examples: ["sruth"],
      ulster: "/u/",
      connacht: "/ʌ/",
      munster: "/ʌ/ or /ʊ/",
    },
    {
      regexes: [/iúch/i],
      examples: ["laghdaigh"],
      ulster: "/eɪ/ ('hay')",
      connacht: "/aɪ/ ('eye')",
      munster: "/aɪ/ ('eye')",
    },
    {
      regexes: [/eag/i],
      examples: ["teagmháil"],
      ulster: "/æŋg/",
      connacht: "/æg/",
      munster: "/æŋg/",
    },

    {
      regexes: [/th/i],
      examples: ["iarthar"],
      ulster: "/h/",
      connacht: "/h/",
      munster: "/h/",
    },
    {
      regexes: [/iabha/i],
      examples: ["diabhal"],
      ulster: "/æwə/",
      connacht: "/aʊə/",
      munster: "/iə/",
    },
    {
      regexes: [/éigh/i],
      examples: ["pléigh"],
      ulster: "/eɪ/",
      connacht: "/eɪ/",
      munster: "/eg/",
    },
    {
      regexes: [/aín/i],
      examples: ["ealaín"],
      ulster: "/i/",
      connacht: "/i/",
      munster: "/i(ə)/",
    },
    {
      regexes: [/io/i],
      examples: ["cion", ["criosach", "sliotar"], "iomaí"],
      ulster: ["/(j)ʌ/", "/ɪ/", "/ʌ/"],
      connacht: ["/jʌ/", "/ɪ/", "/ʌ/"],
      munster: ["/jʌ/", "/ɪ/", "/ʌ/"],
    },
    {
      // has to go in front of other /ó/ because
      // i don't know how to prioritize this one
      // since they both match on 2 characters in "cóip"
      // maybe take the "i" out of the 2nd [] grouping?
      regexes: [/ói/i],
      examples: ["cóip", "tionóisc", ["tóin", "móin"]],
      ulster: ["/o/", "/ʌ/", "/o/"],
      connacht: ["/oə/", "/o/", "/u/"],
      munster: ["/oɪ/", "/o/", "/oə/"],
    },
    {
      regexes: [/[aeiu]?ó[aeu]?/i],
      examples: [
        ["cóip", "dóchas"],
        ["cló", "easóg"],
        ["lóchrann", "pósta"],
      ],
      ulster: ["/o/", "/ʌ/", "/ɔ/"],
      connacht: ["/o/"],
      munster: ["/o/"],
    },
    {
      regexes: [/all/i],
      examples: [["ball", "thall", "mall"], "alltacht", "geall"],
      ulster: ["/äl/", "/äl/", "/æl/"],
      connacht: ["/ɔl/", "/äl/", "jɔl"],
      munster: ["/aʊ(ə)l/", "/äl/", "/jaʊ(ə)l/"],
    },
    {
      regexes: [/ui/i],
      examples: ["muiníneach", "cuideachta"],
      ulster: ["/u/", "/ʊ/"],
      connacht: ["/ə [unstressed]/", "ʊ"],
      munster: ["/ə [unstressed]"],
    },

    {
      regexes: [/amh/i],
      examples: [["samhradh", "samhail"]],
      ulster: ["/aʊ/ ('how')"],
      connacht: ["/aʊ/ ('how')"],
      munster: ["/aʊ/ ('how')"],
    },
    {
      regexes: [/aidh/i],
      examples: ["aidhm", "iarraidh"],
      ulster: ["/e/", "/i/"],
      connacht: ["/aɪ/", "/ə/"],
      munster: ["/aɪ/", "/ɪg/"],
      notes: "* iarraidh seems like its ending sounds are for a 'aigh' word.",
    },

    {
      regexes: [/aonn/i],
      examples: ["daonna"],
      ulster: ["/en/"],
      connacht: ["/ujən/"],
      munster: ["/e(ə)n/"],
    },
    {
      regexes: [/eabh/i],
      examples: ["feabhsaigh"],
      ulster: ["/io/"],
      connacht: ["/(i)aʊ/"],
      munster: ["/(i)aʊ/"],
    },
    {
      regexes: [/uill/i],
      examples: ["tuillte"],
      ulster: ["/ɪl/"],
      connacht: ["/ɪl/"],
      munster: ["/ɪl/"],
    },
    {
      regexes: [/ithi/i],
      examples: ["ithir"],
      ulster: ["/ɪhə/"],
      connacht: ["/i/"],
      munster: ["/ɪhə/"],
    },
    {
      regexes: [/í/i],
      examples: ["dílis"],
      ulster: ["/i/"],
      connacht: ["/i/"],
      munster: ["/i/"],
    },
  ];

  /**
   * 1. does x regex encompass y regex? then use x.
   */

  const lexeme = getCardLexeme();

  const execs = [];

  // todo change this to a reduce function
  // or whatever
  patterns.filter((p) =>
    p.regexes.some((r, idx) => {
      const res = r.exec(lexeme);
      if (res) {
        execs.push({
          examples: p.examples,
          ulster: p.ulster,
          connacht: p.connacht,
          munster: p.munster,
          regex: r,
          match: res[0],
          matchLen: res[0].length,
          startIndex: res.index,
          endIndex: res.index + res[0].length,
          styles: [],
          supercededBy: [],
          colorStyles: [],
        });
      }

      return res !== null;
    })
  );

  for (let i = 0; i < execs.length; i++) {
    for (let j = 0; j < execs.length; j++) {
      if (
        execs[i].startIndex <= execs[j].startIndex &&
        execs[i].endIndex >= execs[j].endIndex &&
        execs[i].matchLen > execs[j].matchLen
      ) {
        execs[j].styles.push("superceded");
        execs[j].supercededBy.push(execs[i]);
      }
    }
  }

  // superceded later
  execs.sort((a, b) => {
    const indexDiff = a.startIndex - b.startIndex;
    return indexDiff !== 0 ? indexDiff : a.matchLen - b.matchLen;
  });

  const chars = [...lexeme];
  let colorIndex = 1; // incrementing number for css classes

  execs.forEach((e) => {
    if (e.supercededBy.length === 0) {
      for (let i = e.startIndex; i < e.endIndex; i++) {
        const overlap = chars[i].length > 1 ? "phone-segment-overlap" : "";

        chars[
          i
        ] = /*html*/ `<span class="phone-segment-${colorIndex} ${overlap}">${chars[i]}</span>`;
      }
      // Oh, this is the color of the row of IPA information
      e.colorStyles.push(`phone-segment-${colorIndex}`);
      colorIndex++;
    }
  });

  const colorLexeme = chars.join("");

  function htmlLocality(loc) {
    // loc can be [] or ""
    loc = Array.isArray(loc) ? loc : [loc];
    return loc.reduce((prev, curr) => prev + /*html*/ `<li>${curr}</li>`, "");
  }

  function htmlSpanExample(example) {
    return /*html*/ `<span ${
      example === lexeme ? 'class="example-is-lexeme"' : ""
    }>${example}</span>`;
  }

  function htmlExamples(examples) {
    return examples.reduce(
      (prev, curr) =>
        prev +
        /*html*/ `<li>${
          Array.isArray(curr)
            ? curr.map(htmlSpanExample).join(", ")
            : htmlSpanExample(curr)
        }</li>`,
      ""
    );
  }

  let html =
    /*html*/ `<div class="big-font">${colorLexeme}</div>` +
    /*html*/ `<div><table class="phonetics"><thead><th>regex</th><th>U</th><th>C</th><th>M</th><th>examples</th></thead>` +
    execs.reduce((prev, curr) => {
      return (
        prev +
        /*html*/ `<tr class="${curr.styles.join(" ")}">` +
        /*html*/ `<td class="regex ${curr.colorStyles.join(" ")}">${
          curr.regex
        }</td>` +
        /*html*/ `<td class="ipa">${htmlLocality(curr.ulster)}</td>` +
        /*html*/ `<td class="ipa">${htmlLocality(curr.connacht)}</td>` +
        /*html*/ `<td class="ipa">${htmlLocality(curr.munster)}</td>` +
        /*html*/ `<td class="gaelic"><ul class="compressed">` +
        /*html*/ `${htmlExamples(curr.examples)}` +
        /*html*/ `</ul></td>` +
        /*html*/ `</tr>`
      );
    }, "") +
    /*html*/ `</table></div>`;

  // // nested literal
  // const list = execs.map(
  //   (e) => `<li class="${e.styles}">${Object.entries(e)}</li>`
  // );
  // html += `<ul style="size:50%;">${list}</ul>`;

  // if (isAnswerSide()) {
  //   setInnerHTML("dialog-portal", html);
  // }
  return html;
}

function _initPatterns() {
  try {
    const cardLexeme = getCardLexeme();

    const {
      matches,
      matchesRegex,
      violations,
      violationsRegex,
      knownExceptions,
    } = spellingRules(cardLexeme);

    const htmlPronunciation = htmlPronunciationMatches();

    const knownException = knownExceptions.includes(cardLexeme);

    if (
      matches.length ||
      violations.length ||
      knownExceptions.includes(cardLexeme)
    ) {
      setInnerHTML(
        "dialog-portal",
        `matches: ${matches}<br>matchesRegex: ${matchesRegex} <br>violations: ${violations} <br>violationsRegex : ${violationsRegex}<br>${
          knownException ? "known exception" : ""
        }` + htmlPronunciation
      );
    }
  } catch (error) {
    log("initPatterns Error: " + error);
  }
}

const pronunciationRules = (word) => {
  const maskedConsonants = maskConsonants(word);
  const maskedVowels = maskVowels(word);

  const rules_no_mask_regex = {
    // use "negative lookahead - don't match on /aigh$/ but can match /aighblah/ (for now)
    "('eye')": [/ai(?!gh$)4?/], // anywhere but the end of a word

    // Vowels followed by n, nn, ll, rr, rd, or m are pronounced long (unless another vowel follows): NSBI-p4
    // not sure if <ea> is just for <geall> and <ceann>
    "Vowels followed by n, nn, ll, rr, rd, or m are pronounced long (unless another vowel follows); like ~/a:/":
      [/e?a(?:n|nn|m|rr|rd|ll)(?![aeiouáéíóú])/i],
    "Vowels followed by n, nn, ll, rr, rd, or m are pronounced long (unless another vowel follows); like ~/i:/":
      [/io?(?:n|nn|m|rr|rd|ll)(?![aeiouáéíóúAEIOUÁÉÍÓÚ])/],
    "Vowels followed by n, nn, ll, rr, rd, or m are pronounced long (unless another vowel follows); like ~/u:/":
      [/o(?:nn|m)(?![aeiouáéíóúAEIOUÁÉÍÓÚ])/],
    "~/e:/": [/aei?/],
    "~/i:/": [/aoi?/],
    "~/o:/": [/eoi?/],
    "/æ/": [/eai?(?!nn|ll|rr)/, /^ai/],
    "~/a/ ('father')": [/[bcdefghlmnprstBCDEFGHLMNPRST]ai/],
    "~/i/": [/io/, /ui/], // should do with consonant mask
    "<e(i)> ???": [/oi/],
    "~/u/": [/iu/],
  };

  const rules_masked_consonants_regex = {
    // <á>, <ái>, <eá>, <eái>
    "~/a:/": [/3á3/, /3ái4/, /4eá3/, /4eái4/],
    // <é>, <éi>, <éa>, <ae>, <aei>
    "~/e:/": [/4é4/, /4éi4/, /4éa3/, /3ae4/, /3aei4/],
    "~/e:/ (/3ao3/ in Munster)": [/3aei?/, /3ao3/], // she says <é>, so i'm assuming ~/e:/

    "~/i:/": [/aoi4/],
    // <ó>, <ói>, <eo>, <eoi>
    "~/o:/": [/3ó3/, /3ói4/],
    "~/o:/ (in final position)": [/4eo3*$/, /4eo(?:i4)?/], //  in final position, <eo> and <eoi> are normally the same sound as <ó>.
    // They are used after a slender consonant, with the <i> added
    // when a slender consonant also follows: beo, ceol, múinteoir.
    "~/e/ ('bed')": [/ei/],

    // ======== Regular Pronunciations of Short Vowel Spellings ===== //

    // it's hard to tell, but it looks like the beginning of a word, but not end
    // of a word, is the same logic with these.
    "~/a/ ('father') Munster": [/^a3/, /^ai4/, /3ai(?!gh$)4?/],
    "~/æ/ ('cat')": [/4ea3/],
    "~/æ/ ('cat') [Ulster]": [/3ai4/],
    "~/æ/ ('cat') [Connacht]": [/^ai4/],
    // I'm not sure if this is also the case at the beginnings or ends of words
    "~/i/ (<io> and <ios> only occasionally pronounced this way?) ": [
      /[34]u?i[34]/,
      /[34]i(?:os)?[34]/,
      /[34]io?[34]/,
    ],
    // this CAN be at the beginning of words
    // eg. iomlán; also siopa, liom, tiocfaidh
    "~/u/ ('put') - Munster and Connacht": [/^io[34]/, /[34]io[34]/],
    "~/o/ ('cut') - Ulster": [/^io[34]/, /[34]io[34]/],
    // beginning or middle
    "least consistent; checks notes": [/^oi?[34]/, /[34]oi?[34]/],

    "loss of nasality; /n/ =≥ /r/ [C][U]": [/[34]n/], // n =≥ r
  };

  const rules_masked_vowels_regex = {
    // this rule is also formulated as "doubles are word-final or followed by consonant, which is the same as "not followed by vowel"
    // negative lookahead to make sure not followed by vowel
    "double consonants ([M] - no change)": [/[12](?:ll|rr|nn)(?![12])/],

    // NSBI-p2
    "slender ll, nn => add /j/ before following (slender) vowel": [
      /(?:ll|nn)[2]/,
    ],
  };

  const matchesArray = [];

  const noMaskRules = Object.entries(rules_no_mask_regex);

  noMaskRules.forEach(([explanation, subrules]) => {
    const matchingSubRules = subrules.filter((s) => s.exec(word));
    if (matchingSubRules.length) {
      matchesArray.push(`${explanation}: ${matchingSubRules.join(",")}`);
    }
  });

  const vowelRules = Object.entries(rules_masked_vowels_regex);

  vowelRules.forEach(([explanation, subrules]) => {
    const matchingSubRules = subrules.filter((s) => s.exec(maskedVowels));
    if (matchingSubRules.length) {
      matchesArray.push(`${explanation}: ${matchingSubRules.join(",")}`);
    }
  });

  const consonantRules = Object.entries(rules_masked_consonants_regex);

  consonantRules.forEach(([explanation, subrules]) => {
    const matchingSubRules = subrules.filter((s) => s.exec(maskedConsonants));
    if (matchingSubRules.length) {
      matchesArray.push(`${explanation}: ${matchingSubRules.join(",")}`);
    }
  });

  const matchesRegex = [...matchesArray];

  return { matchesRegex, maskedConsonants, maskedVowels };
};

const spellingRules = (word) => {
  const patterns_5_3 = [
    // 4x
    "4e",
    "4é",
    "4ei",
    "4éi",
    "4ea",
    "4éa",
    "4i",
    "4í",

    // 4x4
    "4i4",
    "4í4",
    "4ei4",
    "4éi4",

    // 4x
    "4ia", // sciathán
    // ? but not 4ía ?
  ];
  const rules_5_3 = [
    "<e>, <é>  is written alone only at the end of a word",
    "<ei>, <éi>, <i>, <í> are found between slender consonants.",

    // is this, like, "as opposed" to anything?
    "<ia> follows a slender consonant at end of word or before 3.",

    // That is, between "i" and "e",
    // This also must mean "i" or "í"
    "Only <i> appears before a slender consonant.",
    // e and é never appear before a slender consonant
    //***  right, so in a word, you never have [eé][34]
    // 4i ok; 4i + o,u,ú
    // 4e ok; 4e + o, ó, a, á
  ];

  const violations_5_3_regex = [
    // "<e>, <é>  is written alone only at the end of a word",
    /^[eé][34]/, // not alone at beginning
    /[34][eé][34]/, // not alone between
    /[eé]4/, // "Only <i> appears before a slender consonant.",
  ];

  // "observed" patterns
  const patterns_5_4 = [
    // these are redundant to the regex
    // "4ea", "4eá", "4eo", "4io", "4iu", "4iú"
  ];

  const patterns_5_4_regex = [/4i[uúo]/, /4[e][aáoó]/];

  const rules_5_4 = [
    "<i> separates a slender C ('4') from a following <u>, <ú>", // what about "í" i fada?
    /4i[uúo]/,
    "<e> separates it from other vowels.", // presumably, other broad vowel letters?
    /4[e][aáoó] /,
    // this means that both 4eo and 4io are ok
    "Exceptions: C'io (liom, siopa, sioc)", // "o" (regular o) is ok with both of them, then?
  ];

  // so patterns that should not occur?
  const violations_5_4 = [
    // lowercase
    // i
    "4ia", // sciathán (indeed, this is listed as an allowed pattern in 5_3)
    "4iá",
    //     "4io",  //  both 4eo and 4io are ok
    "4ió",
    // e
    "4eu",
    "4eú",
  ];

  const patterns_5_5_regex = [
    //  place <i> before all slender C¢ (4) after a broad vowel (1)
    // redundant to:  "Only <i> appears before a slender consonant.",
    /1i4/, // aiC', áiC', óiC', úiC'
  ];

  const violations_5_5_regex = [
    //  place <i> before all slender C¢ (4) after a broad vowel (1)
    /1[eéí]4/, // [zw - inverse of positive rule from above:] aiC', áiC', óiC', úiC'
  ];

  const patterns_5_slender_consonants_regex = [
    // After a slender C¢ and before a broad V, insert silent <i> before <u>
    // are the converses false?
    // redundant to:  // 4i ok; 4i + o,u,ú
    // 4e ok; 4e + o, ó, a, á
    // what? doesn't this contradict ...
    /4iu/,
    // Before all other [broad?] vowels, insert silent <e>.
    // are the converses false?
    /4e[aáúoó]/,

    // Liom and sioc are exceptions to the two rules above, but though spelled with <o>,
    // they are regularly pronounced as if /u/ in Connacht and Munster,
    // so the insertion can be viewed as following pronunciation rather
    // than the spelling of the vowel that is heard in these dialects.

    // ???

    // After a broad V and before a slender C¢, insert silent <i>.
    /1i4/,
  ];

  const patterns_5_6_regex = [
    // CaC, CáC, CoC, CóC, CuC, CúC, CuaC
    /3[aáoóuú]3/,
    /3ua3/,

    // <a, á, o, ó, u, ú, u> all stand alone on either side of broad consonants.
    // ??
  ];

  const patterns_5_7_regex = [
    // Cuí, Cui, Cao(i), Cae(i)
    //  /3u[ií]/ and /3o[ií]/ combine:
    /3[uo][ií]/,
    /3a[oe]i?/,
    // Rarer Caí (esp. in plurals), Coi, Coí
    /3aí/,
    // now we are talking about SOUNDS:?
    // Before sounds /i/, /i:/ or /e:/ after a broad C, add <u> (normally), <a> or <o>

    // this is spelling => pronunciation,
    // which is supposed to be the next section
    // Between broad Cs <ao> and <ae> replace <í>, <é>.
    /3ao3/,
    /3ae3/, // a violation of CC/LL which I guess happens:
    // laethanta, laethúil, Gaeltacht
  ];

  const patterns_5_8_regex = [
    // íoC, ioC, eaC, éaC, aoC
    /[ií]o3/,
    /ao3/,
    // (i) Before a broad C, insert <a> after <é>,<e>,
    /[eé]a3/,
    // (ii) but <o> after other vowels. ?? what other vowels?! just i/í ?
    //  <ao> is used between two broad consonants.
    //  ? used for what?
  ];

  const patterns_5_broad_consonants_regex = [
    /**
     * 
1. Broad consonants followed by <í> have the letter <u>, or more rarely <a>, in spelling to separate the C from the pronounced V. (The <a> is used most often at the ends of words, before a suffix /i:/, written <-í>).
2. Broad consonants following an <í> usually have an <o> inserted between the V and C.
3. <ae> is used instead of <é> for /e:/ after a broad consonant.
4. <éa> is used instead of <é> after a slender but before a broad consonant.
5. <ao> is used instead of <í>(in Connacht and Ulster) or instead of <é> (in Munster) between two broad consonants.
6. <ui> (and occasionally <oi>) replaces short <i> after a broad and before a slender consonant.
     */

    //  For historical reasons, <aoi> may be found at the end of a word as well as before a slender consonant.
    /3aoi$/,
    /aoi4/,
    /^aoi$/, // my own
  ];

  const knownExceptions = [
    // 5-7
    "laethanta",
    "laethúil",
    "Gaeltacht",
    // 5 - consonant clusters (violating CC-LL)
    "ospidéal",
    "giorria",
    //adverbs like
    "anseo",
    "ansin",
    // and various compounds, like
    "seanbhean",
    "fíorscéal",
    "dodhéanta",
    "sobhriste",
  ];

  const masked = maskConsonants(word);

  const matches = [
    ...new Set([
      ...patterns_5_3.filter((p) => masked.includes(p)),
      ...patterns_5_4.filter((p) => masked.includes(p)),
    ]),
  ];

  const matchesRegex = [
    ...patterns_5_4_regex.filter((p) => p.exec(masked)),
    ...patterns_5_5_regex.filter((p) => p.exec(masked)),
    ...patterns_5_slender_consonants_regex.filter((p) => p.exec(masked)),
    ...patterns_5_6_regex.filter((p) => p.exec(masked)),
    ...patterns_5_7_regex.filter((p) => p.exec(masked)),
    ...patterns_5_8_regex.filter((p) => p.exec(masked)),
    ...patterns_5_broad_consonants_regex.filter((p) => p.exec(masked)),
  ];

  const violations = [
    ...new Set([...violations_5_4.filter((p) => masked.includes(p))]),
  ];

  const violationsRegex = [
    ...violations_5_3_regex.filter((p) => p.exec(masked)),
    ...violations_5_5_regex.filter((p) => p.exec(masked)),
  ];

  return {
    matches,
    matchesRegex,
    violations,
    violationsRegex,
    knownExceptions,
  };
};

const mp = {
  1: "V", // brpad vowel
  2: "V'", // slender vowel
  3: "C", // broad consonant
  4: "C'", // slender consonant
};

const consonantNumbers = ["3", "4"];
const vowelNumbers = ["1", "2"];

const getWidthMask = (word) =>
  word
    .replace(slenderVowelRegex, "2_2")
    .replace(broadVowelRegex, "1_1")
    .split("_")
    .map((c, i) =>
      c
        .replace(/[^12]/g, c.includes("1") ? "3" : "4")
        .substring(i === 0 ? 0 : 1)
    )
    .join("");

const toCV_letters = (word) =>
  [...getWidthMask(word)].map((w) => mp[w]).join("");

const maskConsonants = (word, mask = getWidthMask(word)) =>
  [...word]
    .map((m, i) => (consonantNumbers.includes(mask[i]) ? mask[i] : m))
    .join("");

const maskVowels = (word, mask = getWidthMask(word)) =>
  [...word]
    .map((m, i) => (vowelNumbers.includes(mask[i]) ? mask[i] : m))
    .join("");

//lenitable consonant or mutable-s
function addLenition(lexeme, lenitionCategory) {
  if (lenitables.includes(lexeme.charAt(0))) {
    const [first, ...rest] = lexeme;
    return first + "h" + rest;
  } else if (
    ["s", "S"].includes(lenitables.charAt(0)) &&
    mutableS.includes(lenitables.charAt(1))
  ) {
    const [first, second, ...rest] = lexeme;
    return first + second + "h" + rest;
  }
  return lexeme;
}

const irregularDegreesOfQuality = {
  beag: "lú",
  fada: "faide",
  furasta: "fusa",
  gearr: "giorra",
  maith: "fearr",
  mór: "mó",
  olc: "measa",
  te: "teo",
};

// make adjective comparative and superlative forms
function makeAdjCompForms(sgGenFem, lexeme, fallback) {
  let workingForm = null;

  if (lexeme && irregularDegreesOfQuality.has(lexeme)) {
    workingForm = irregularDegreesOfQuality[lexeme];
  } else if (sgGenFem) {
    workingForm = sgGenFem;
  } else {
    // use fallback data to figure it out
    return {
      comparative: {
        present: ``,
        past: ``,
      },
      superlative: {
        present: ``,
        past: ``,
      },
    };
  }

  // is first letter a vowel?
  // is first letters f + vowel ?
  const startsWithVowel =
    vowels.includes(workingForm.charAt(0)) ||
    (["f", "F"].includes(workingForm.charAt(0)) &&
      vowels.includes(workingForm.charAt(1)));

  //ní b' before a vowel
  const compNegPref = startsWithVowel ? "ní b'" : "ní ba ";

  // "ab" before a vowel
  const supNegPref = startsWithVowel ? "ab " : "ba ";

  // the prefix includes the "space" or else contractions don't look right
  const forms = {
    comparative: {
      present: `níos ${sgGenFem}`,
      past: `${compNegPref}${addLenition(sgGenFem)}`,
    },
    superlative: {
      present: `is ${sgGenFem}`,
      past: `${supNegPref}${addLenition(sgGenFem)}`,
    },
  };

  return forms;
}

const carnieAdjectives = {
  ábhartha: "mA, fA, a0, (mgs./fgs./pl. ~), material; relevant.",
  ábalta: "mA, fA, a0, (mgs./fgs./pl. ~), able, able bodied.",
  abartha: "mA, fA, a0, (mgs./fgs./pl. ~), witty.",
  ábhailleach:
    "mH1, fH2, a2.3, (mgs. ábhailligh, fgs. ábhaillí, cp. ábhailleacha), playful, mischievous.",
  ábhal:
    "mB1, fD5, a2.3, (mgs. ábhail, fgs. áibhle, cp. ábhala), great, immense.",
  ábhalmhór:
    "mB1, fD2, a2.3, (mgs. ábhalmhóir, fgs. ábhalmhóire, cp. ábhalmhóra), colossal.",

  díoscánach:
    "mH1, fH2, a2.3, (mgs. díoscánaigh, fgs. díoscánaí, cp. díoscánacha), creaky, grating, rasping.",
};

const keycodeMap = {
  z: "ulster",
  x: "connacht",
  c: "munster",
};

const keycodeHandlers = async function (event) {
  switch (event.key) {
    case "z": {
      playAudio(getAudioId(getCardLexeme(), keycodeMap["z"]));
      break;
    }
    case "x": {
      playAudio(getAudioId(getCardLexeme(), keycodeMap["x"]));
      break;
    }
    case "c": {
      playAudio(getAudioId(getCardLexeme(), keycodeMap["c"]));
      break;
    }
    case "9": {
      toggleVisibility("hints-bearla");
      break;
    }
    case "0": {
      toggleVisibility("hints-phonetic");
      break;
    }
    case "8": {
      toggleVisibility("hints-bearla-notes");
      break;
    }
    case "w": {
      toggleVisibility("hints-phonetic");
      toggleVisibility("hints-bearla");
      toggleVisibility("hints-bearla-notes");
      break;
    }
    case "j": {
      log("[j] pressed");
      doInterferenceClusterAlert();
      break;
    }
    // (mac) command key
    case "Meta": {
      initDict();
      toggleVisibility("logger");
      break;
    }
    case "Shift": {
      initAll();
      break;
    }

    case "q":
    case "u":
      myAlert(getCardLexeme());
      break;

    case "p": {
      doInterferenceClusterForm();
      break;
    }

    case "g": {
      const html = initPatterns();
      const dialogId = "pronunciation-dialog";
      if (isAnswerSide()) {
        const portalEl = setInnerHTML(
          "dialog-portal",
          /*html */ `<dialog id="${dialogId}">${html}</dialog>`
        );
        if (portalEl) {
          const dialogEl = document.getElementById(dialogId);
          if (dialogEl) {
            dialogEl.showModal();
          } else {
            myAlert("No dialogEl");
          }
        } else {
          myAlert("Could not set HTML");
        }
      } else {
        myAlert("Wait for the answer!");
      }

      break;
    }
    case "h":
    case "k":
    case "l":
    case ";":
    case "'":
    case "[":
    case "]":
    case ".":
    case ",":
    case "m":
    case "n":
    case "v":
    default:
      break;
  }
};

document.removeEventListener("keydown", keycodeHandlers);

// Shortcut keys
document.addEventListener("keydown", keycodeHandlers, false);

/**
 * Get the word that the specific CARD (rather than the general NOTE)
 * is associated with. It should be on the [data-card] attribute
 * of the data div.
 */
function getCardLexeme() {
  const lexeme = getData("lexeme");
  const card = getData("card");

  return !card || card === lexeme ? lexeme : card;
}

function isElActive(id) {
  const el = document.getElementById(id) ?? null;
  if (el && el.style) {
    return el.style.display !== "none";
  }
  return false;
}

function isEl(id) {
  return document.getElementById(id) ?? false;
}

/**
 * Opens default ALERT dialog box provided by global window object
 */
function myAlert(msg) {
  window.alert(msg);
}

function toggleVisibility(id) {
  const el = document.getElementById(id) ?? null;
  if (el && el.style) {
    el.style.display = el.style.display === "none" ? "inherit" : "none";
  }
}

function getLogElement() {
  return document.getElementById("logger") ?? null;
}

const logQueue = [];
const logMax = 15;
let logCount = 0;
let particularMessageCount = 1;
let lastMessage = "";

function log(msg) {
  if (!msg) {
    return;
  }

  logCount++;
  cumulativeMessage = "";

  if (msg === lastMessage) {
    particularMessageCount++;
    logQueue.shift();
  } else {
    particularMessageCount = 1;
    lastMessage = msg;
  }
  if (particularMessageCount > 1) {
    cumulativeMessage = ` (${particularMessageCount})`;
  }

  logQueue.unshift(`${logCount}-${Date.now()}-${msg}${cumulativeMessage}`);
  while (logQueue.length > logMax) {
    logQueue.pop();
  }

  const el = getLogElement();
  if (el) {
    let html = "";

    for (let i = 0; i < logQueue.length; i++) {
      html += /*html*/ `<div class="log-message">${logQueue[i]}</div>`;
    }

    el.innerHTML = html;
  }
}

function setAudioFallbackDisplayStyle(param) {
  const audioFallback = document.getElementById("audio-fallback");

  if (audioFallback && audioFallback.style) {
    audioFallback.style.display = param;
    audioFallback.style.outline = "thick solid red";
  }
}

/**
 *
 *
 * @param {*} param
 */
function setAudioOkDisplayStyle(param) {
  const el = document.getElementById("audio-portal");
  if (el && el.style) {
    el.style.outline = "thick solid yellow";
    el.style.display = param;
  }
  if (param === "none") {
    log("Unable to retrieve audio from server.");
  }
}

// play audio for audio source with given id
function playAudio(id) {
  const el = document.getElementById(id);
  // myAlert("playAudio el:" + el);
  if (el) {
    el.play();
  }
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    initApplication();
  }
};

function nonEmptyArray(obj) {
  if (!obj) {
    return false;
  } else if (!Array.isArray(obj)) {
    return false;
  } else if (obj.length === 0) {
    return false;
  }
  return true;
}

/**
 *
 *
 * @returns
 */
const getAudioEls = (_lexeme) => {
  const lexeme = !!_lexeme ? _lexeme : getCardLexeme();

  const locations = ["connacht", "ulster", "munster"];

  return locations.map((l) => ({
    location: l,
    element: document.getElementById(getAudioId(lexeme, l)),
    button: document.getElementById(getAudioButtonId(lexeme, l)),
  }));
};

function setAudioAutoplay() {
  // myAlert("setAudioAutoplay");
  const elements = getAudioEls();

  // get random location index
  const rand = getRandomInt(elements.length + 1);

  // set autoplay where rand = index
  elements.forEach((el, index) => {
    const autoplay = rand === index;
    // el.element.autoplay = autoplay;
    if (autoplay) {
      // change color of corresponding button
      el.element.play();
      el.button.style.background = "lightblue";
    }
  });
}

function initAudio(rand = false) {
  if (NOTES_USING_AUDIO_PORTAL.includes(getData("note"))) {
    // put buttons and links in audio portal
    setInnerHTML("audio-portal", htmlAudioPerLexeme(null, false));
  }
  // activate audio html

  const elements = getAudioEls();

  try {
    elements.forEach((el) => {
      el.element.addEventListener("error", () => {
        setAudioFallbackDisplayStyle("inherit");
        setAudioOkDisplayStyle("none");
        audioError = true;
      });
    });
  } catch (error) {
    // this error will happen if there is manual audio, which is fine
    log("elements.forEach error" + error);
  }

  // If we should play a random location's audio,
  // and it's not the back of the card
  // then set autoplay on a random audio element
  if (rand && !isElActive("answer")) {
    setAudioAutoplay();
  }
}

function htmlExamples(examples) {
  let html = "";

  if (nonEmptyArray(examples)) {
    html += /*html*/ `<ul>`;
    for (const example of examples) {
      html += /*html*/ `<li class="sense-example">`;
      if (example.gaelic) {
        html += /*html*/ `<span class="gaelic example">${example.gaelic}</span>`;
      }
      // not sure why there would be béarla without gaelic
      if (example.béarla) {
        html += /*html*/ `<span class="bearla example">${example.béarla}</span>`;
      }

      html += /*html*/ `</li>`;
    }
    html += /*html*/ `</ul>`;
  }
  return html;
}

/**
 * Create and set card-back html for lexemes found in "Dictionary"
 * (when anki note=dict)
 *
 * @param {*} lexeme
 */
function setDictDisplay(lexeme) {
  const béarlaEl = document.getElementById("bearla-back");

  log("setDictDisplay");

  let html = "";

  if (béarlaEl) {
    for (const listing of Dictionary[lexeme].listings) {
      html += /*html*/ `<div class="listing">`;

      // start div.listing-title
      html += /*html*/ `<div class="listing-title">`;

      html += /*html*/ `<span class="listing-title gaelic">${listing.title}</span>`;

      if (listing.equates) {
        html += /*html*/ ` = <span class="listing-title-equates gaelic">${listing.equates}</span>`;
      } else if (nonEmptyArray(listing.partOfSpeech)) {
        for (const part of listing.partOfSpeech) {
          // html += `<span class="listing-part-of-speech hover-text">${part} <span class="tooltip-text">I'm a tooltip!</span>  </span>`;
          html += /*html*/ `<span class="listing-part-of-speech">${part}</span>`;
        }
      }

      // end div.listing-title
      html += /*html*/ `</div>`;

      if (listing.senses) {
        html += /*html*/ `<div class="listing-senses-wrapper">`;
        if (listing.senses.general) {
          html += /*html*/ `<div class="listing-sense-general">${listing.senses.general}</div>`;
        }
        if (listing.senses.examples) {
          if (nonEmptyArray(listing.senses.examples)) {
            html += htmlExamples(listing.senses.examples);
          }
        }

        if (nonEmptyArray(listing.senses.enumerated)) {
          html += /*html*/ `<div class="listing-senses">`;
          html += /*html*/ `<ol>`;
          for (const sense of listing.senses.enumerated) {
            html += /*html*/ `<li class="listing-sense-item">`;
            if (nonEmptyArray(sense.partOfSpeech)) {
              for (const part of sense.partOfSpeech) {
                html += /*html*/ `<span class="listing-part-of-speech">${part}</span>`;
              }
            }
            if (sense.gloss) {
              html += /*html*/ `<span class="listing-sense-item-gloss">${sense.gloss}</span>`;
            }

            html += htmlExamples(sense.examples);

            // end listing-sense-item
            html += /*html*/ `</li>`;
          }
          // end  `<ol class="listing-senses">`
          html += /*html*/ `</ol>`;
          // end `<div class="listing-sense-item">`;
          html += /*html*/ `</div>`;
        }

        // end  div class="listing-senses-wrapper"
        html += /*html*/ `</div>`;
      }

      // end div.listing
      html += /*html*/ `</div>`;
    }

    béarlaEl.innerHTML = html;
  }
}

/**
 * Locate lexeme in forms (declensions, inflections, variants)
 * of another headword
 *
 * @param {*} lexeme
 * @returns
 */
function findSubformMatches(lexeme) {
  const allMatches = [];

  for (const word of Object.keys(Dictionary)) {
    if (nonEmptyArray(Dictionary[word].listings)) {
      Dictionary[word].listings.forEach((listing, index) => {
        if (nonEmptyArray(listing.forms)) {
          const matches = listing.forms.filter((form) =>
            Object.hasOwn(form, lexeme)
          );
          if (nonEmptyArray(matches)) {
            allMatches.push({
              matches,
              index,
              headword: word,
            });
          }
        }
      });
    }
  }

  return allMatches;
}

function setSubForms(allMatches) {
  // setDictDisplay(headword);

  if (nonEmptyArray(allMatches)) {
    const el = document.getElementById("sub-forms");
    if (el) {
      let html = "";

      // header
      html += /*html*/ `<div class="sub-forms-header">Matches found:</div>`;

      for (const match of allMatches) {
        // start wrapper
        html += /*html*/ `<div class="sub-forms-matches-wrapper">`;
        html += /*html*/ `<div class="sub-forms-matches-headword><span class="gaelic">${match.headword}</span>`;
        html += /*html*/ `<span class="headword-index">${
          +match.index + 1
        }</span></div>`;
        html += /*html*/ `<ul class="sub-forms-matches-list">`;
        for (const m of match.matches) {
          for (const entry of Object.entries(m)) {
            html += /*html*/ `<li class="sub-forms-matches-item">`;
            html += /*html*/ `<span class="gaelic">${entry[0]}</span>`;
            html += /*html*/ `<span class="bearla grammar">${entry[1]}</span>`;
            html += /*html*/ `</li>`;
          }
        }
        html += `</ul>`;
        // end wrapper
        html += `</div>`;
      }

      el.innerHTML = html;
    }
  }
}

function doInterferenceClusterForm(_lexeme) {
  const lexeme = !!_lexeme ? _lexeme : getData("lexeme");

  if (lexeme) {
    log("doInterferenceClusterForm: " + lexeme);

    // nested function
    function doInterferenceClusterFormCb(clusters) {
      if (clusters) {
        log("doInterferenceClusterFormCb clusters[0]: " + clusters[0]);
        if (nonEmptyArray(clusters)) {
          const formHtml = htmlFormInterferenceCluster(clusters);
          setForm(formHtml);
        }
      } else {
        myAlert("No clusters.");
      }
    }

    getAllInterferenceClusters(lexeme, doInterferenceClusterFormCb);
  } else {
    myAlert("No lexeme.");
  }
}

/**
 * @optionArray {value, text}[]
 * @returns html string for array of options (as in a select element)
 */
function htmlOptions(options) {
  try {
    return Array.isArray(options)
      ? options
          .sort((a, b) => a.text.localeCompare(b.text))
          .reduce(
            (prev, { value, text }) =>
              /*html*/ `${prev}<option value="${value}">${text}</option>`,
            ""
          )
      : "";
  } catch (error) {
    myAlert("htmlOptions Error: " + error);
    return "";
  }
}

function htmlPronunciationDialog(html) {
  try {
    return /*html*/ `<dialog id="pronunciation-dialog">
${html}
    </dialog>`;
  } catch (error) {
    myAlert(error);
    return "";
  }
}

/**
 * Form to add current lexeme to an interference cluster
 *
 * @param {*} clusters
 * @returns {string} html for form
 */
function htmlFormInterferenceCluster(clusters) {
  try {
    const optionsArray = clusters.map((cluster) => ({
      value: cluster.id,
      text: Object.keys(cluster.cluster).join(", "),
    }));

    return /*html*/ `<dialog id="fav-dialog">
      <form>
        <p>
          <label>
            Add to interference cluster:
            <select>
            <option value="new" selected>Create New Cluster</option>
            ${htmlOptions(optionsArray)}
            </select>
          </label>
        </p>
        <p>
        <label>
            Concise definition: <input type="text" id="definition" />
        </label>
        </p>
        <div>
          <button value="cancel" formmethod="dialog">Cancel</button>
          <button id="confirmBtn" value="default">Confirm</button>
        </div>
      </form>
    </dialog>`;
  } catch (error) {
    myAlert(error);
    return "";
  }
}

function setForm(formHtml) {
  const el = document.getElementById("dialog-portal");
  if (el) {
    el.innerHTML = formHtml;
    jsForm();
  }
}

function jsForm() {
  const favDialog = document.getElementById("fav-dialog");
  const defInput = document.getElementById("definition");
  const selectEl = favDialog.querySelector("select");
  const confirmBtn = favDialog.querySelector("#confirmBtn");

  defInput.addEventListener("keydown", (e) => {
    e.stopPropagation();
  });

  // "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
  favDialog.addEventListener("close", (e) => {
    try {
      let { id, definition } =
        favDialog.returnValue === "default" // Have to check for "default" rather than empty string
          ? { id: null, definition: null }
          : JSON.parse(favDialog.returnValue);

      if (id) {
        add(
          ENDPOINTS.INTERFERES,
          { key: getCardLexeme(), value: definition },
          id === "new" ? null : id
        );
      }
    } catch (error) {
      // @todo - hitting "Cancel" generates bad data for JSON.parse
      log("favDialog.addEventListener Error: " + error);
    }
  });

  // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
  confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form
    favDialog.close(
      JSON.stringify({ id: selectEl.value, definition: defInput.value })
    ); // Have to send the select box value here.
  });

  favDialog.showModal();
}

function getAudioId(lexeme, location) {
  if (!location || !lexeme) {
    // myAlert("getAudioId must receive lexeme and location");
  }

  const id = `audio-${location}-${lexeme}`.replaceAll(" ", "-");
  return id;
}

/**
 *
 *
 * @param {*} lexeme
 * @param {*} location
 * @returns {string} id
 */
function getAudioButtonId(lexeme, location) {
  if (!location || !lexeme) {
    // myAlert("getAudioButtonId must receive lexeme and location");
  }

  const id = `audio-${location}-${lexeme}-button`.replaceAll(" ", "-");
  return id;
}

function htmlAudioButton(lexeme, location) {
  return /*html*/ `<button 
		id="${getAudioButtonId(lexeme, location)}" 
		class="audio-control-play"
		onclick="playAudio('${getAudioId(lexeme, location)}')"
	>${location}</button>`;
}

function htmlAudioLink(lexeme, location, src) {
  if (!lexeme || !location || !src) {
    myAlert("Audio link requires lexeme and location");
  }

  const html = /*html*/ `<audio id="${getAudioId(
    lexeme,
    location
  )}" preload="auto" src="${src}"></audio>`;
  return html;
}

function htmlAudioLinks(lexeme, location) {
  const upper = location.charAt(0).toUpperCase();
  const fuaimsMap = {
    ulster: 1,
    connacht: 3,
    munster: 2,
  };

  src = "";

  const tags = getData("tags");

  if (tags.includes("fuaims")) {
    const url = getData("url");

    src = `${BASE_URL.FUAIMEANNA_IE}${url.replaceAll(
      "1",
      fuaimsMap[location]
    )}`;
  } else {
    src = `${BASE_URL.TEANGLANN_IE}/Can${upper}/${lexeme}.mp3`;
  }

  return htmlAudioLink(lexeme, location, src);
}
/**
 * @param {string} lexeme headword with available pronunciation
 * @returns {string} html for (3) audio buttons and links for given lexeme
 */
function htmlAudioPerLexeme(_lexeme, showLexeme = true) {
  const lexeme = !!_lexeme ? _lexeme : getCardLexeme();

  const locations = ["ulster", "connacht", "munster"];
  let html = "";

  html += /*html*/ `<div class="audio-wrapper">`;

  if (showLexeme) {
    html += /*html*/ `<div class="gaelic lexeme">${lexeme}</div>`;
  }

  html += /*html*/ `<div class="audio-controls-${lexeme}">`;
  locations.forEach((l) => {
    html += htmlAudioButton(lexeme, l);
  });

  html += /*html*/ `</div>`; // end audio-controls
  html += /*html*/ `<div class="audio-elements">`;

  locations.forEach((l) => {
    html += htmlAudioLinks(lexeme, l);
  });

  html += /*html*/ `</div>`; // end audio-elements
  html += /*html*/ `</div>`; // end audio-wrapper

  return html;
}

/**
 *
 *
 * @param {*} id
 * @returns {string} the value of the [data-"id"] attribute
 */
function getData(id) {
  const dataEl = document.getElementById("data-div");
  if (dataEl && dataEl.dataset) {
    return dataEl.dataset[id];
  }
  return null;
}

function initDict() {
  log("initDict");

  const lexeme = getData("lexeme");

  // a "clusterLexeme" is a lexeme that is confused with others.
  // this card type will display audio links for all the confused lexemes
  // but does not have any definitional information.
  const clusterLexeme = getData("clusterLexeme");

  if (lexeme) {
    log("initDict:" + lexeme);
    if (Object.hasOwn(Dictionary, lexeme)) {
      try {
        setDictDisplay(lexeme);
      } catch (e) {
        log(`Error from setDictDisplay(${lexeme}): ` + e);
      }
    } else {
      try {
        const matches = findSubformMatches(lexeme);
        if (nonEmptyArray(matches)) {
          setSubForms(matches);
        } else {
          log("No Subform Matches found.");
        }
      } catch (e) {
        log("findSubformMatches / setSubForms error: " + e);
      }
    }
  } else if (clusterLexeme) {
    log("cluster lexeme: " + clusterLexeme);
    setInterferenceClusterDisplay(clusterLexeme);
  }
}

function initPotaFocalLink() {
  const linkEl = document.getElementById("pota-focal-link-wrapper");
  const lexeme = getData("lexeme");

  if (linkEl && lexeme) {
    function initPotaFocalLinkCb(data) {
      if (data.includes(lexeme)) {
        linkEl.style.display = "inherit";
      }
    }

    get("potafocal", initPotaFocalLinkCb);
  }
}

function get(url, cb) {
  log("get from " + url);
  const xhr = new XMLHttpRequest();
  xhr.onload = (res) => {
    if (res.target.status == 200) {
      log("res.target.status == 200 " + res.target.responseText);
      const parsed = JSON.parse(res.target.responseText);
      cb(parsed);
    }
  };
  xhr.open("GET", `${BASE_URL.LOCALHOST}${url}`, true);
  xhr.send();
}

/**
 * PATCH/POST request to server
 *
 * @param {*} url
 * @param {*} _data
 * @param {*} id
 */
function add(url, _data, id) {
  const data = _data;

  if (!id) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE_URL.LOCALHOST}${url}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        cluster: {
          [data.key]: data.value,
        },
      })
    );
  } else {
    function cb(parsed) {
      if (parsed) {
        try {
          const xhr = new XMLHttpRequest();
          delete parsed.id;
          parsed.cluster[data.key] = data.value;
          xhr.open("PATCH", `${BASE_URL.LOCALHOST}${url}/${id}`, true);
          xhr.setRequestHeader("Content-Type", "application/json");

          xhr.send(JSON.stringify(parsed));
        } catch (e) {
          myAlert("add Error: " + e);
        }
      }
    }
    get(`${url}/${id}`, cb);
  }
}

function getAllInterferenceClusters(lexeme, cb) {
  log("getInterferenceCluster receiving lexeme: " + lexeme);

  function getAllInterferenceClustersCb(data) {
    log("getInterferenceClusterCb typeof data:" + typeof data);
    const clusters = data ?? [];

    cb(clusters);
  }
  get(`interferesIds`, getAllInterferenceClustersCb);
}

function getInterferenceCluster(lexeme, cb) {
  log("getInterferenceCluster receiving lexeme: " + lexeme);

  function getInterferenceClusterCb(data) {
    log("getInterferenceClusterCb typeof data:" + typeof data);
    const cluster = data.filter((d) => Object.keys(d.cluster).includes(lexeme));

    cb(cluster.length ? cluster[0].cluster : null);
  }

  get(`interferesIds`, getInterferenceClusterCb);
}

function doInterferenceClusterAlert(_lexeme, excludeSelf = true) {
  const lexeme = !!_lexeme ? _lexeme : getData("lexeme");

  if (lexeme) {
    log("getInterferenceClusterAlertString: " + lexeme);
    function getInterferenceClusterAlertStringCb(cluster) {
      log("getInterferenceClusterAlertStringCb");

      if (cluster) {
        log("getInterferenceClusterAlertStringCb cluster: " + cluster);
        if (Object.keys(cluster).length) {
          let str = "";

          for (const k of Object.keys(cluster)) {
            if (k !== lexeme || !excludeSelf) {
              str += `${k} (${cluster[k]})  <br>`;
            }
          }
          myAlert(`<p>${str}</p>`);
        }
      } else {
        myAlert("No cluster.");
      }
    }

    getInterferenceCluster(lexeme, getInterferenceClusterAlertStringCb);
  } else {
    myAlert("No lexeme.");
  }
}

function setInterferenceClusterDisplayCb(cluster) {
  let html = "";

  if (cluster) {
    //
    log("cluster keys" + Object.keys(cluster));
    const el = document.getElementById("audio-portal");
    log("display cluster? " + el);
    if (!el) {
      myAlert("Could not find where to put html.");
      return;
    }

    Object.keys(cluster).forEach((c) => {
      html += htmlAudioPerLexeme(c);
    });

    el.innerHTML = html;
  } else {
    myAlert("Could not find interference cluster for lexeme: " + lexeme);
  }
}

function setInterferenceClusterDisplay(lexeme) {
  getInterferenceCluster(lexeme, setInterferenceClusterDisplayCb);
}

/**
 * @param {string} id HTML id attribute of element
 * @param {*} str HTML to bind to innerHTML of element
 * @returns {HTMLElement}
 */
function setInnerHTML(id, str) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = str;
  }
  return el ?? null;
}

// table id="carnie-adjective-declension-table"
function initCarnieAdjectiveDeclension() {
  const linkEl = document.getElementById("carnie-adjective-declension");

  if (linkEl) {
    const lexeme = linkEl.dataset.lexeme;
    log(linkEl.dataset.lexeme);

    // adjective is listed in the carnie array
    if (Object.keys(carnieAdjectives).includes(lexeme)) {
      const data = carnieAdjectives[lexeme];
      log(linkEl.innerHTML);
      linkEl.innerHTML = "Carnie declension class: " + data;
      linkEl.style.display = "inherit";

      // "mA, fA, a0, (mgs./fgs./pl. ~), material; relevant."
      const [mDecl, fDecl, plDecl, ...rest] = data.split(", ");

      if (mDecl === "mA") {
        setInnerHTML("sg-nom-masc", lexeme);
        setInnerHTML("sg-gen-masc", lexeme);
      }
      if (fDecl === "fA") {
        setInnerHTML("sg-nom-fem", lexeme);
        setInnerHTML("sg-gen-fem", lexeme);
      }
      if (plDecl === "a0") {
        setInnerHTML("pl-nom-masc", lexeme);
        setInnerHTML("pl-gen-masc", lexeme);
        setInnerHTML("pl-nom-fem", lexeme);
        setInnerHTML("pl-gen-fem", lexeme);
      }

      const qualityForms = makeAdjCompForms(lexeme, data);
      setInnerHTML("comp-pos", qualityForms.comparative.present);
      setInnerHTML("comp-neg", qualityForms.comparative.past);
      setInnerHTML("sup-pos", qualityForms.superlative.present);
      setInnerHTML("sup-neg", qualityForms.superlative.past);
    }
  }
}

// only one interval at a time, please
let intervalsGoing = false;
let audioError = false;
let currentLexeme = null;
let currentLexemeAnswerSideInitialized = false;
let attemptedAutoplay = false;

function isAnswerSide() {
  return !!document.getElementById("answer");
}

function initAll() {
  log("allInits");
  audioError = false;
  currentLexeme = getData("lexeme");
  currentLexemeAnswerSideInitialized = false;
  initAudio(true);
  initPotaFocalLink();
  initCarnieAdjectiveDeclension();
  initPatterns();

  if (!intervalsGoing) {
    log("setInterval");
    setInterval(function () {
      if (isAnswerSide()) {
        initDict();

        if (!audioError && !currentLexemeAnswerSideInitialized) {
          initAudio(false);
          initPatterns();
          currentLexemeAnswerSideInitialized = true;
        }
      } else {
        log("initDict interval, but Answer Side not showing.");
      }
    }, INTERVAL_INIT_DICT);
    intervalsGoing = true;
  }
}

function initApplication() {
  // Select the node that will be observed for mutations
  const targetNode = document.getElementsByTagName("body")[0];

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: false, subtree: false };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, _observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        // do nothing
      } else if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        initAll();
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  initAll();
}
