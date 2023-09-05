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
