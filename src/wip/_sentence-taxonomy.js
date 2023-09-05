// copula

const copularForms = [
  // MOSMI says "l" or "r" following "fh", not just "fhV"
  // col 1 - PRESENT INDICATIVE AFFIRMATIVE
  {
    lexemes: {
      preCons: [{ region: "_", orth: "is" }],
      preVowel: [{ region: "_", orth: "is" }],
    },
    form: "present",
    modality: "indicative",
    charge: "affirmative",
    ordination: "independent",
    subordination: null,
    combinations: [
      {
        conjunction: "má",
        lexemes: {
          preCons: [{ region: "_", orth: "más" }],
          preVowel: [{ region: "_", orth: "más" }],
        },
      },
      {
        conjunction: "cá",
        lexemes: {
          preCons: [{ region: "_", orth: "cár" }],
          preVowel: [{ region: "_", orth: "cárb" }],
          notes: [
            "the forms which end in b are usually used before words beginning with a vowel:",
          ],
        },
      },
      {
        conjunction: "do",
        lexemes: {
          preCons: [{ region: "_", orth: "dár" }],
          preVowel: [{ region: "_", orth: "dárb" }],
          notes: [
            "the forms which end in b are usually used before words beginning with a vowel:",
          ],
        },
      },
      {
        conjunction: "mura",
        // [nl] puts this in "Present - negative conditional clause (and has alt forms)"
        // [mosmi] glosses as "if he isn't"
        lexemes: {
          preCons: [
            { region: "_", orth: "mura" },
            { region: "?", orth: "maran", source: "nl" },
            { region: "?", orth: "marar", source: "nl" },
            { region: "Galway, Kerry", orth: "mara", source: "mosmi-220" },
          ],
          preVowel: [
            { region: "_", orth: "murab" },
            { region: "?", orth: "marab", source: "nl" },
            { region: "Galway, Kerry", orth: "marab", source: "mosmi-220" },
          ],
          notes: [
            "the forms which end in b are usually used before words beginning with a vowel:",
          ],
        },
      },
      {
        conjunction: "ó",
        lexemes: {
          preCons: [{ region: "_", orth: "ós" }],
          preVowel: [{ region: "_", orth: "ós" }],
        },
      },
    ],
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "gur" }],
      preVowel: [{ region: "_", orth: "gurb" }],
    },
    form: "present",
    modality: "indicative",
    ordination: "dependent",
    charge: "affirmative",
    subordination: null,
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "is" }],
      preVowel: [{ region: "_", orth: "is" }],
    },
    form: "present",
    modality: "indicative",
    ordination: "relative",
    charge: "affirmative",
    subordination: "direct",
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "ar" }],
      preVowel: [{ region: "_", orth: "arb" }],
    },
    form: "present",
    modality: "indicative",
    charge: "affirmative",
    ordination: "relative",
    subordination: "indirect",
  },

  // col 2 - PRESENT INDICATIVE NEGATIVE
  {
    lexemes: {
      preCons: [
        { region: "_", orth: "ní" },
        { region: "?", orth: "chan", source: "nl" },
        { region: "?", orth: "cha", source: "nl" },
      ],
      preVowel: [
        { region: "_", orth: "ní" },
        { region: "_", orth: "chan" },
      ],
    },
    form: "present",
    modality: "indicative",
    charge: "negative",
    ordination: "independent",
    subordination: null,
    notes: [
      "ni prefixes h to the pronouns é, i, iad, ea and to adjectives and some nouns which begin with a vowel.",
    ],
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "nach" }],
      preVowel: [{ region: "_", orth: "nach" }],
    },
    form: "present",
    modality: "indicative",
    charge: "negative",
    ordination: "dependent",
    subordination: null,
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "nach" }],
      preVowel: [{ region: "_", orth: "nach" }],
    },
    form: "present",
    modality: "indicative",
    charge: "negative",
    ordination: "relative",
    subordination: "direct",
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "nach" }],
      preVowel: [{ region: "_", orth: "nach" }],
    },
    form: "present",
    modality: "indicative",
    charge: "negative",
    ordination: "relative",
    subordination: "indirect",
  },

  // col 3 - PRESENT INterrogative affirmative
  {
    lexemes: {
      preCons: [
        { region: "_", orth: "an" },
        {
          orth: "ar",
          region: "Cois Fhairrge",
          source: "mosmi-220",
          notes: [
            "example of present/future and past/conditional merging together, with only lenition (in past) to differentiate (possible because of redundancy)",
          ],
        },
      ],
      preVowel: [
        { region: "_", orth: "an" },
        { region: "Galway, Kerry", orth: "ab", source: "mosmi-220" },
      ],
    },
    form: "present",
    modality: "interrogative",
    charge: "affirmative",
    ordination: "independent",
    subordination: null,
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "nach" }],
      preVowel: [{ region: "_", orth: "nach" }],
    },
    form: "present",
    modality: "interrogative",
    ordination: "independent",
    charge: "negative",
    subordination: null,
  },

  // col 4 - past
  {
    lexemes: {
      preCons: [
        { region: "_", orth: "ba", gloss: "He was" },
        {
          region: "certain Munster dialects",
          orth: "doba",
          source: "mosmi-219",
          notes: [
            "I'm not sure if Siadhail means this is used for 'ba' in both the (i) independent and (ii)relative direct forms of the past indicative, or what",
          ],
        },
      ],
      preVowel: [
        { region: "_", orth: "b'" },
        {
          region: "certain Munster dialects",
          orth: "doba",
          source: "mosmi-219",
          notes: [
            "I'm not sure if Siadhail means this is used for 'ba' in both the (i) independent and (ii)relative direct forms of the past indicative, or what",
          ],
        },
      ],
    },
    form: "past",
    modality: "indicative",
    charge: "affirmative",
    ordination: "independent",
    subordination: null,
    notes: [
      "the affirmative, independent form ba -» b' before vowels (except é, i, iad, ea) or fh followed by a vowel",
    ],
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "gur" }],
      preVowel: [{ region: "_", orth: "gurbh" }],
    },
    form: "past",
    modality: "indicative",
    ordination: "dependent",
    charge: "affirmative",
    subordination: null,
    notes: [
      "the forms which end in bh are used before words beginning with a vowel or fh followed by a vowel",
    ],
  },
  {
    lexemes: {
      preCons: [
        { region: "_", orth: "ba" },
        {
          region: "certain Munster dialects",
          orth: "doba",
          source: "mosmi-219",
          notes: [
            "I'm not sure if Siadhail means this is used for 'ba' in both the (i) independent and (ii)relative direct forms of the past indicative, or what",
          ],
        },
      ],
      preVowel: [
        { region: "_", orth: "ab" },
        {
          region: "certain Munster dialects",
          orth: "doba",
          source: "mosmi-219",
          notes: [
            "I'm not sure if Siadhail means this is used for 'ba' in both the (i) independent and (ii)relative direct forms of the past indicative, or what",
          ],
        },
      ],
    },
    form: "past",
    modality: "indicative",
    charge: "affirmative",
    ordination: "relative",
    subordination: "direct",
    notes: [
      "The affirmative, direct relative form ba -> ab before vowels or fh followed by a vowel",
    ],
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "ar" }],
      preVowel: [{ region: "_", orth: "arbh" }],
    },

    form: "past",
    modality: "indicative",
    charge: "affirmative",
    ordination: "relative",
    subordination: "indirect",
    notes: [
      "the forms which end in bh are used before words beginning with a vowel or fh followed by a vowel",
    ],
  },

  // col 5 - PAST INDICATIVE NEGATIVE
  {
    lexemes: {
      preCons: [
        { region: "_", orth: "níor" },
        {
          region: "Cois Fhairrge",
          orth: "ní ba",

          source: "mosmi-221",
          notes: [
            "the use of preverbal particles with the past/conditional 'ba'",
            "the negation particle does not lenite but the predominating eclipsis spills over so that 'ní mba' is also a common form",
          ],
        },
        {
          region: "Cois Fhairrge",
          orth: "ní mba",
          gloss: "He wasn't",
          source: "mosmi-221",
          notes: [
            "the use of preverbal particles with the past/conditional 'ba'",
            "the negation particle does not lenite but the predominating eclipsis spills over so that 'ní mba' is also a common form",
          ],
        },
      ],
      preVowel: [{ region: "_", orth: "níorbh" }],
    },
    gloss: "He wasn't",
    form: "past",
    modality: "indicative",
    charge: "negative",
    ordination: "independent",
    subordination: null,
    notes: [
      "the forms which end in bh are used before words beginning with a vowel or fh followed by a vowel",
    ],
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "nár" }],
      preVowel: [{ region: "_", orth: "nárbh" }],
    },
    form: "past",
    modality: "indicative",
    charge: "negative",
    ordination: "dependent",
    subordination: null,
    notes: [
      "the forms which end in bh are used before words beginning with a vowel or fh followed by a vowel",
    ],
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "nár" }],
      preVowel: [{ region: "_", orth: "nárbh" }],
    },
    form: "past",
    modality: "indicative",
    charge: "negative",
    ordination: "relative",
    subordination: "direct",
    notes: [
      "the forms which end in bh are used before words beginning with a vowel or fh followed by a vowel",
    ],
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "nár" }],
      preVowel: [{ region: "_", orth: "nárbh" }],
    },
    form: "past",
    modality: "indicative",
    charge: "negative",
    ordination: "relative",
    subordination: "indirect",
    notes: [
      "the forms which end in bh are used before words beginning with a vowel or fh followed by a vowel",
    ],
  },

  // col 6 - Past INterrogative affirmative
  {
    lexemes: {
      preCons: [
        { region: "_", orth: "ar" },
        {
          region: "Cois Fhairrge",
          orth: "an mba",
          source: "mosmi-221",
          notes: [
            "the use of preverbal particles with the past/conditional 'ba'",
            "the preverbal particles and complementizers cause eclipsis",
          ],
        },
      ],
      preVowel: [{ region: "_", orth: "arbh" }],
    },
    gloss: "Was he?",
    form: "past",
    modality: "interrogative",
    charge: "affirmative",
    ordination: "independent",
    subordination: null,
    notes: [
      "the forms which end in bh are used before words beginning with a vowel or fh followed by a vowel",
    ],
  },
  {
    lexemes: {
      preCons: [
        { region: "_", orth: "nár" },
        {
          region: "Cois Fhairrge",
          orth: "nach mba",
          source: "mosmi-221",
          notes: [
            "the use of preverbal particles with the past/conditional 'ba'",
            "the preverbal particles and complementizers cause eclipsis",
          ],
        },
      ],
      preVowel: [{ region: "_", orth: "nárbh" }],
    },
    gloss: "Wasn't he?",
    form: "past",
    modality: "interrogative",
    ordination: "independent",
    charge: "negative",
    subordination: null,
    notes: [
      "the forms which end in bh are used before words beginning with a vowel or fh followed by a vowel",
    ],
  },

  // col 7 - PRESENT-SUBJUNCTIVE INdicative
  {
    lexemes: {
      preCons: [{ region: "_", orth: "gura" }],
      preVowel: [{ region: "_", orth: "gurab" }],
    },
    form: "present-subjunctive",
    modality: "indicative",
    charge: "affirmative",
    // ordination: "independent",
    ordination: null,
    subordination: null,
    notes:
      "the forms which end in b are usually used before words beginning with a vowel:",
  },
  {
    lexemes: {
      preCons: [{ region: "_", orth: "nára" }],
      preVowel: [{ region: "_", orth: "nárab" }],
    },
    form: "present-subjunctive",
    modality: "indicative",
    charge: "negative",
    // ordination: "independent",
    ordination: null,
    subordination: null,
    notes:
      "the forms which end in b are usually used before words beginning with a vowel:",
  },
];

