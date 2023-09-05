import { computed, ref } from 'vue';
import ExampleListItem from './ExampleListItem.mjs';

export default {
    props: ['items'],
    // emits: ['update:modelExpanded'],
    name: 'ExampleList',
    components: { 'ExampleListItem': ExampleListItem },
    setup(props, { emit }) {
        // const expanded = computed({
        //     get() {
        //         return props.modelExpanded
        //     },
        //     set(value) {
        //         emit('update:modelExpanded', value)
        //     }
        // })

        // const expanded = ref(true);

        // const examples = computed(() => Array.isArray(props.items) ? props.items : [])

        // const visibleExamples = computed(() => examples.value);

        // function toggleExpand() {
        //     expanded.value = !expanded.value;
        // }

        // return { visibleExamples, toggleExpand, expanded };
    },
    template: /*html*/ `
    
        <ul v-if="items">
            
            <template v-for="example in items">
                <ExampleListItem  :item="example" />
            </template>
        </ul>
    
  `,
};

/**
 *         <div @click="toggleExpand">
        <span v-if="expanded" class="glyphicon glyphicon-expand"></span>
        <span v-if="!expanded" class="glyphicon glyphicon-collapse-up"></span>
        </div>
 */