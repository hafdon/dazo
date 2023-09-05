import { computed, inject, ref, toValue, onMounted, onUnmounted } from 'vue'
import { useFetch, usePost } from "../composables/useFetch.mjs"

export default {
    props: [],
    name: 'InterferenceClusterForm',
    setup(props) {

        const stopProp = (e) => { e.stopPropagation() }

        onMounted(() => {
            // Prevent keys from bubbling up to the Anki program
            document.addEventListener("keydown", stopProp);
        })

        onUnmounted(() => {
            document.removeEventListener("keydown", stopProp);
        })

        const BASE_URL = inject('BASE_URL')
        const cardLexeme = inject('cardLexeme')
        const url = ref(`${BASE_URL.LOCALHOST}/interferesIds`)

        const { data, error } = useFetch(url);

        const selectValue = ref([])
        const dialogRef = ref(null)
        const formRef = ref(null)
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

            console.log(JSON.stringify({ urlId, existingOpts }, null, 4))

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
            closeDialog()
        }

        function closeDialog() {
            dialogRef.value.close()
        }

        function onCancel(event) {
            event.preventDefault();
            closeDialog()
        }

        return {
            clusterOptions, onSubmit, selectValue,
            onCancel, dialogRef, formRef, selectRef, inputRef
        }

    },
    template:  /*html*/ `
        <dialog id="fav-dialog" ref="dialogRef">
            <form ref="formRef">
            <p>
            <label>
                Add to interference cluster:
                <select 
                    name="interference-clusters" id="interference-clusters-select" 
                    ref="selectRef"
                    :value="selectValue">
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
        </dialog>
    `
}