const COPULA = "copula",
  // classificatory indefinite noun
  INDEF_NOUN = "indefinite noun",
  /**
   * Siadhall's definition of "definite noun" for classificatory sentences:
   * one or more of:
   * 1. proper noun
   * 2. noun preceded by the article
   * 3. noun preceded by a possessive adjective
   */
  DEF_NOUN = "definite noun",
  PRONOUN = "pronoun",
  ADJECTIVE = "adjective",
  SUBSTANTIVE = "substantive verb",
  PREP_I = "preposition (i)",
  DELETION_OF_COPULA = "",
  RELATIVE_OF_SUBSTANTIVE_VERB = "relative of substantive verb", // eg.. "atá"
  /**
   * ? "é, í, iad insertion rule" = EIIAD Insertion Rule
   * "inserts é, í, iad (according to gender and number) before a definite noun"
   * [zw - i think he means, between a definite noun and the copula]
   * in Munster/Connacht
   * applies to both identificatory (copula) and cleft (copula?) sentences
   */
  INSERTION_RULE_FRONT = "insertion rule before 1st definite noun",
  /**
   * This "echoic" element of the rule only operates on é, í, iad,
   * and NOT on:
   * - contrast grade (eg. eisean)
   * - emphatic grade (eg. é féin)
   * - emphatic contrast grade (eisean é féin)
   * - é seo, é sin
   */
  INSERTION_RULE_ECHO = "insertion rule after 2nd definite noun";

