import { computed } from 'vue';
import SubformListItem from './SubformListItem.mjs';

export default {
    props: ['items', 'lexeme'],
    name: 'SubformList',
    components: { SubformListItem: SubformListItem },
    setup(props) {
        const subforms = computed(
            /**
                Don't show the matched form if it's the same as the lexeme,
                since that will show exactly the same thing that the 
                ListingItem shows. (eg. dualgas) 
            */
            () => props.items?.filter((i) => i.headword !== props.lexeme) ?? []
        );

        return { subforms };
    },
    template: /*html*/ `
    <div v-if="subforms.length" class="sub-forms-container">

        <div class="sub-forms-header">Matches found for form 
        <span class="gaelic">{{lexeme}}</span>:</div>
        
        <template v-for="item in subforms" >
            <SubformListItem :item="item"/>
        </template>
    </div>
    `,
};
