//  <script type="text/javascript" src="_script.js"></script>
const INTERVAL_INIT_DICT = 1000;

const Dictionary = {
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

// @todo If I wanted I could do this by, say, VN, and not just lexeme
const interferenceClusters = [
  { abair: "say", abar: "morass" },
  { ae: "liver", aodh: "inflammation", aoi: "lodger" },
  {
    arracht: "monster",
    earrach: "spring",
    eachtra: "adventure",
    eallach: "cattle",
  },
  { achar: "distance", achan: "everything" },
  { acmhainn: "endurance", "ach amháin": "except" },
  { adamhach: "atomic", admhaigh: "admit" },
  { álainn: "beautiful", ealaín: "arts" },
  { aird: "attention", ard: "height, high" },
  { aistritheoir: "translator", aisteoir: "actor" },
  { aitheantas: "recognition", aithris: "recite" },
  {
    airigh: "perceive",
    athraigh: "change",
    aistrigh: "move",
    áirigh: "count",
    aimsigh: "aim",
  },
  { aimsir: "weather, time", aistrigh: "move" },
  { análú: "respiration", annamh: "rare" },
  { at: "swell", ait: "pleasant", áit: "place" },
  { bac: "hinder", baic: "brim" },
  { bainistíocht: "thriftiness" },
  { caith: "wear", cath: "battle", cá: "where" },
  { ceard: "artisan", céard: "what" },
  { catach: "curly", cladach: "shore" },
  { ciall: "sanity", cill: "churchyard" },
  { cluain: "meadow", ciúin: "quiet", cluas: "ear", cluan: "harbor" },
  { coigil: "spare", cigil: "tickle" },
  { coinne: "tryst", cúinne: "corner" },
  { cor: "turn", carr: "car", cuir: "put", coir: "tire" },
  { cróch: "crocus", crochta: "hang" },
  { dall: "blind", dála: "situation", dáil: "distribute" },
  { dísle: "die", dífe: "dismissed" },
  { fiáin: "wild", fionn: "blonde", fíon: "wine" },
  { geal: "whiten", geall: "promise" },
  { géar: "acidid", gearr: "cut" },
  { glé: "pellucid", gné: "form" },
  { ilchríoch: "continent", ilchodach: "composite" },
  { iomlán: "full, whole", iomaí: "many" },
  { ionad: "place", aonad: "unit; one(s)" },
  { loine: "piston", linne: "with-us-emphatic" },
  {
    luaigh: "mention",
    luigh: "(lie down) /li/ /lʌ/ /lɪg/",
    luach: "value",
    luath: "early",
  },
  { más: "if is", meas: "estimate" },
  { rialta: "regular", réalta: "star" },
  { rómhair: "dig", reoán: "icing" },
  { scair: "share", scar: "spread" },
  { solas: "light", sólás: "solace", socair: "quiet" },
  { súmhar: "juicy", suaith: "mix" },
  { stad: "stop", staid: "stadium" },
  {
    tairg: "offer",
    toil: "will",
    toiligh: "agree",
    toisc: "because",
    tost: "become silent",
    troisc: "fast",
    tuill: "earn, deserve",
    tuirling: "descend",
  },
  { tráchtas: "treatise", trácht: "travel", tráchtáil: "commerce" },
];

function getInterferenceCluster(lexeme) {
  log(`gic(${lexeme})`);

  const found = interferenceClusters.filter((cluster) =>
    Object.keys(cluster).includes(lexeme)
  );

  return Array.isArray(found) ? found[0] : null;
}

const potaFocalVerbs = [
  "abair",
  "admhaigh",
  "aimsigh",
  "ainmnigh",
  "airigh",
  "áirigh",
  "aistrigh",
  "aithnigh",
  "áitigh",
  "amharc",
  "aontaigh",
  "ardaigh",
  "athraigh",
  "bac",
  "báigh",
  "bailigh",
  "bain",
  "baist",
  "básaigh",
  "beannaigh",
  "bearr",
  "beartaigh",
  "beathaigh",
  "beir",
  "blais",
  "bog",
  "braith",
  "breac",
  "breathnaigh",
  "bris",
  "bronn",
  "brúigh",
  "bruith",
  "buaigh",
  "bunaigh",
  "cabhraigh",
  "caill",
  "cáin",
  "caint",
  "caith",
  "can",
  "caoin",
  "cart",
  "cas",
  "ceadaigh",
  "ceangail",
  "ceannaigh",
  "ceap",
  "céas",
  "ceil",
  "ceistigh",
  "ciallaigh",
  "cinn",
  "cíor",
  "cleacht",
  "clis",
  "cloígh",
  "clois",
  "clúdaigh",
  "codail",
  "coinnigh",
  "cóirigh",
  "coisc",
  "coisric",
  "comhair",
  "cónaigh",
  "corraigh",
  "cosain",
  "cothaigh",
  "creid",
  "críochnaigh",
  "croch",
  "croith",
  "crom",
  "cruaigh",
  "cruinnigh",
  "cruthaigh",
  "cuardaigh",
  "cuidigh",
  "cuimhnigh",
  "cuimil",
  "cuir",
  "cum",
  "damhsaigh",
  "déan",
  "dearbhaigh",
  "dearc",
  "dearg",
  "déileáil",
  "deir",
  "díbir",
  "díol",
  "dírigh",
  "diúltaigh",
  "dóigh",
  "doirt",
  "druid",
  "dúisigh",
  "dún",
  "éalaigh",
  "éiligh",
  "éirigh",
  "éist",
  "fág",
  "faigh",
  "fair",
  "fáisc",
  "fan",
  "fás",
  "feabhsaigh",
  "féach",
  "féad",
  "feic",
  "feil",
  "fiafraigh",
  "fill",
  "fiuch",
  "fógair",
  "foghlaim",
  "freagair",
  "geall",
  "gearr",
  "géill",
  "glac",
  "glan",
  "glaoigh",
  "gnóthaigh",
  "goid",
  "goill",
  "iarr",
  "imigh",
  "imir",
  "inis",
  "íoc",
  "iompaigh",
  "iompair",
  "ith",
  "labhair",
  "las",
  "leag",
  "lean",
  "léigh",
  "lig",
  "luigh",
  "mair",
  "maraigh",
  "meas",
  "mill",
  "mínigh",
  "mol",
  "múin",
  "nigh",
  "ól",
  "ordaigh",
  "oscail",
  "pioc",
  "pós",
  "réitigh",
  "rith",
  "saothraigh",
  "scaoil",
  "scríobh",
  "seas",
  "seol",
  "síl",
  "sín",
  "siúl",
  "snámh",
  "socraigh",
  "stop",
  "suigh",
  "tag",
  "taispeáin",
  "taitnigh",
  "tarlaigh",
  "tarraing",
  "teastaigh",
  "téigh",
  "tit",
  "tóg",
  "tóraigh",
  "tosaigh",
  "triail",
  "troid",
  "tug",
  "tuig",
  "úsáid",
];

// @todo vowels for which purpose?
const vowels = [
  "a",
  "á",
  "e",
  "é",
  "i",
  "í",
  "o",
  "ó",
  "u",
  "ú",
  "A",
  "Á",
  "E",
  "É",
  "I",
  "Í",
  "O",
  "Ó",
  "U",
  "Ú",
];

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

const myListenerFunction = async function (event) {
  switch (event.key) {
    case "z": {
      playAudio("audio-ulster");
      break;
    }
    case "x": {
      playAudio("audio-connacht");
      break;
    }
    case "c": {
      playAudio("audio-munster");
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
      if (isElActive("interference")) {
        myAlert(getInterferenceClusterString());
      }
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
    case "u": {
      log("u pressed");
      toggleFont();
      break;
    }

    default: {
      break;
    }
  }
};

document.removeEventListener("keydown", myListenerFunction);

// Shortcut keys
document.addEventListener("keydown", myListenerFunction, false);

function isElActive(id) {
  const el = document.getElementById(id) ?? null;
  if (el && el.style) {
    return el.style.display !== "none";
  }
  return false;
}

function alertByElContents(id) {
  let msg = "";
  const el = document.getElementById(id) ?? null;

  try {
    if (el) {
      msg = el.innerHTML;
    }
  } catch (e) {
    msg = "error: " + e.msg;
  }
  myAlert(msg);
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

// let realFont = true;

function toggleFont() {
  myAlert("Toggle Font [u] is not implemented.");
  // try {
  //   const gaelicEls = document.getElementsByClassName("gaelic");
  //   log("gaelicEls " + gaelicEls.length);
  //   realFont = !realFont;

  //   const realFonts = "'Bunchlo GC', 'uncial antiqua';";
  //   const fakeFonts = "'uncial antiqua';";

  //   for (let i = 0; i < gaelicEls.length; i++) {
  //     log(gaelicEls[i]);
  //     gaelicEls[i].style.fontFamily = realFont ? realFonts : fakeFonts;
  //   }
  // } catch (error) {
  //   console.log("toggle font error" + error);
  // }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Get play-button element for given audio source id
function getAudioButton(id) {
  return document.getElementById("audio-" + id + "-button") ?? null;
}

const logQueue = [];
const logMax = 15;
let logCount = 0;

function logError(msg) {
  log(`<span class="error">ERROR</span>${msg}`);
}

function log(msg) {
  if (!msg) {
    return;
  }

  logCount++;
  logQueue.unshift(`${logCount}-${Date.now()}-${msg}`);
  while (logQueue.length > logMax) {
    logQueue.pop();
  }

  const el = document.getElementById("logger");
  if (el) {
    let html = "";

    for (let i = 0; i < logQueue.length; i++) {
      html += `<div class="log-message">${logQueue[i]}</div>`;
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

function setAudioOkDisplayStyle(param) {
  const el = document.getElementById("audio-ok");
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

function setAudioAutoplay(location) {
  const locations = ["connacht", "ulster", "munster"];

  // set to random
  const rand =
    !!location || locations.includes(location) ? getRandomInt(3) : location;

  audioConnact.autoplay = rand === 0;
  audioUlster.autoplay = rand === 1;
  audioMunster.autoplay = rand === 2;

  const button = document.getElementById(`audio-${locations[rand]}-button`);
  if (button) {
    button.style.background = "lightblue";
  }
}

function initAudio(rand = false) {
  const audioConnact = document.getElementById("audio-connacht");
  const audioMunster = document.getElementById("audio-munster");
  const audioUlster = document.getElementById("audio-ulster");

  audioUlster.addEventListener("error", () => {
    setAudioFallbackDisplayStyle("inherit");
    setAudioOkDisplayStyle("none");
  });

  audioMunster.addEventListener("error", () => {
    setAudioFallbackDisplayStyle("inherit");
    setAudioOkDisplayStyle("none");
  });

  audioConnact.addEventListener("error", () => {
    setAudioFallbackDisplayStyle("inherit");
    setAudioOkDisplayStyle("none");
  });

  if (rand) {
    setAudioAutoplay();
  }
}

function htmlExamples(examples) {
  let html = "";

  if (nonEmptyArray(examples)) {
    html += `<ul>`;
    for (const example of examples) {
      html += `<li class="sense-example">`;
      if (example.gaelic) {
        html += `<span class="gaelic example">${example.gaelic}</span>`;
      }
      // not sure why there would be béarla without gaelic
      if (example.béarla) {
        html += `<span class="bearla example">${example.béarla}</span>`;
      }

      html += `</li>`;
    }
    html += `</ul>`;
  }
  return html;
}

function setDictDisplay(lexeme) {
  const béarlaEl = document.getElementById("bearla-back");

  log("setDictDisplay");

  let html = "";

  if (béarlaEl) {
    for (const listing of Dictionary[lexeme].listings) {
      html += `<div class="listing">`;

      // start div.listing-title
      html += `<div class="listing-title">`;

      html += `<span class="listing-title gaelic">${listing.title}</span>`;

      if (listing.equates) {
        html += ` = <span class="listing-title-equates gaelic">${listing.equates}</span>`;
      } else if (nonEmptyArray(listing.partOfSpeech)) {
        for (const part of listing.partOfSpeech) {
          // html += `<span class="listing-part-of-speech hover-text">${part} <span class="tooltip-text">I'm a tooltip!</span>  </span>`;
          html += `<span class="listing-part-of-speech">${part}</span>`;
        }
      }

      // end div.listing-title
      html += `</div>`;

      if (listing.senses) {
        html += `<div class="listing-senses-wrapper">`;
        if (listing.senses.general) {
          html += `<div class="listing-sense-general">${listing.senses.general}</div>`;
        }
        if (listing.senses.examples) {
          if (nonEmptyArray(listing.senses.examples)) {
            html += htmlExamples(listing.senses.examples);
          }
        }

        if (nonEmptyArray(listing.senses.enumerated)) {
          html += `<div class="listing-senses">`;
          html += `<ol>`;
          for (const sense of listing.senses.enumerated) {
            html += `<li class="listing-sense-item">`;
            if (nonEmptyArray(sense.partOfSpeech)) {
              for (const part of sense.partOfSpeech) {
                html += `<span class="listing-part-of-speech">${part}</span>`;
              }
            }
            if (sense.gloss) {
              html += `<span class="listing-sense-item-gloss">${sense.gloss}</span>`;
            }

            html += htmlExamples(sense.examples);
            // if (Array.isArray(sense.examples) && sense.examples.length) {
            //   html += `<ul>`;
            //   for (const example of sense.examples) {
            //     html += `<li class="sense-example">`;
            //     if (example.gaelic) {
            //       html += `<span class="gaelic example">${example.gaelic}</span>`;
            //     }
            //     // not sure why there would be béarla without gaelic
            //     if (example.béarla) {
            //       html += `<span class="bearla example">${example.béarla}</span>`;
            //     }

            //     html += `</li>`;
            //   }
            //   html += `</ul>`;
            // }

            // end listing-sense-item
            html += `</li>`;
          }
          // end  `<ol class="listing-senses">`
          html += `</ol>`;
          // end `<div class="listing-sense-item">`;
          html += `</div>`;
        }

        // end  div class="listing-senses-wrapper"
        html += `</div>`;
      }

      // end div.listing
      html += `</div>`;
    }

    béarlaEl.innerHTML = html;
  }
}

function setSearchError(msg = "") {
  log("error:" + msg);
  const el = document.getElementById("search-error");
  if (el) {
    msg = msg ?? "Search error.";
    el.innerHTML = `<p>${msg}</p>`;
  }
}

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
      html += `<div class="sub-forms-header">Matches found:</div>`;

      for (const match of allMatches) {
        // start wrapper
        html += `<div class="sub-forms-matches-wrapper">`;
        html += `<div class="sub-forms-matches-headword><span class="gaelic">${match.headword}</span>`;
        html += `<span class="headword-index">${+match.index + 1}</span></div>`;
        html += `<ul class="sub-forms-matches-list">`;
        for (const m of match.matches) {
          for (const entry of Object.entries(m)) {
            html += `<li class="sub-forms-matches-item">`;
            html += `<span class="gaelic">${entry[0]}</span>`;
            html += `<span class="bearla grammar">${entry[1]}</span>`;
            html += `</li>`;
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

function htmlAudioButton(lexeme, location) {
  return `
	<button 
		id="audio-${location}-${lexeme}-button" 
		class="audio-control-play"
		onclick="playAudio('audio-${location}-${lexeme}')"
	>${location}</button>`;
}

function htmlAudioLinks(lexeme, location) {
  const upper = location.charAt(0).toUpperCase();
  return `<audio id="audio-${location}-${lexeme}" preload="auto"
src="https://www.teanglann.ie/Can${upper}/${lexeme}.mp3"
></audio>`;
}

function htmlAudioPerLexeme(lexeme) {
  const locations = ["ulster", "connacht", "munster"];
  let html = "";

  // blah
  html += `<div class="audio-wrapper">`;

  html += `<div class="gaelic">${lexeme}</div>`;

  html += `<div class="audio-controls-${lexeme}">`;
  locations.forEach((l) => {
    html += htmlAudioButton(lexeme, l);
  });

  // end audio-controls
  html += `</div>`;

  html += `<div class="audio-elements">`;

  locations.forEach((l) => {
    html += htmlAudioLinks(lexeme, l);
  });

  // end audio-elements
  html += `</div>`;

  // end audio-wrapper
  html += `</div>`;

  return html;
}

function setInterferenceClusterDisplay(lexeme) {
  const cluster = getInterferenceCluster(lexeme);

  let html = "";

  if (cluster) {
    //
    log("cluster keys" + Object.keys(cluster));
    const el = document.getElementById("div-main");
    log("display cluster? " + el);
    if (!el) {
      myAlert("Could not where to put html.");
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

function initDict() {
  log("initDict");
  const dataEl = document.getElementById("data-div");

  if (dataEl) {
    const lexeme = dataEl.dataset.lexeme;
    const clusterLexeme = dataEl.dataset.clusterLexeme;

    if (lexeme) {
      log("initDict:" + lexeme);
      if (Object.hasOwn(Dictionary, lexeme)) {
        try {
          setDictDisplay(lexeme);
        } catch (e) {
          logError("setDictDisplay " + e);
        }
      } else {
        try {
          const matches = findSubformMatches(lexeme);
          if (nonEmptyArray(matches)) {
            setSubForms(matches);
          } else {
            setSearchError("Nothing found.");
          }
        } catch (e) {
          setSearchError(e);
        }
      }
    } else if (clusterLexeme) {
      log("cluster lexeme: " + clusterLexeme);
      setInterferenceClusterDisplay(clusterLexeme);
    }
  }
}

function initPotaFocalLink() {
  const linkEl = document.getElementById("pota-focal-link-wrapper");

  if (linkEl) {
    if (potaFocalVerbs.includes(linkEl.dataset.lexeme)) {
      linkEl.style.display = "inherit";
    }
  }
}

function getInterferenceLexeme() {
  const interferenceEl = document.getElementById("interference");

  if (interferenceEl && interferenceEl.dataset) {
    return interferenceEl.dataset.lexeme;
  }
  return null;
}

function getInterferenceClusterString(_lexeme, excludeSelf = true) {
  const lexeme = !!_lexeme ? _lexeme : getInterferenceLexeme();

  if (lexeme) {
    log("gics (" + lexeme + ")");

    const cluster = getInterferenceCluster(lexeme);
    log(JSON.stringify(cluster)); // undefined
    if (cluster) {
      if (Object.keys(cluster).length) {
        let str = "";
        // get all interference lexemes except the one
        for (let k of Object.keys(cluster)) {
          if (k !== lexeme || !excludeSelf) {
            str += `${k} (${cluster[k]})  <br>`;
          }
        }
        return `<p>${str}</p>`;
      }
    }
  }
  return "";
}

function setContents(id, str) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = str;
  }
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
        setContents("sg-nom-masc", lexeme);
        setContents("sg-gen-masc", lexeme);
      }
      if (fDecl === "fA") {
        setContents("sg-nom-fem", lexeme);
        setContents("sg-gen-fem", lexeme);
      }
      if (plDecl === "a0") {
        setContents("pl-nom-masc", lexeme);
        setContents("pl-gen-masc", lexeme);
        setContents("pl-nom-fem", lexeme);
        setContents("pl-gen-fem", lexeme);
      }

      const qualityForms = makeAdjCompForms(lexeme, data);
      setContents("comp-pos", qualityForms.comparative.present);
      setContents("comp-neg", qualityForms.comparative.past);
      setContents("sup-pos", qualityForms.superlative.present);
      setContents("sup-neg", qualityForms.superlative.past);
    }
  }
}

// only one interval at a time, please
let intervalsGoing = false;

function initAll() {
  log("allInits");
  initAudio();
  initPotaFocalLink();
  initCarnieAdjectiveDeclension();

  if (!intervalsGoing) {
    log("setInterval");
    setInterval(function () {
      const isAnswerSide = document.getElementById("answer");
      if (isAnswerSide) {
        initDict();
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
