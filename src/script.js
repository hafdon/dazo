/**
 * <script type="text/javascript" src="_script.js"></script>
 *
 * @todo - dialog that shows other words (with clickable pronunciations) that have
 *         the same spelling, for sound comparison.
 * @todo - something like: this word has these spelling parts. they are usually
 *         pronounced like this. Do they match?
 */

import './style.css';

const BASE_URL = {
  FUAIMEANNA_IE: 'http://www.fuaimeanna.ie',
  TEANGLANN_IE: 'https://www.teanglann.ie',
  LOCALHOST: 'http://localhost:3001/',
};

const NOTES = {
  CUPLA: 'Basic-d9c90', // card 1?
  NOUN: 'noun', // card 1
  VERB: 'verb',
  ADJECTIVE: 'adjective',
  DICTIONARY: 'dict',
};

const NOTES_USING_AUDIO_PORTAL = [
  NOTES.CUPLA,
  NOTES.NOUN,
  NOTES.VERB,
  NOTES.ADJECTIVE,
  NOTES.DICTIONARY,
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const keycodeMap = {
  z: 'ulster',
  x: 'connacht',
  c: 'munster',
};

const keycodeHandlers = async function (event) {
  const stopPropagationEls = ['interference-cluster-form-id'];
  let bail = false;

  stopPropagationEls.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      bail = true;
    }
  });

  if (bail) {
    log('Stopping keycode handler.');
    return;
  }

  switch (event.key) {
    case 'z': {
      playAudio(getAudioId(getCardLexeme(), keycodeMap['z']));
      break;
    }
    case 'x': {
      playAudio(getAudioId(getCardLexeme(), keycodeMap['x']));
      break;
    }
    case 'c': {
      playAudio(getAudioId(getCardLexeme(), keycodeMap['c']));
      break;
    }
    case '9': {
      toggleVisibility('hints-bearla');
      break;
    }
    case '0': {
      toggleVisibility('hints-phonetic');
      break;
    }
    case '8': {
      toggleVisibility('hints-bearla-notes');
      break;
    }
    case 'w': {
      toggleVisibility('hints-phonetic');
      toggleVisibility('hints-bearla');
      toggleVisibility('hints-bearla-notes');
      break;
    }
    case 'j': {
      log('[j] pressed');
      doInterferenceClusterAlert();
      break;
    }
    case 'Shift': {
      initAll();
      break;
    }
    case 'q':
    case 'u':
      myAlert(getCardLexeme());
      break;

    case 'p': {
      doClick('cluster-crud-dialog-button-id');
      break;
    }
    case 'g': {
      doClick('phonics-dialog-button-id');
      break;
    }

    case 'h': {
      doClick('cluster-comparison-dialog-button-id');
      break;
    }
    // (mac) command key
    case 'Meta':
    case 'k':
    case 'l':
    case ';':
    case "'":
    case '[':
    case ']':
    case '.':
    case ',':
    case 'm':
    case 'n':
    case 'v':
    default:
      break;
  }
};

function doClick(id) {
  const el = document.getElementById(id);
  if (el) {
    el.click();
  }
}

/**
 * Get the word that the specific CARD (rather than the general NOTE)
 * is associated with. It should be on the [data-card] attribute
 * of the data div.
 */
function getCardLexeme() {
  const lexeme = getData('lexeme');
  const card = getData('card');

  return !card || card === lexeme ? lexeme : card;
}

function isElActive(id) {
  const el = document.getElementById(id) ?? null;
  if (el && el.style) {
    return el.style.display !== 'none';
  }
  return false;
}

/**
 * Opens default ALERT dialog box provided by global window object
 */
function myAlert(msg) {
  window.alert(msg);
}

function toggleVisibility(id) {
  const el = document.getElementById(id) ?? null;
  if (el && el.style) {
    el.style.display = el.style.display === 'none' ? 'inherit' : 'none';
  }
}

function log(msg) {
  console.log(Date.now() + ': ' + msg);
}

function setAudioFallbackDisplayStyle(param) {
  const audioFallback = document.getElementById('audio-fallback');

  if (audioFallback && audioFallback.style) {
    audioFallback.style.display = param;
    audioFallback.style.outline = 'thick solid red';
  }
}

/**
 *
 *
 * @param {*} param
 */
