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
import InterferenceClusterComparison from './InterferenceClusterComparison.mjs'
import PhonicsTable from './PhonicsTable.mjs'

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
        'InterferenceClusterForm': InterferenceClusterForm,
        'InterferenceClusterComparison': InterferenceClusterComparison,
        'PhonicsTable': PhonicsTable
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

        const phonicsDialogRef = ref(null)
        const clusterDialogRef = ref(null)
        const clusterComparisonDialogRef = ref(null)

        function openPhonicsDialog() {
            phonicsDialogRef.value.showModal();
        }

        function openClusterDialog() {
            clusterDialogRef.value.showModal();
        }

        function closeClusterDialog() {
            clusterDialogRef.value.close();
        }

        function openClusterComparisonDialog() {
            clusterComparisonDialogRef.value.showModal()
        }

        return {
            data, error, subforms, listings,
            isBackSide, phonicsDialogRef,
            openPhonicsDialog, closeClusterDialog,
            clusterDialogRef, openClusterDialog,
            clusterComparisonDialogRef, openClusterComparisonDialog
        };

    },
    template: /*html*/ `

    <dialog ref="phonicsDialogRef"><PhonicsTable /></dialog>

    <dialog ref="clusterDialogRef">
        <InterferenceClusterForm 
            @submit="closeClusterDialog"
            @cancel="closeClusterDialog"/>
    </dialog>


    <dialog ref="clusterComparisonDialogRef">
        <h4>Interference Cluster Comparison</h4>
        <InterferenceClusterComparison />
    </dialog>
    
    <div class="card-front">
        <AudioButtons :lexeme="cardLexeme"/>
        <button @click="openClusterDialog">Add Interference Cluster</button>
        <button @click="openPhonicsDialog">Show Phonics Table</button>
        <button @click="openClusterComparisonDialog">Show Cluster Comparison Audio</button>
    </div>

    <div class="card-back" v-if="isBackSide">
    
        <template v-for="listing in listings">
            <ListingItem :item="listing" />
        </template>
        
        <SubformList :lexeme="cardLexeme" :items="subforms" />

    </div>
  `,
};