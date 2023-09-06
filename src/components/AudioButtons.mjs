import { ref, inject } from 'vue'
import { useLogger } from '../composables/useLogger.mjs';

const fuaimsIds = {
  ulster: 1,
  connacht: 3,
  munster: 2,
};

export default {
  props: {
    'lexeme': { type: String, required: true },
    'showLexeme': { type: Boolean, default: () => false },
    'showDef': { type: Boolean, default: () => false },
    'def': { type: String, default: () => '' },
    'keycodes': { type: Boolean, default: () => true }
  },
  name: 'AudioButtons',
  setup(props) {

    const BASE_URL = inject('BASE_URL')
    const tags = inject("tags");
    const url = inject("audioUrl")

    function getSrc(location) {

      const src = tags.includes("fuaims")
        ? `${BASE_URL.FUAIMEANNA_IE}${url.replaceAll(
          "1", fuaimsIds[location])}`
        : `${BASE_URL.TEANGLANN_IE}/Can${location.charAt(0).toUpperCase()}/${props.lexeme}.mp3`

      useLogger(src)
      return src
    }

    const locationsInfo = ref(["ulster", "connacht", "munster"].map(location => ({
      location,
      buttonId: `audio-${location}-${props.lexeme}-button`.replaceAll(" ", "-"),
      audioId: `audio-${location}-${props.lexeme}`.replaceAll(" ", "-"),
      src: getSrc(location),
      // https://vuejs.org/guide/essentials/template-refs.html#refs-inside-v-for
      // This gets assigned when template is mounted; see template
      el: null
    })))

    const dialogRef = ref(null)

    function onLexemeClick() {
      dialogRef.value?.showModal()
    }

    return { locationsInfo, dialogRef, onLexemeClick }
  },
  template: /*html*/ `
    <div class="audio-wrapper">

      <div @click="onLexemeClick">
        <span v-if="showLexeme && lexeme" class="gaelic lexeme">{{lexeme}}</span>
        <span v-if="showDef && def" class="bearla parens space-left">{{def}}</span>
      </div>

        <div v-for="(info, idx) in locationsInfo" class="audio-controls" >
          <button :id="info.buttonId"
                  class="audio-control-play"
                  @click="info.el.play()"
          >{{info.location}}</button>

          <audio :id="info.audioId" 
                :ref="el => {info.el = el}"
                preload="auto" 
                :src="info.src"></audio>
        </div>

        <dialog ref="dialogRef">
        <p>Boo</p>
        </dialog>
      
    </div>
    `
}