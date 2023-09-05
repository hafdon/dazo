
const slenderVowelRegex = /[eéiíEÉIÍ]/g;
const broadVowelRegex = /[aáoóuúAÁOÓUÚ]/g;

/**
 * const mp = {
  1: "V", // brpad vowel
  2: "V'", // slender vowel
  3: "C", // broad consonant
  4: "C'", // slender consonant
};
 */

export default function widthMask(word) {
    return word
        .replace(slenderVowelRegex, "2_2")
        .replace(broadVowelRegex, "1_1")
        .split("_")
        .map((c, i) =>
            c.replace(/[^12]/g, c.includes("1") ? "3" : "4")
                .substring(i === 0 ? 0 : 1)
        )
        .join("");
}