const copula = {
  classificatory: [
    [COPULA + INDEF_NOUN + PRONOUN],
    [COPULA + INDEF_NOUN + PRONOUN + DEF_NOUN],

    // adjective that qualifies a noun
    // Is duine deas é. = He is a nice person
    [COPULA + INDEF_NOUN + ADJECTIVE + PRONOUN],

    // fronting (for emphasis) an adjective that qualifies a noun
    // Is deas an duine é. = He is a nice person (emphasis on his being nice)
    // Side Note: this structure is mandatoroy for certain specific sentences
    // DEF_NOUN here is a "definite" version of the INDEF_NOUN in prior sentence type
    // (and it appears the copula is optional sometimes?)
    [COPULA + ADJECTIVE + DEF_NOUN + PRONOUN],

    //?  another type (interrogative) "Ab é Sasanach é?" = Is he an Englishman
  ],
  identificatory: [
    // apply the  "é, í, iad insertion rule"
    // (i) Is mé an múinteoir = I am the teacher
    //     - no insertion, because "mé" is pronoun, not definite noun
    // (ii) Is é Seán an múinteoir = Seán is the teacher
    //     - yes insertion, because "Seán" is a definite noun
    [
      COPULA +
        INSERTION_RULE_FRONT +
        { _: [PRONOUN, DEF_NOUN], x: 1 } +
        { _: [PRONOUN, DEF_NOUN], x: 2 } +
        INSERTION_RULE_ECHO,
    ],
  ],

  /**
   * Linking nouns/pronouns and adjectives
   */
  /**
   * Type 1: Exclamatory
   * - is EXCLUDED in cleft sentences
   * - old system (copula links nouns/pronouns WITH adjectives) retained in Exclamatory
   *   - confines CLEFT SENTENCES to CONTRASTIC function
   */
  exclamatory: [
    /**
     * "Only adjectives describing a permanent quality and expressing a subjective
     * estimation are allowed""
     *
     * [x] EIIAD Insertion Rule
     * ("an teach sin" is a DEF_NOUN)
     * Nach deas é an teach sin! vs. Nach deas an teach sin!
     * COPULA  = "nach"
     * ADJECTIVE = "deas"
     *
     * Nach maith í Bríd! vs. Nach maith Bríd!
     *
     */
    [
      COPULA +
        ADJECTIVE +
        INSERTION_RULE_FRONT +
        { _: [PRONOUN, DEF_NOUN], x: 1 },
    ],
  ],
  equational: [
    /**
     * Again, only a very few adjectives possible
     *
     * Is ionann an dá rud = The two things are identical
     * COPULA = "is"
     * ADJECTIVE = "ionann"
     * DEF_NOUN = "an dá rud"
     *
     * Is mar a chéile iad = They are alike
     */
    [COPULA + ADJECTIVE + { _: [PRONOUN, DEF_NOUN], x: 1 }],
  ],
};

