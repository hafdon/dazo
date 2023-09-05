import { watchEffect, ref, inject, onMounted, onUnmounted, onBeforeUnmount } from 'vue'

const fuaimsIds = {
  ulster: 1,
  connacht: 3,
  munster: 2,
};

// const keycodeMap = {
//   z: "ulster",
//   x: "connacht",
//   c: "munster",
// };

const locationsIndexMap = {
  z: 0,
  x: 1,
  c: 2,
};


export default {
  props: {
    'lexeme': { type: String, required: true },
    'showLexeme': { type: Boolean, default: () => false },
    'keycodes': { type: Boolean, default: () => true }
  },
  name: 'AudioButtons',
  setup(props) {

    const BASE_URL = inject('BASE_URL')
    const tags = inject("tags");
    const url = inject("audioUrl")
    console.log("injected audioUrl: " + url)

    const keycodeHandlers = function (event) {
      // console.log('keycodeHandler ' + event.key)

      if (!props.keycodes) {
        return
      }

      switch (event.key) {
        case "z": {
          locationsInfo.value[locationsIndexMap['z']].el.play();
          break;
        }
        case "x": {
          locationsInfo.value[locationsIndexMap['x']].el.play();
          break;
        }
        case "c": {
          locationsInfo.value[locationsIndexMap['c']].el.play();
          break;
        }
      }
    }


    function getSrc(location) {

      const src = tags.includes("fuaims")
        ? `${BASE_URL.FUAIMEANNA_IE}${url.replaceAll(
          "1", fuaimsIds[location])}`
        : `${BASE_URL.TEANGLANN_IE}/Can${location.charAt(0).toUpperCase()}/${props.lexeme}.mp3`

      console.log(src)
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

    return { locationsInfo }
  },
  template: /*html*/ `
    <div class="audio-wrapper">

      <div v-if="showLexeme" class="gaelic lexeme">{{lexeme}}</div>

      <div >

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

      </div>
    </div>
    `
}