function setAudioOkDisplayStyle(param) {
  const el = document.getElementById('audio-portal');
  if (el && el.style) {
    el.style.outline = 'thick solid yellow';
    el.style.display = param;
  }
  if (param === 'none') {
    log('Unable to retrieve audio from server.');
  }
}

// play audio for audio source with given id
function playAudio(id) {
  const el = document.getElementById(id);
  // myAlert("playAudio el:" + el);
  if (el) {
    el.play();
  }
}

document.onreadystatechange = () => {
  log('document.readyState ' + document.readyState);
  if (document.readyState === 'complete') {
    log('document.readyState === complete');

    document.addEventListener('keydown', keycodeHandlers, false);

    initApplication();
  }
};

const getAudioEls = (_lexeme) => {
  const lexeme = !!_lexeme ? _lexeme : getCardLexeme();

  const locations = ['connacht', 'ulster', 'munster'];

  return locations.map((l) => ({
    location: l,
    element: document.getElementById(getAudioId(lexeme, l)),
    button: document.getElementById(getAudioButtonId(lexeme, l)),
  }));
};

function setAudioAutoplay() {
  // myAlert("setAudioAutoplay");
  const elements = getAudioEls();

  // get random location index
  const rand = getRandomInt(elements.length + 1);

  // set autoplay where rand = index
  elements.forEach((el, index) => {
    const autoplay = rand === index;
    // el.element.autoplay = autoplay;
    if (el && autoplay) {
      // change color of corresponding button
      el.element.play();
      el.button.style.background = 'lightblue';
    }
  });
}

function initAudio(rand = false) {
  if (NOTES_USING_AUDIO_PORTAL.includes(getData('note'))) {
    // put buttons and links in audio portal
    setInnerHTML('audio-portal', htmlAudioPerLexeme(null, false));
  }
  // activate audio html

  const elements = getAudioEls();

  try {
    elements.forEach((el) => {
      el.element.addEventListener('error', () => {
        setAudioFallbackDisplayStyle('inherit');
        setAudioOkDisplayStyle('none');
        audioError = true;
      });
    });
  } catch (error) {
    // this error will happen if there is manual audio, which is fine
    log('elements.forEach error' + error);
  }

  // If we should play a random location's audio,
  // and it's not the back of the card
  // then set autoplay on a random audio element
  if (rand && !isElActive('answer')) {
    setAudioAutoplay();
  }
}

function getAudioId(lexeme, location) {
  if (!location || !lexeme) {
    // myAlert("getAudioId must receive lexeme and location");
  }

  const id = `audio-${location}-${lexeme}`.replaceAll(' ', '-');
  return id;
}

/**
 *
 *
 * @param {*} lexeme
 * @param {*} location
 * @returns {string} id
 */
function getAudioButtonId(lexeme, location) {
  if (!location || !lexeme) {
    // myAlert("getAudioButtonId must receive lexeme and location");
  }

  const id = `audio-${location}-${lexeme}-button`.replaceAll(' ', '-');
  return id;
}

function htmlAudioButton(lexeme, location) {
  return /*html*/ `<button 
		id="${getAudioButtonId(lexeme, location)}" 
		class="audio-control-play"
		onclick="playAudio('${getAudioId(lexeme, location)}')"
	>${location}</button>`;
}

function htmlAudioLink(lexeme, location, src) {
  if (!lexeme || !location || !src) {
    myAlert('Audio link requires lexeme and location');
  }

  const html = /*html*/ `<audio id="${getAudioId(
    lexeme,
    location
  )}" preload="auto" src="${src}"></audio>`;
  return html;
}

function htmlAudioLinks(lexeme, location) {
  const upper = location.charAt(0).toUpperCase();
  const fuaimsMap = {
    ulster: 1,
    connacht: 3,
    munster: 2,
  };

  src = '';

  const tags = getData('tags');

  if (tags.includes('fuaims')) {
    const url = getData('url');

    src = `${BASE_URL.FUAIMEANNA_IE}${url.replaceAll(
      '1',
      fuaimsMap[location]
    )}`;
  } else {
    src = `${BASE_URL.TEANGLANN_IE}/Can${upper}/${lexeme}.mp3`;
  }

  return htmlAudioLink(lexeme, location, src);
}
/**
 * @param {string} lexeme headword with available pronunciation
 * @returns {string} html for (3) audio buttons and links for given lexeme
 */
