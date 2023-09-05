import { computed } from 'vue'

/**
 * item should look like:
 *             {
              "gaelic": "X a fháil ar a luach",
              "béarla": "to get X at its proper value",
              "_meta": [
                "¬faigh"
              ]
            },
 */

export default {
  props: ["item"],
  name: "ExampleListItem",
  setup(props) {

    const example = computed(() => props.item ?? null)

    return { example };
  },
  template: /*html*/ `
  
    <li v-if="example" class="sense-example">
      <span v-if="example.gaelic" class="gaelic example">{{example.gaelic}}</span>
      <span v-if="example.béarla" class="bearla example">{{example.béarla}}</span>
    </li>
    
  `,
};