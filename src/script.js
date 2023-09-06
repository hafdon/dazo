/**
 * <script type="text/javascript" src="_script.js"></script>
 * 
 * @todo - dialog that shows other words (with clickable pronunciations) that have
 *         the same spelling, for sound comparison.
 * @todo - something like: this word has these spelling parts. they are usually
 *         pronounced like this. Do they match?
 */

import './style.css'

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
      regexes: [/cn/i],
      examples: [["cnoc", "cnaígh"], "tionscnamh"],

      ulster: ["/kr/", "/sk(ə)n"],
      connacht: ["/kr/", "/sk(ə)n"],
      munster: ["/kn/", "/sk(ə)n"],
    },
    {
      regexes: [/a?ígh/i],
      examples: ["cnaígh", "caígh"],
      ulster: ["/i/", "/(w)i/"],
      connacht: ["/i/", "/wi/"],
      munster: ["/ig/", "/wig/"],
    },
    {
      regexes: [/éig/i],
      examples: ["tréig"],
      ulster: ["/eg/"],
      connacht: ["/eg/"],
      munster: ["/eg/"],
    },
    {
      regexes: [/un/i],
      ulster: ["/un/", "ʌn"],
      connacht: ["/ʌn/", ""],
      munster: ["/un/", ""],
      examples: ["suntasach", "bunúsach"],
    },
    {
      regexes: [/ío[nsl]?/i],
      examples: [
        ["cíos", "aníos"],
        ["díon", "comhlíon", "síol"],
        "faitíos",
        "díospóireacht",
      ],
      ulster: ["/i/", "/i/", "/i/", "ɪ"],
      connacht: ["/i(ə)/", "/i(ə)/", "/i/", "/i/"],
      munster: ["/i/", "/i(ə)/", "/i(ə)/", "/i/"],
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
        ["bunúsach", "ribeach", "suntasach", "bainteach"],
        "criosach",
        ["gach", "coirpeach"],
        "clúiteach",
      ],
      ulster: ["/ä(x)/", "/ʌ/", "/ä(x)/ [stressed]", "/ʌ/"],
      connacht: ["/ʌx/", "/ʌx/", "/äx/ [stressed]", "/jʌx/"],
      munster: ["/ʌx/", "/ʌx/", "/äx/ [stressed]", "/ʌx/"],
    },
    //
    {
      regexes: [/omhai/i],
      examples: ["comhairleoir"],
      ulster: ["/o/"],
      connacht: ["/o/"],
      munster: ["/o/"],
    },
    {
      regexes: [/iath/i],
      examples: ["briathar"],
      ulster: "/ih/",
      connacht: "/i/",
      munster: "/ih/",
    },
    {
      regexes: [/ne/i],
      examples: ["cine", "cúinne"],
      ulster: ["/njɛ/", "/njɛ/"],
      connacht: ["/nə/", "/njɛ/"],
      munster: ["/nə/", "/nɛ/"],
    },
    {
      regexes: [/odh/i],
      examples: ["todhchaí"],
      ulster: "/e/",
      connacht: "/aʊ/",
      munster: "/aʊə/",
    },
    {
      regexes: [/cheall/i],
      examples: ["dícheall"],
      ulster: "/həl/",
      connacht: "/əl/",
      munster: "/həl/",
    },
    {
      regexes: [/ath/i],
      examples: ["brath"],
      ulster: "/e/",
      connacht: "/ä/",
      munster: "/ä(h)/",
    },
    {
      regexes: [/ádh/i],
      examples: ["ádh"],
      ulster: "/aʊ/",
      connacht: "/ɔ/",
      munster: "/ɔ/",
    },

    {
      regexes: [/obhadh/i],
      examples: ["críonlobhadh"],
      ulster: ["/o/"],
      connacht: ["/aʊə/"],
      munster: ["/aʊə/"],
    },
    {
      regexes: [/oich/i],
      examples: ["sroich"],
      ulster: "/əɪ ('like')/",
      connacht: "/ʌ/",
      munster: "/ʌ/",
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
      examples: [["montach", "planda"], "splanc"],
      ulster: ["/än/", "/än/"],
      connacht: ["/än/", "/æn/"],
      munster: ["/aʊn/", "/aʊn/"],
    },
    {
      regexes: [/úin/i],
      examples: ["múin"],
      ulster: ["/un"],
      connacht: ["/u(ə)n/"],
      munster: ["/un/"],
    },
    {
      regexes: [/aitheamh/i],
      examples: ["i gcaitheamh"],
      ulster: ["/ähoʊ/"],
      connacht: ["/ä/"],
      munster: ["/ähəv/"],
    },
    {
      regexes: [/urr/i],
      examples: ["urraim"],
      ulster: ["/ɛr/ ('erin')"],
      connacht: ["/ʊr/"],
      munster: ["/or/"],
    },
    {
      regexes: [/om/i],
      examples: ["tromlach"],
      ulster: ["/ʌm/"],
      connacht: ["/ʌm/"],
      munster: ["/aʊm/"],
    },
    {
      regexes: [/íomh/i],
      examples: ["gníomh"],
      ulster: ["/iu/"],
      connacht: ["/iu/"],
      munster: ["/iəv/"],
    },
    {
      regexes: [/áith/i],
      examples: ["cáith", "láithreach"],
      ulster: ["/aɪ/", "/əɪ/ ('like')"],
      connacht: ["/ɔ/", "/ɔ(ɪ)/"],
      munster: ["/ɔ/", "/ɔɪ/ ('boy')"],
    },
    {
      regexes: [/gn/i],
      examples: [
        ["gnúsacht", "gné", "gnóthaigh"],
        ["gníomhach", "gníomh"],
      ],
      ulster: ["/gr/", "/gr/"],
      connacht: ["/gn/", "/gr/"],
      munster: ["/gn/", "/gn/"],
    },
    {
      regexes: [/obha/i],
      examples: ["dobhareach"],
      ulster: ["/o/"],
      connacht: ["/aʊ(ə)/"],
      munster: ["/aʊ(ə)/"],
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
      examples: [
        "cothaigh",
        ["confadh", "dochar", "trom"],
        "moltach",
        ["cosain", "coscán"],
      ],
      ulster: ["/ɔ/", "/ʌ/", "/o/", "/ä/"],
      connacht: ["/ʌ/", "/ʌ/", "/o/", "/ʌ/"],
      munster: ["/ʌ/", "/ʌ/ or /(aʊ)/ with trom", "/o/", "/ʌ/"],
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
      regexes: [/i?(?<!í)om/i],
      // DO NOT match íom (i-fada, o, m)
      // just iom (regular i, o, m)
      // this WILL match íiom, but I will cross that bridge when I come to it
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
      examples: ["gaineamh", "neamhspleách", "fuinneamh"],
      ulster: ["/ɪv/", "/æv/", "/u/"],
      connacht: ["/ə/", "/æv/", "/jəv/"],
      munster: ["/ɪv/", "/æv/", "/əv/"],
    },

    {
      regexes: [/nf[^h]/i],
      examples: ["confadh"],
      ulster: ["/nəf/ [epenthesis]"],
      connacht: ["/nf/"],
      munster: ["/nf/"],
    },
    {
      regexes: [/mn/i],
      examples: ["imní"],
      ulster: ["/mn/"],
      connacht: ["/mr/"],
      munster: ["/mn/"],
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
      regexes: [/nch\b/i],
      examples: ["seanchas"],
      ulster: "/n(ə)h/",
      connacht: "/n(ə)h/",
      munster: "/n(ə)x/",
    },
    {
      regexes: [/éa/i],
      examples: [["méadaigh", "séan"], "téacs", ["déanach", "péac"]],
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
      regexes: [/^ai[bcdefhlmnprt]/i],
      examples: ["Aibreán"],
      notes: "Ulster",
      ulster: "/ɛ/",
      connacht: "/aɪ/",
      munster: "/ə/ (?)",
    },
    {
      regexes: [/[eu]?acht/i],
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
      regexes: [/mú/i],
      examples: ["amú"],
      ulster: ["/maʊ/"],
      connacht: ["/mu/"],
      munster: ["/mu/"],
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
      examples: [["formhór", "ullmhaigh"], "tréimhse", "gníomhach"],
      ulster: ["/w/", "/v/", "/w/"],
      connacht: ["/w/", "/v/", "/v/"],
      munster: ["/v/", "/v/", "/v/"],
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
      examples: ["smaointe", "saoire", "maoin"],
      ulster: ["/wi/", "/i/", "/wi/"],
      connacht: ["/wi/", "/i/", "/wi(ə)/"],
      munster: ["/wi/", "/i/", "/wi/"],
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
      examples: [["meitheal", "ceil"], "seisear"],
      ulster: ["/ɛ/", "/ɪ/"],
      connacht: ["/ɛ/", "/ɛ/"],
      munster: ["/ɛ/", "/ɛ/"],
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
      examples: [["daor", "craol"], "aonad", "caora", "aonach"],
      ulster: ["/i/", "/e/", "/i/", "/i/"],
      connacht: ["/i/", "/e(ə)/", "/wi/", "/i(ə)/"],
      munster: ["/eə/", "/e(ə)/", "/wi/", "/e(ə)/"],
    },
    {
      regexes: [/ionn?/i],
      examples: [["iontas", "tionscnamh"], "sionnach", "ionadh", "ionadaí"],
      ulster: ["/ʌn/", "/ən/ [unstressed]", "/in/", "/ɛn/"],
      connacht: ["/in/", "/ən/ [unstressed]", "/i(ə)n/", "/ʌn/"],
      munster: ["/un/", "/ən/ [unstressed]", "/un /", "/ʌn/"],
    },
    {
      regexes: [/eoi?/i],
      examples: ["teorainn", "ainneoin"],
      ulster: ["/o/"],
      connacht: ["/o/"],
      munster: ["/o/", "/o(ə)/"],
    },
    {
      regexes: [/u/i],
      examples: ["ucht"],
      ulster: ["/ʌ/"],
      connacht: ["/ʊ/"],
      munster: ["/ʊ/"],
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
      examples: ["fearg", "léargas"],
      ulster: ["/rəg/ [epenthesis]", "/rg/ [no epenthesis]"],
      connacht: ["/rəg/ [epenthesis]", "/rg/ [no epenthesis]"],
      munster: ["/rəg/ [epenthesis]", "/rg/ [no epenthesis]"],
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
      regexes: [/nái/i],
      examples: [["náisiúnta", "náire"]],
      ulster: ["/æ/"],
      connacht: ["/ɔ/"],
      munster: ["/ɔ/"],
    },

    {
      regexes: [/e?ái?/i],
      examples: [
        ["áis", "sáraigh", "cláraigh"],
        ["cumarsáid", "péinteáil", "áthas", "Aibreán"],
        ["náisiúnta", "náire"],
        ["spás", "fáil"],
        "coimeádta",
      ],
      ulster: ["/ɛ/", "/ä/", "/æ/", "/wɛ/", "ə"],
      connacht: ["/ɔ/", "/ɔ/", "/ɔ/", "/ɔ/", "æ"],
      munster: ["/ɔ/", "/ɔ/", "/ɔ/", "/ɔ/", "æ"],
    },
    {
      regexes: [/uío/i],
      examples: ["buíochas"],
      ulster: ["wi"],
      connacht: ["wi(ə)"],
      munster: ["we(ə)"],
    },
    {
      regexes: [/ogh/i],
      examples: ["toghchán"],
      ulster: ["eɪ ('hay')"],
      connacht: ["/aʊ/ ('now')"],
      munster: ["/aʊ/ ('now')"],
    },

    {
      regexes: [/(?<!á)il/i],
      examples: ["milseog"],
      ulster: ["/ɪl/"],
      connacht: ["/il/"],
      munster: ["/il/"],
    },
    {
      regexes: [/oi/i],
      examples: [
        "coitianta",
        "uathoibríoch",
        "oiliúint",
        "oideachas",
        "coinne",
        "coill",
      ],
      ulster: ["/ä/", "/ɛ/", "/ɪ/", "/ɛ/", "/ʌ/", "/ə/"],
      connacht: ["/ʌ/", "/aɪ/", "/ɛ/", "/ɛ/", "/ʊ/", "/aɪ/ ('eye')"],
      munster: ["/ʊ/", "/ɪ/", "/ɪ/", "/ɪ/", "/(w)ɪ/", "/wi/"],
    },
    {
      regexes: [/[au]?inn/i],
      examples: ["crinnte", "teorainn", ["binn", "cinn"], "cruinn"],
      ulster: ["/ɪn/ ('in')", "/äən/ or /ä(ɪ)n/", "/ɪn/ ('in')", "/ɪn/"],
      connacht: ["/in/ ('mean')", "/ɪn/", "/in/ ('mean')", "/in/"],
      munster: ["/ɪn/ ('in')", "n/a: teora", "/in/ ('mean')", "/in/"],
    },
    {
      regexes: [/ar/i],
      examples: ["ardaithe", "araon", "scaradh"],
      ulster: ["/ɛr/ ('fair')", "/ər/ [unstressed]", "/är/"],
      connacht: ["/ɔr/ ('far')", "/ər/", "/är/"],
      munster: ["/ɔr/ ('far')", "/ɛr/ ('meredith')", "/är/"],
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
      examples: ["feidhmigh", "feidhmeannach"],
      ulster: ["/e/", "/aɪ/"],
      connacht: ["/aɪ/ ('eye')", "/aɪ/"],
      munster: ["/aɪ/ ('eye')", "/aɪ/"],
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
      examples: [
        ["beartas", "dearc"],
        "earra",
        "deisceart",
        "seisear",
        "earrach",
      ],
      ulster: [
        "/ɔr/ ('are')",
        "/är/",
        "/ɔr/ ('are')",
        "/ər/ [unstressed]",
        "/r/",
      ],
      connacht: ["/ær/", "/ær/", "/ər/ ('dirt')", "/ər/ [unstressed]", "/r/"],
      munster: [
        "/ær/",
        "/ær/",
        "/ər/ ('dirt')",
        "/ər/ [unstressed]",
        "/ər/ [unstressed]",
      ],
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
      regexes: [/igh/i],
      examples: ["righneas"],
      ulster: ["/i/"],
      connacht: ["/i/"],
      munster: ["/i/"],
    },
    {
      regexes: [/im/i],
      examples: ["timpeallacht", "limistéar"],
      ulster: ["/ɪm/", "/ɪm/"],
      connacht: ["/im/", "/ɪm/"],
      munster: ["/im/", "/ɪm/"],
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
      examples: ["sraith", "taithí", "anraith"],
      ulster: ["/əɪ/ ('like')", "/ä(h)/", "/ɪ/"],
      connacht: ["/ä(h)/", "/ä(h)/", "/ä(h)/"],
      munster: ["/ä(h)/", "/ä(h)/", "/ä(h)/"],
    },
    {
      regexes: [/nr/i],
      examples: ["anraith"],
      ulster: ["/nr/"],
      connacht: ["/ntr/"],
      munster: ["/nr/"],
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
      regexes: [/ai[s]?/i],
      examples: [
        "taifead",
        "malairt",
        "craiceann",
        ["paiste", "bailithe", "caitheachas", "faitíos"],
        "aigne",
        ["haiste", "aistriúchán"],
        "caisleán",
        "saibhir",
      ],
      ulster: [
        "/ä/",
        "/ə/ [unstressed]",
        "/æ/",
        "/ä/",
        "/ä/",
        "/æ/",
        "/ä/",
        "/ɛ/",
      ],
      connacht: [
        "/æ/",
        "/ə/ [unstressed]",
        "/æ/",
        "/ä/",
        "/æ/",
        "/æ/",
        "/ʊ/",
        "/ɛ/",
      ],
      munster: [
        "/ä/",
        "/ə/ [unstressed]",
        "/ɪ/",
        "/ä/",
        "/æ/",
        "/æ/",
        "/ä/",
        "/ɛ/",
      ],
    },
    {
      regexes: [/bh/i],
      examples: ["saibhir"],
      ulster: ["/v/"],
      connacht: ["/v/"],
      munster: ["/v/"],
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
      regexes: [/omh(?!ach)a?/i],
      // negative lookahead
      // DO NOT MATCH -mhach$ (gníomhach)
      // DO MATCH -omha- (when not followed by -ch)
      examples: ["comhrá", ["comhlacht", "comhlíonadh"], "domhanda"],
      ulster: ["/o/", "/o/", "/o/"],
      connacht: ["/o/", "/o/", "/aʊ/"],
      munster: ["/ə/ [unstressed]", "/o/", "/aʊ/"],
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
      examples: ["luaigh", "buaigh"],
      ulster: ["/ueɪ/ (like 'y|ou a|te')", "ui"],
      connacht: ["/uʌ/", "/uʌ/"],
      munster: ["/uɪg/", "/uɪg/"],
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
      examples: [["dúchas", "loch"], "dúiche"],
      ulster: ["/h/", "/x/"],
      connacht: ["/x/", "/x/"],
      munster: ["/x/", "/h/"],
    },
    {
      regexes: [/che/i],
      examples: ["dúiche"],
      ulster: ["/xjɛ/"],
      connacht: ["/xjɛ/"],
      munster: ["/hɛ/"],
    },
    {
      regexes: [/uil/i],
      examples: ["fuil"],
      ulster: ["/ʌ/"],
      connacht: ["/wɪ/"],
      munster: ["/wɪ/"],
    },
    {
      regexes: [/cht/i],
      examples: ["brúcht"],
      ulster: ["/xt/"],
      connacht: ["/xt/"],
      munster: ["/xt/"],
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
      examples: ["sruth", "cruth"],
      ulster: ["/u/", "/u/"],
      connacht: ["/ʌ/", "/ʌ/"],
      munster: ["/ʌ/ or /ʊ/", "/ʌt/"],
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
      examples: ["teagmháil", "spreag"],
      ulster: ["/æŋg/", "/æg/"],
      connacht: ["/æg/", "/æg/"],
      munster: ["/æŋg/", "/æg/"],
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
      examples: ["cion", ["criosach", "sliotar"], "iomaí", ["pioc", "fiontar"]],
      ulster: ["/(j)ʌ/", "/ɪ/", "/ʌ/", "/ʌ/"],
      connacht: ["/jʌ/", "/ɪ/", "/ʌ/", "/ɪ(ə)/"],
      munster: ["/jʌ/", "/ɪ/", "/ʌ/", "/jʌ/"],
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
      examples: [["ball", "thall", "mall"], "alltacht", "geall", "anall"],
      ulster: ["/äl/", "/äl/", "/æl/", "/ɔl/"],
      connacht: ["/ɔl/", "/äl/", "jɔl", "/ɔl/"],
      munster: ["/aʊ(ə)l/", "/äl/", "/jaʊ(ə)l/", "/aʊl/"],
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
      examples: [["samhradh", "samhail"], "annamh"],
      ulster: ["/aʊ/ ('how')", "/u/"],
      connacht: ["/aʊ/ ('how')", "/u/"],
      munster: ["/aʊ/ ('how')", "/əv/ [unstressed]"],
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
    return /*html*/ `<span ${example === lexeme ? 'class="example-is-lexeme"' : ""
      }>${example}</span>`;
  }

  function htmlExamples(examples) {
    return examples.reduce(
      (prev, curr) =>
        prev +
        /*html*/ `<li>${Array.isArray(curr)
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
        /*html*/ `<td class="regex ${curr.colorStyles.join(" ")}">${curr.regex
        }</td>` +
        /*html*/ `<td class="ipa"><ul>${htmlLocality(curr.ulster)}</ul></td>` +
        /*html*/ `<td class="ipa">${htmlLocality(curr.connacht)}</td>` +
        /*html*/ `<td class="ipa">${htmlLocality(curr.munster)}</td>` +
        /*html*/ `<td class="gaelic"><ul class="compressed">` +
        /*html*/ `${htmlExamples(curr.examples)}` +
        /*html*/ `</ul></td>` +
        /*html*/ `</tr>`
      );
    }, "") +
    /*html*/ `</table></div>`;

  return html;
}

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
      openPronunciationDialog();
      break;
    }
    // (mac) command key
    case "Meta":
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


function openPronunciationDialog() {
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
}

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

function log(msg) {
  console.log(Date.now() + ": " + msg);
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

  log("document.readyState " + document.readyState)
  if (document.readyState === "complete") {
    log('document.readyState === complete')

    document.addEventListener("keydown", keycodeHandlers, false);

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
    if (el && autoplay) {
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
      // log("res.target.status == 200 " + res.target.responseText);
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

function isAnswerSide() {
  return !!document.getElementById("answer");
}

let count = 0

function initAll() {
  count++
  log(" == INIT ALL == " + count);

  initAudio(true);
  initPotaFocalLink();

}

function initApplication() {
  // Select the node that will be observed for mutations
  // const targetNode = document.getElementsByTagName("body")[0];
  const targetNode = document.getElementsByTagName("body")[0];

  log('initApplication')

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: false, subtree: false };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, _observer) => {
    log(JSON.stringify({ msg: 'initApplication callback', mutationList, _observer }, null, 2))
    for (const mutation of mutationList) {
      log(JSON.stringify({ mutation }, null, 2))
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
