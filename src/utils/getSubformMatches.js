
import nonEmptyArray from './nonEmptyArray'

/**
 * Locate lexeme in forms (declensions, inflections, variants)
 * of another headword
 *
 * @param {*} lexeme
 * @returns
 */
export default function (lexeme, Dictionary) {
  const allMatches = [];

  for (const word of Object.keys(Dictionary)) {
    // eg. 'tráchtáil'
    if (nonEmptyArray(Dictionary[word].listings)) {
      // e.g. Dictionary.tráchtáil.listings = [...]
      Dictionary[word].listings.forEach((listing, index) => {
        if (nonEmptyArray(listing.forms)) {
          const matches = listing.forms.filter((form) =>
            Object.hasOwn(form, lexeme)
          );
          if (nonEmptyArray(matches)) {
            allMatches.push({
              matches, listing, index,
              // the arbitrary order
              // that this listing appears
              // among all the listings for that 
              // lexeme
              headword: word,
            });
          }
        }
      });
    }
  }

  return allMatches;
}