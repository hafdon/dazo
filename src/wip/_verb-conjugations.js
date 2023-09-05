const myVerb = {
  headword: "fág",
  variants: [],
  stems: {
    present: null,
    pastStem: "",
    futureConditionalStem: "",
  },
  category: 1,
  width: "b",
  exceptions: [
    {
      exception: "",
      form: "",
      person: "",
      number: "",
    },
  ],
};

const getStem = function (verb, form = "Present") {
  let workingStem = null;

  if (verb.stems) {
    workingStem = verb.stems.present ?? verb.headword;
  }

  if (!workingStem) {
    // bail or get a stem
  }

  return workingStem;
};

const getCategory = function (verb) {
  return verb.category ?? null;
};

const getWidth = function (verb) {
  return verb.width ?? null;
};

const getLenited = function (verb, lenitionType = 1) {
  /*

  ^(b|c|d|f|g|m|p|t)|^((s)([aeiournláéíóú]))(.*)

  "$1$3h$4$5"

  "hh", "h"

  // past tense
  ^([faáeéiíoóuú])", "d'$1

=REGEXREPLACE(REGEXREPLACE( REGEXREPLACE(if($B177 = "—", $A177, $B177) & if($C177 = "ˠ", if ($D177 = "—", "a", "aío"),  if($D177 = "—", "ea","ío" )) & "dh", "^(b|c|d|f|g|m|p|t)|^((s)([aeiournláéíóú]))(.*)", "$1$3h$4$5"), "hh", "h"), "^([faáeéiíoóuú])", "d'$1")

  */
};

const getEnding = function (verb, form, inflection) {
  const width = getWidth(verb);
  const category = getCategory(verb);

  console.log({ width, category });

  if (form === "Present") {
    if (inflection === "analytic") {
      if (category === 1) {
        return (width === "s" ? "ea" : "a") + "nn";
      } else if (category === 2) {
        return (width === "s" ? "ío" : "aío") + "nn";
      }
    }
  }
};

const inflectPresent = function (verb) {
  const stemPresent = getStem(verb, "Present");
  const endingPresent = getEnding(verb, "Present", "analytic");

  console.log({ stemPresent, endingPresent });

  switch (verb.category) {
    case 0:
      console.log("irregular verb");
      break;

    case 1:
      console.log("regular verb - category 1");
      return {
        present: {
          independent: {
            analytic: {
              base: stemPresent + endingPresent,
              lenited: "",
              eclipsed: "",
              hFront: "",
              tFront: "",
            },
            sg1: [""],
            pl1: [""],
            aut: [""],
          },
        },
      };
      break;

    case 2:
      console.log("regular verb - category 2");
      break;
  }
};

const obj = inflectPresent(myVerb);

console.log(JSON.stringify(obj, null, 2));
