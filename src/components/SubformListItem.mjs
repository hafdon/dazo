import { computed } from "vue";
import ListingItem from './ListingItem.mjs'

export default {

  props: ['item'],
  name: 'SubformListItem',
  components: { 'ListingItem': ListingItem },
  setup(props) {

    const computedItem = computed(() => props.item)

    return {
      computedItem
    }

  },
  template: /*html*/ `
  
        <div v-if="computedItem" class="sub-forms-matches-wrapper">

            <!--
            <div class="sub-forms-matches-headword">
                <span class="gaelic">{{computedItem.headword}}</span>
              
                <span class="headword-index">{{computedItem.index + 1}}</span>
            </div> 
            -->

            <ListingItem v-if="computedItem.listing" 
                :item="computedItem.listing"
                :index="computedItem.index" />

            <ul class="sub-forms-matches-list">
            <template v-for="match in computedItem.matches">
            
                <li v-for="(grammar, lemma) in match"  class="sub-forms-matches-item">
                  <!-- 
                  This desructures counter to what you'd expect, maybe:
                    v=for="(value, key) in obj"
                  -->
                
                    <span class="gaelic">{{lemma}}</span>
                    <span class="bearla grammar">{{grammar}}</span> 
                </li>
                
            </template>
            </ul>
        </div>`
}