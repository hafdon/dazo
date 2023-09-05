import { computed, ref } from 'vue'
import SenseListItem from './SenseListItem.mjs'
import ExampleList from './ExampleList.mjs'

export default {
    // props: ['item', 'index'],
    props: {
        item: Object,
        index: {
            Number,
            default: () => 0
        }
    },
    components: {
        'SenseListItem': SenseListItem,
        'ExampleList': ExampleList
    },
    name: "ListingItem",
    setup(props) {

        const l = computed(() => props.item)
        const examplesExpanded = ref(false)

        return { l, examplesExpanded }
    },
    template:  /*html*/ `
    <div class="listing">
            <div class="listing-title">
                
                <span class="listing-title gaelic">{{l.title}}</span>
                  <!-- for-human-index starts at 1 -->
                  <span v-if="index !== null" class="headword-index">{{index + 1}}</span>
    
                <span v-if="l.equates" class="listing-title-equates gaelic">
                  {{l.equates}}
                </span>
    
                <template v-if="l.partOfSpeech">
                    <span v-for="part in l.partOfSpeech" class="listing-part-of-speech">{{part}}</span>
                </template>
    
            </div>
    
            <div class="listing-body">
    
                <div v-if="l.senses" class="listing-senses-wrapper">
    
                <div v-if="l.senses.general" 
                    class="listing-sense-general">
                    {{l.senses.general}}
                </div>
    
                <!-- Examples associated with general meaning -->
                <ExampleList :examples="l.senses.examples" :expanded="examplesExpanded" />
    
                <div v-if="l.senses.enumerated" class="listing-senses">
                    <ol>
                    <template v-for="sense in l.senses.enumerated" >
                   
                        <SenseListItem :item="sense" />
                    </template>
                    </ol>
                </div>
                
                </div>
            
            </div>
    
        </div>`
}
