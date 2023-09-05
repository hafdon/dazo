// https://vuejs.org/guide/reusability/composables.html#async-state-example
import { ref, watchEffect, toValue } from "vue";

export function usePost(url, body, id) {
  const data = ref(null);
  const error = ref(null);

  watchEffect(async () => {
    // reset state before fetching..
    data.value = null;
    error.value = null;

    // resolve the url value synchronously so it's tracked as a
    // dependency by watchEffect()
    const idValue = toValue(id)
    const fullUrl = `${toValue(url)}${idValue != null ? '/' + idValue : ''}`

    const options = {
      method: idValue != null ? 'PATCH' : 'POST',
      body: JSON.stringify(toValue(body)),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    console.log('======= useFetch ==========')
    console.log('urlValue', fullUrl)
    console.log('options')
    console.log(JSON.stringify(options, null, 4))

    try {
      // artificial delay / random error
      // await timeout();

      // unref() will return the ref value if it's a ref
      // otherwise the value will be returned as-is
      const res = await fetch(fullUrl, options);
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    }
  });

  return { data, error };
}

export function useFetch(url, opts) {
  const data = ref(null);
  const error = ref(null);

  watchEffect(async () => {
    // reset state before fetching..
    data.value = null;
    error.value = null;

    // resolve the url value synchronously so it's tracked as a
    // dependency by watchEffect()
    const urlValue = toValue(url);

    console.log('useFetch', { 'urlValue': urlValue })

    try {
      // artificial delay / random error
      // await timeout();

      // unref() will return the ref value if it's a ref
      // otherwise the value will be returned as-is
      const res = await fetch(urlValue);
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    }
  });

  return { data, error };
}

// artificial delay
function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve();
      } else {
        reject(new Error("Random Error"));
      }
    }, 300);
  });
}