const substantive = {
  classificatory: [
    // ⅋-type
    // valence of "becoming" is possible to convey
    [
      // possible in all dialects
      SUBSTANTIVE +
        { _: [PRONOUN, DEF_NOUN], x: 1 } +
        PREP_I + // PREP_I can have combination form with POSS_ADJ
        { _: [POSS_ADJ], x: -1 },
    ],
    // "uses" both substantive and copula, in a way >>>
    // "Scoláire atá ionam" = I am a scholar ⥺ [It is] a scholar which is in me
    // is this one a "cleft" of the first? he asks
    // either way, better to regard as separate type, because of semantic difference
    [
      // not in Munster, optional in Connacht, norm in Gweedore
      DELETION_OF_COPULA +
        INDEF_NOUN +
        RELATIVE_OF_SUBSTANTIVE_VERB +
        PREP_I +
        { _: [PRONOUN, DEF_NOUN], x: 1 },
    ],
  ],
};

// s-concepts. may align with others
const S_VERB = "verb",
  /**
   * verb which inflection incorporates subject information
   * (opposed to "analytic")
   */
  S_VERB_SYN = "verb with synthetic ending",
  S_VERB_ANL = "verb with analytic ending",
  /**
   *  [S_VERB_SYN] or [S_VERB_ANL, S_SUBJECT]
   */
  S_V_EITHER = "either ",
  S_SUBJECT = "subject",
  S_DO = "direct object",
  S_DO_PREP = "direct object expressed by preposition",
  S_PREP = "preposition",
  S_PP = "prepositional phrase",
  S_PP_IO = "prepositional phrase to introduce indirect object",
  S_IO = "indirect object",
  S_TEMPORAL = "information about time",
  S_PLACE = "information about place",
  /**
   * usually [[S_PLACE]] [[S_PLACE]]
   */
  S_ADD = "additional information";

const stensonSimpleSentenes = [
  // one participant, contained in verb
  // one participant, separate subject noun
  [S_V_EITHER, [[S_ADD]]],
  // 2 participants
  [S_V_EITHER, S_DO, [[S_ADD]]],
  // 3 participants
  [S_VERB, S_SUBJECT, S_DO, S_PP_IO],
  // 3 participants, DO expressed by pronoun
  [S_VERB, S_SUBJECT, S_PP_IO, S_DO_PREP],

  /**
   * Feiceann an t-éan anois thú.
   * = [The bird] [sees] you [now].
   *
   * Feicim ar an mbord é
   * = [I see] it [on the table]
   */
  [S_V_EITHER, [[S_ADD]], S_DO_PREP],
];
