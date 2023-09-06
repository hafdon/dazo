import { ref } from 'vue'

import { useFetch } from './useFetch.mjs'
import { useErrorLogger, useLogger } from './useLogger.mjs'

const BASE_URL = {
   FUAIMEANNA_IE: "http://www.fuaimeanna.ie",
   TEANGLANN_IE: "https://www.teanglann.ie",
   LOCALHOST: "http://localhost:3001",
}

export function useApi() {

}

/**
 * To search for any clusters with the lexeme "ae":
 * - http://localhost:3001/interferesIds?cluster.ae_like=.*
 * - (The '.*. at the end might be optional)
 */
export function useInterferenceClusterApi({ id = null, lexeme = null, method = 'GET' } = {}) {

   useLogger({ id, lexeme, method }, 'useInterferenceClusterApi')

   const url = ref(null)

   if (id === null && lexeme === null && method === 'GET') {
      url.value = `${BASE_URL.LOCALHOST}/interferesIds`
   } else if (lexeme !== null) {
      url.value = `${BASE_URL.LOCALHOST}/interferesIds?cluster.${lexeme}_like=.*`
   }

   const { data, error } = useFetch(url);

   if (error.value) {
      useErrorLogger(error, 'useFetch error')
   }

   return { data, error }

}