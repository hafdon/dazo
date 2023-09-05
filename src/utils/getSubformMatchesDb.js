
import nonEmptyArray from './nonEmptyArray'

/**
 * Locate lexeme in forms (declensions, inflections, variants)
 * of another headword
 *
 * @param {*} lexeme
 * @returns
 */
export default function (lexeme, Dictionary) {
  /**
   * Remember, each element in allMatches
   * is everything contained within a Dictionary element (eg. headword)
   * so if matches are found under more than one headword, there
   * will be more than onen element returned. 
   * But if only a single match is found there will be on ELEMENT
   * (that contains an object)
   */
  const allMatches = [];

  for (const word of Dictionary) {

    if (nonEmptyArray(word.listings)) {
      // e.g. Dictionary.tráchtáil.listings = [...]
      word.listings.forEach((listing, index) => {
        if (nonEmptyArray(listing.forms)) {
          const matches = listing.forms.filter((form) => {

            const result = Object.hasOwn(form, lexeme)
            console.log({ form, lexeme, result })
            return result
          }

          );
          if (nonEmptyArray(matches)) {
            allMatches.push({
              matches, listing, index,
              // the arbitrary order
              // that this listing appears
              // among all the listings for that 
              // lexeme
              headword: word.headword,
            });
          }
        }
      });
    }
  }

  return allMatches;
}