function htmlAudioPerLexeme(_lexeme, showLexeme = true) {
  const lexeme = !!_lexeme ? _lexeme : getCardLexeme();

  const locations = ['ulster', 'connacht', 'munster'];
  let html = '';

  html += /*html*/ `<div class="audio-wrapper">`;

  if (showLexeme) {
    html += /*html*/ `<div class="gaelic lexeme">${lexeme}</div>`;
  }

  html += /*html*/ `<div class="audio-controls-${lexeme}">`;
  locations.forEach((l) => {
    html += htmlAudioButton(lexeme, l);
  });

  html += /*html*/ `</div>`; // end audio-controls
  html += /*html*/ `<div class="audio-elements">`;

  locations.forEach((l) => {
    html += htmlAudioLinks(lexeme, l);
  });

  html += /*html*/ `</div>`; // end audio-elements
  html += /*html*/ `</div>`; // end audio-wrapper

  return html;
}

/**
 *
 *
 * @param {*} id
 * @returns {string} the value of the [data-"id"] attribute
 */
function getData(id) {
  const dataEl = document.getElementById('data-div');
  if (dataEl && dataEl.dataset) {
    return dataEl.dataset[id];
  }
  return null;
}

function initPotaFocalLink() {
  const linkEl = document.getElementById('pota-focal-link-wrapper');
  const lexeme = getData('lexeme');

  if (linkEl && lexeme) {
    function initPotaFocalLinkCb(data) {
      if (data.includes(lexeme)) {
        linkEl.style.display = 'inherit';
      }
    }

    get('potafocal', initPotaFocalLinkCb);
  }
}

function get(url, cb) {
  log('get from ' + url);
  const xhr = new XMLHttpRequest();
  xhr.onload = (res) => {
    if (res.target.status == 200) {
      // log("res.target.status == 200 " + res.target.responseText);
      const parsed = JSON.parse(res.target.responseText);
      cb(parsed);
    }
  };
  xhr.open('GET', `${BASE_URL.LOCALHOST}${url}`, true);
  xhr.send();
}

function getInterferenceCluster(lexeme, cb) {
  log('getInterferenceCluster receiving lexeme: ' + lexeme);

  function getInterferenceClusterCb(data) {
    log('getInterferenceClusterCb typeof data:' + typeof data);
    const cluster = data.filter((d) =>
      Object.keys(d.cluster).includes(lexeme)
    );

    cb(cluster.length ? cluster[0].cluster : null);
  }

  get(`interferesIds`, getInterferenceClusterCb);
}

function doInterferenceClusterAlert(_lexeme, excludeSelf = true) {
  const lexeme = !!_lexeme ? _lexeme : getData('lexeme');

  if (lexeme) {
    log('getInterferenceClusterAlertString: ' + lexeme);
    function getInterferenceClusterAlertStringCb(cluster) {
      log('getInterferenceClusterAlertStringCb');

      if (cluster) {
        log('getInterferenceClusterAlertStringCb cluster: ' + cluster);
        if (Object.keys(cluster).length) {
          let str = '';

          for (const k of Object.keys(cluster)) {
            if (k !== lexeme || !excludeSelf) {
              str += `${k} (${cluster[k]})  <br>`;
            }
          }
          myAlert(`<p>${str}</p>`);
        }
      } else {
        myAlert('No cluster.');
      }
    }

    getInterferenceCluster(lexeme, getInterferenceClusterAlertStringCb);
  } else {
    myAlert('No lexeme.');
  }
}

/**
 * @param {string} id HTML id attribute of element
 * @param {*} str HTML to bind to innerHTML of element
 * @returns {HTMLElement}
 */
function setInnerHTML(id, str) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = str;
  }
  return el ?? null;
}

let count = 0;

function initAll() {
  count++;
  log(' == INIT ALL == ' + count);

  initAudio(true);
  initPotaFocalLink();
}

function initApplication() {
  // Select the node that will be observed for mutations
  // const targetNode = document.getElementsByTagName("body")[0];
  const targetNode = document.getElementsByTagName('body')[0];

  log('initApplication');

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: false, subtree: false };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, _observer) => {
    log(
      JSON.stringify(
        { msg: 'initApplication callback', mutationList, _observer },
        null,
        2
      )
    );
    for (const mutation of mutationList) {
      log(JSON.stringify({ mutation }, null, 2));
      if (mutation.type === 'childList') {
        // do nothing
      } else if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        initAll();
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  initAll();
}
