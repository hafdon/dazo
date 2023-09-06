import { onMounted, onUnmounted, toValue } from 'vue'

export function useEventListener(_event, cb) {

    const event = toValue(_event)
    // const cb = toValue(_cb)

    if (typeof event !== 'string') {
        throw new Error('event passed to useEventListener must be a string');
    }

    if (typeof cb !== 'function') {
        console.error('callback function passed to useEventListener'
            + "is typeof " + typeof cb)
        // throw new Error(
        //     'callback function passed to useEventListener' +
        //     'must be a function'
        // );
    }

    onMounted(() => {
        // Prevent text from bubbling up to the Anki program
        document.addEventListener(event, cb);
    });

    onUnmounted(() => {
        document.removeEventListener(event, cb);
    });
}
