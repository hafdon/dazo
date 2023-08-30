const slenderVowelLetters = ["e", "é", "i", "í", "E", "É", "I", "Í"];

const broadVowelLetters = [
  "a",
  "á",
  "o",
  "ó",
  "u",
  "ú",
  "A",
  "Á",
  "O",
  "Ó",
  "U",
  "Ú",
];

const slenderVowelRegex = /[eéiíEÉIÍ]/g;
const broadVowelRegex = /[aáoóuúAÁOÓUÚ]/g;

const vowels = [...slenderVowelLetters, ...broadVowelLetters];

function doIt(word, widthed, _vowelled_check, _chunks_check) {
  const vowelled = word
    .replace(slenderVowelRegex, "2_2")
    .replace(broadVowelRegex, "1_1");

  console.log({ vowelled });

  if (_vowelled_check) {
    console.log({ _vowelled_check });

    console.log("vowelled === _vowelled_check?", vowelled === _vowelled_check);
  }

  const consonanted = vowelled
    .split("_")
    .map((c, i) =>
      c
        .replace(/[^12]/g, c.includes("1") ? "3" : "4")
        .substring(i === 0 ? 0 : 1)
    )
    .join("");

  console.log({ consonanted });
  console.log({ widthed });

  console.log("consonanted === widthed?", consonanted === widthed);
}

const tests = [
  {
    word: "foirmiúil",
    cv: "CVV'C'C'V'VV'C'",
    widthed: "312442124",
  },
  {
    word: "fiacail",
    cv: "C'V'VCVV'C'",
    widthed: "4213124",
  },
  {
    word: "seachrán",
    widthed: "42133313",
    cv: "C'V'VCCCVC",
  },
  {
    // 3
    word: "dteipfidh",
    cv: "C'C'V'V'C'C'V'C'C'",
    widthed: "442244244",
  },
  {
    // 4
    word: "bhfaighfeá",
    cv: "CCCVV'C'C'C'V'V",
    vowelled: "bhf1_12_2ghf2_21_1",
    chunks: "",
    widthed: "3331244421",
  },
  {
    // 5
    word: "cabhraigh",
    widthed: "313331244",
    cv: "CVCCCVV'C'C'",
  },
];

const mp = {
  1: "V",
  2: "V'",
  3: "C",
  4: "C'",
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

tests.forEach(({ word }) => {
  console.log({
    word,
    maskedC: maskConsonants(word),
    maskedV: maskVowels(word),
  });
});
