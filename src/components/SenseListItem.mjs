import { computed } from 'vue'
import ExampleList from "./ExampleList.mjs";

export default {
  props: ["item"],
  name: "SenseListItem",
  components: { 'ExampleList': ExampleList },
  setup(props) {

    const sense = computed(() => props.item ?? null)

    return { sense }
  },
  template: /*html*/ `
    <li v-if="sense" class="listing-sense-item">

        <template v-if="sense.partOfSpeech">
            <template v-for="pos in sense.partOfSpeech" >
                <span class="listing-part-of-speech">
                    {{pos}}
                </span>
            </template>
        </template>

        <span v-if="sense.predicates" class="listing-sense-item-predicates grammar">
          {{sense.predicates.join(', ')}}
        </span>
        <span v-if="sense.gloss" class="listing-sense-item-gloss"> 
            {{sense.gloss}}
        </span>

        <ExampleList :items="sense.examples"  />        

    </li>
  `,
};
/**
 * 
    {
      "gloss": "throughout, among, all over",
      "examples": [
        {
          "gaelic": "ar fud na tíre",
          "béarla": "all over the country"
        }
      ]
    }
  
 */