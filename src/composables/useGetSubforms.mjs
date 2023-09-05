import { ref, toValue, watchEffect } from "vue";


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

export function useGetSubforms(_lexeme, _dictionary) {
  const allMatches = ref([]);

  watchEffect(() => {

    const Dictionary = toValue(_dictionary)
    const lexeme = toValue(_lexeme)

    if (Dictionary) {

      for (const el of Dictionary) {

        // eg. 'tráchtáil'
        if (nonEmptyArray(el.listings)) {
          // e.g. Dictionary.tráchtáil.listings = [...]
          el.listings.forEach((listing, index) => {
            if (nonEmptyArray(listing.forms)) {
              const matches = listing.forms.filter((form) =>
                Object.hasOwn(form, lexeme)
              );
              if (nonEmptyArray(matches)) {
                allMatches.value.push({
                  matches, listing, index,
                  // the arbitrary order
                  // that this listing appears
                  // among all the listings for that 
                  // lexeme
                  headword: el.headword,
                });
              }
            }
          });
        }
      }
    }
  })

  return { allMatches };
}