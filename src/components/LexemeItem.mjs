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

        /**
         * Provide / Inject
         **/
        provide('lexeme', props.lexeme)
        provide('cardLexeme', props.cardLexeme) // only applicable for verbs cards?
        provide('tags', props.tags)
        provide('audioUrl', props.audioUrl)
        provide('flag', props.flag)
        provide('note', props.note)
        provide('side', props.side)
        provide('BASE_URL', BASE_URL)

        const url = ref(`${BASE_URL.LOCALHOST}/dicts?headword=${props.lexeme}`);
        const { data, error } = useFetch(url);

        const matchesUrl = ref(`${BASE_URL.LOCALHOST}/dicts/`);

        const { data: Dictionary } = useFetch(matchesUrl)

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

        const id = computed(() => (data.value?.[0])
            ? data.value[0].id
            : null
        )

        // this comes in as a prop from the Anki card
        const isBackSide = computed(() => props.side === 'back')

        // refs (in both vue and html sense)
        // for opening <dialog> elements
        const phonicsDialogRef = ref(null)
        const clusterDialogRef = ref(null)
        const showClusterDialog = ref(false)
        const showPhonicsDialog = ref(false)
        const clusterComparisonDialogRef = ref(null)
        const showClusterComparisonDialog = ref(false)

        function openPhonicsDialog() {
            showPhonicsDialog.value = true
            phonicsDialogRef.value.showModal();
        }

        function closePhonicsDialog() {
            phonicsDialogRef.value.close();
            showPhonicsDialog.value = false
        }

        function openClusterDialog() {
            showClusterDialog.value = true
            clusterDialogRef.value.showModal();
        }

        function closeClusterDialog() {
            clusterDialogRef.value.close();
            showClusterDialog.value = false
        }

        function openClusterComparisonDialog() {
            showClusterComparisonDialog.value = true
            clusterComparisonDialogRef.value.showModal()
        }

        function closeClusterComparisonDialog() {
            clusterComparisonDialogRef.value.close()
            showClusterComparisonDialog.value = false
        }

        return {
            id, data, error, subforms, listings,
            isBackSide,

            phonicsDialogRef, openPhonicsDialog,
            closePhonicsDialog, showPhonicsDialog,

            closeClusterDialog, showClusterDialog,
            clusterDialogRef, openClusterDialog,

            clusterComparisonDialogRef,
            openClusterComparisonDialog,
            showClusterComparisonDialog,
            closeClusterComparisonDialog
        };

    },
    template: /*html*/ `

    <dialog ref="phonicsDialogRef" 
       @close="closePhonicsDialog"
    ><PhonicsTable v-if="showPhonicsDialog" /></dialog>

    <dialog ref="clusterDialogRef"
            @close="closeClusterDialog">
        <InterferenceClusterForm 
            id="interference-cluster-form-id"
            v-if="showClusterDialog"
            @submit="closeClusterDialog"
            @cancel="closeClusterDialog"
        />
    </dialog>

    <dialog ref="clusterComparisonDialogRef" @close="closeClusterComparisonDialog">
        <InterferenceClusterComparison v-if="showClusterComparisonDialog" />
    </dialog>
    
    <div class="card-front">

        <div class="controls">
            <AudioButtons :lexeme="cardLexeme"/>
            <button @click="openClusterDialog"
                id="cluster-crud-dialog-button-id">Add Interference Cluster</button>
            <button @click="openPhonicsDialog" 
                id="phonics-dialog-button-id">Show Phonics Table</button>
            <button @click="openClusterComparisonDialog"
                id="cluster-comparison-dialog-button-id">Show Cluster Comparison Audio</button>
        </div>
    </div>

    <div class="card-back" v-if="isBackSide">
    
        <template v-for="listing in listings">
            <ListingItem :item="listing" :id="id" />
        </template>
        
        <SubformList :lexeme="cardLexeme" :items="subforms" />

    </div>

    <div class="card-back" v-if="isBackSide">
    
    <template v-for="listing in listings">
        <ListingItem :item="listing" :id="id" />
    </template>

    </div>
  `,
};