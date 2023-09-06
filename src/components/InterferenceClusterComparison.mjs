import { inject, toValue, computed } from 'vue'
import { useInterferenceClusterApi } from '../composables/useApi.mjs'
import { useErrorLogger } from '../composables/useLogger.mjs'
import AudioButtons from './AudioButtons.mjs'

export default {
    props: [],
    components: {
        'AudioButtons': AudioButtons
    },
    name: 'InterferenceClusterComparison',
    setup(props) {

        const cardLexeme = inject('cardLexeme')
        const { data, error } = useInterferenceClusterApi({ lexeme: toValue(cardLexeme) })
        useErrorLogger(error)

        const words = computed(() => Object.entries(data.value?.[0]?.cluster ?? {})
            .map(([ortho, def]) => ({
                ortho, def
            })))

        return {
            words
        }
    },
    template: /*html*/ `
        <div class="biggish-font">Interference Cluster Comparison</div>

        <template v-if="words.length">

            <template v-if="words.length === 1">
                <div class="para">This is the only word in the group.</div>
                <div class="para">Add more words for comparison.</div>
                <hr />
            </template>

            <template v-for="word in words">
            <!-- TODO do this with slots -->
                <AudioButtons 
                    :show-lexeme="true" :lexeme="word.ortho" 
                    :show-def="true" :def="word.def" />
            </template>
        </template>
        <template v-else>
            <div>Sorry, no interference cluster(s) for this word.</div>
        </template>
    `
}