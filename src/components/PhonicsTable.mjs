import { inject } from 'vue'
import { usePhonics } from '../composables/usePhonics.mjs'

export default {
  props: ['lexeme'],
  name: "PhonicsTable",
  components: {},
  setup(props) {

    const lexeme = inject('cardLexeme')
    console.log("PhonicsTable lexeme", lexeme)

    const { execs, colorLexeme } = usePhonics(lexeme)
    return { execs, colorLexeme };
  },
  template: /*html*/ `
    
    <div class="big-font" v-html="colorLexeme"></div>
    <div><table class="phonetics">
        <thead><th>regex</th><th>U</th><th>C</th><th>M</th><th>examples</th></thead>

        <template v-for="curr in execs">
          <tr :class="curr.styles.join(' ')">
          <td :class="'regex ' + curr.colorStyles.join(' ')">{{curr.regex}}</td>
          <td class="ipa">
            <ul>
              <li v-for="el in curr.ulster">{{el}}</li>
            </ul>
          </td>
          <td class="ipa">
            <ul>
              <li v-for="el in curr.connacht">{{el}}</li>
            </ul>
          </td>
          <td class="ipa">
            <ul>
              <li v-for="el in curr.munster">{{el}}</li>
            </ul>
          </td>
          <td class="gaelic">
            <ul class="compressed">
            
              <li v-for="example in curr.examples">
              <!-- TODO test if example is Array of words, or just string -->

                <span v-for="word in example" 
                    class="serialize-comma"
                    :class="word === lexeme ? 'example-is-lexeme' : ''">
                  {{word}}
                </span>
                
              </li>
            </ul>
          </td>
          </tr>
        </template>
          
    </table>
    </div>
    
  `,
};
