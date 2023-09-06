import { ref, toValue, watchEffect } from 'vue'
import { useFetch } from './useFetch.mjs';

// const lexeme = getCardLexeme();

export function usePhonics(lexemeMaybeVal) {

    // "patterns" is the entire phone array from the database
    const execs = ref([])
    const colorLexeme = ref(null)


    // @todo Get this from env
    const url = 'http://localhost:3001/phones'
    const { data, error } = useFetch(url)


    watchEffect(async () => {

        const lexeme = toValue(lexemeMaybeVal)

        data.value?.filter((p) =>
            p.regexes.some((r, idx) => {
                const res = new RegExp(r, 'i').exec(lexeme);
                if (res) {
                    execs.value.push({
                        examples: p.examples.map(example => Array.isArray(example) ? example : [example]),
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

        for (let i = 0; i < execs.value.length; i++) {
            for (let j = 0; j < execs.value.length; j++) {
                if (
                    execs.value[i].startIndex <= execs.value[j].startIndex &&
                    execs.value[i].endIndex >= execs.value[j].endIndex &&
                    execs.value[i].matchLen > execs.value[j].matchLen
                ) {
                    execs.value[j].styles.push("superceded");
                    execs.value[j].supercededBy.push(execs.value[i]);
                }
            }
        }

        // superceded later
        execs.value.sort((a, b) => {
            const indexDiff = a.startIndex - b.startIndex;
            return indexDiff !== 0 ? indexDiff : a.matchLen - b.matchLen;
        });

        const chars = [...lexeme]
        let colorIndex = 1; // incrementing number for css classes

        execs.value.forEach((e) => {
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

        colorLexeme.value = chars.join("")
    })

    return {
        colorLexeme, execs
    }
}




