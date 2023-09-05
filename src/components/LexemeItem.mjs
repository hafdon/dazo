// _my-component.js
import { ref, computed, provide } from "vue";
import { useFetch } from "../composables/useFetch.mjs";
import { useGetSubforms } from "../composables/useGetSubforms.mjs";

import ExampleList from './ExampleList.mjs'
import SenseListItem from './SenseListItem.mjs'
import SubformList from './SubformList.mjs'
import ListingItem from './ListingItem.mjs'
import AudioButtons from './AudioButtons.mjs'
import InterferenceClusterForm from './InterferenceClusterForm.mjs'

const BASE_URL = {
    FUAIMEANNA_IE: "http://www.fuaimeanna.ie",
    TEANGLANN_IE: "https://www.teanglann.ie",
    LOCALHOST: "http://localhost:3001",
}

export default {
    props: ["lexeme", "cardLexeme", "tags", "audioUrl", "flag", "note", "side"],
    components: {
        "ExampleList": ExampleList,
        'SenseListItem': SenseListItem,
        'SubformList': SubformList,
        'ListingItem': ListingItem,
        'AudioButtons': AudioButtons,
        'InterferenceClusterForm': InterferenceClusterForm
    },
    setup(props) {

        // These aren't injected anywhere yet ... 
        provide('lexeme', props.lexeme)
        provide('cardLexeme', props.cardLexeme)
        provide('tags', props.tags)
        provide('audioUrl', props.audioUrl)
        provide('flag', props.flag)
        provide('note', props.note)
        provide('side', props.side)
        provide('BASE_URL', BASE_URL)

        const url = ref(`${BASE_URL.LOCALHOST}/dicts?headword=${props.lexeme}`);
        const { data, error } = useFetch(url);

        const matchesUrl = ref(`${BASE_URL.LOCALHOST}/dicts/`);

        const { data: Dictionary, error: _error } = useFetch(matchesUrl)

        const subforms = computed(() => {
            const { allMatches } = useGetSubforms(props.lexeme, Dictionary)

            return allMatches.value
        })

        const listings = computed(() => {
            if (data.value?.[0]?.listings && Array.isArray(data.value[0].listings)) {
                return data.value[0].listings
            }
            return []
        })

        const isBackSide = computed(() => props.side === 'back')

        function openDialog() {
            const favDialog = document.getElementById("fav-dialog");
            favDialog.showModal();
        }

        return { data, error, subforms, listings, isBackSide, openDialog };

    },
    template: /*html*/ `

    <div class="card-front">
        <AudioButtons :lexeme="cardLexeme"/>
        <button @click="openDialog">Show modal</button>
        <InterferenceClusterForm />
    </div>

    <div class="card-back" v-if="isBackSide">
    
        <template v-for="listing in listings">
            <ListingItem :item="listing" />
        </template>
        
        <SubformList :lexeme="cardLexeme" :items="subforms" />
        
    </div>
  `,
};