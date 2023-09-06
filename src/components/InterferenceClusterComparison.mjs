// import { useInterferenceClusterApi } from '../composables/useApi.mjs'
import { inject, toValue, computed } from 'vue'
import { useInterferenceClusterApi } from '../composables/useApi.mjs'
import { useErrorLogger } from '../composables/useLogger.mjs'
import AudioButtons from './AudioButtons.mjs'

export default {
    props: [''],
    components: {
        'AudioButtons': AudioButtons
    },
    name: 'InterferenceClusterComparison',
    setup(props) {

        const cardLexeme = inject('cardLexeme')
        console.log('typeof cardLexeme', typeof cardLexeme)
        const { data, error } = useInterferenceClusterApi({ lexeme: toValue(cardLexeme) })
        useErrorLogger(error)

        const words = computed(() => Object.entries(data.value?.[0]?.cluster ?? {})
            .map(([ortho, def]) => ({
                ortho, def
            })))

        return {
            cardLexeme, words
        }
    },
    template: /*html*/ `
        <template v-for="word in words">
            <AudioButtons :lexeme="word.ortho" :show-lexeme="true" />
            <p>{{word.def}}</p>
        </template>
    `
}