import { onMounted, onUnmounted, toValue } from 'vue'

export function useEventListener(_event, cb, target) {

    const event = toValue(_event)
    // const cb = toValue(_cb)

    if (typeof event !== 'string') {
        throw new Error('event passed to useEventListener must be a string');
    }

    if (typeof cb !== 'function') {
        console.error('callback function passed to useEventListener'
            + "is typeof " + typeof cb)
    }


    onMounted(() => {
        // Prevent text from bubbling up to the Anki program
        if (!target) {
            document.addEventListener(event, cb);
        }
        else {
            const targetVal = toValue(target)
            targetVal.addEventListener(event, cb);
        }
    });

    onUnmounted(() => {
        if (!target) {
            document.removeEventListener(event, cb);
        } else {
            const targetVal = toValue(target)
            targetVal.removeEventListener(event, cb);
        }

    });
}
