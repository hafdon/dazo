import { computed, inject, ref, toValue } from 'vue'
import { useFetch, usePost } from "../composables/useFetch.mjs"
import { useEventListener } from "../composables/useEventListener.mjs"
import { useLogger, useErrorLogger } from '../composables/useLogger.mjs'
import { useInterferenceClusterApi } from '../composables/useApi.mjs'

export default {
    props: [],
    name: 'InterferenceClusterForm',
    setup(props, { emit }) {

        // Let user type into input box without 
        // triggering keyboard shortcuts.
        useEventListener('keydown', (e) => { e.stopPropagation() })

        const cardLexeme = inject('cardLexeme')
        // const BASE_URL = inject('BASE_URL')
        // const url = ref(`${BASE_URL.LOCALHOST}/interferesIds`)
        // const { data, error } = useFetch(url);

        const { data, error } = useInterferenceClusterApi()

        if (error.value) {
            useErrorLogger(error, 'useFetch error')
        }

        const selectRef = ref(null)
        const inputRef = ref(null)

        const clusterOptions = computed(() => {

            if (Array.isArray(data.value)) {
                return data.value.map((cluster) => ({
                    value: cluster.id,
                    text: Object.keys(cluster.cluster).join(", "),
                })).sort((a, b) => a.text.localeCompare(b.text))
            }
            return []
        })

        function onSubmit(event) {
            event.preventDefault();

            const urlId = selectRef.value.value === "new" ? null : selectRef.value.value
            // if this is creating a new cluster,
            // set up existingOpts so we can destructure it later
            // as though it were a cluster we're adding to
            const existingOpts = urlId === null
                ? [{ cluster: {} }] : data.value.filter(c => c.id == urlId)

            useLogger(urlId, existingOpts)

            const submitUrl = `${BASE_URL.LOCALHOST}/interferesIds`
            // Add to the cluster so we don't replace it
            const body = {
                cluster: {
                    [toValue(cardLexeme)]: inputRef.value.value,
                    ...existingOpts[0].cluster
                }
            }

            try {
                usePost(submitUrl, body, urlId);
            } catch (error) {
                console.log(error)
                window.alert("Error trying to save.")
            }
            emit('submit')
        }


        function onCancel(event) {
            event.preventDefault();
            emit('cancel')
        }

        return {
            clusterOptions, onSubmit, onCancel, selectRef, inputRef
        }

    },
    template:  /*html*/ `
        <form>
            <p>
            <label>
                Add to interference cluster:
                <select 
                    name="interference-clusters" id="interference-clusters-select" 
                    ref="selectRef">
                <option value="new" selected>Create New Cluster</option>
                <option v-for="opt in clusterOptions" :value="opt.value">{{opt.text}}</option>
                </select>
            </label>
            </p>
            <p>
            <label>
                Concise definition: <input type="text" id="definition" ref="inputRef" />
            </label>
            </p>
            <div>
                <button type="cancel" @click.prevent="onCancel">Cancel</button>
                <button type="submit" @click.prevent="onSubmit">Submit</button>
            </div>
        </form>
    `
}