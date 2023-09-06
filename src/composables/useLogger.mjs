import { toValue } from 'vue'

/**
 * Log to console after JSON.stringify-ing args
 * @param  {...any} args 
 */
export function useLogger(...args) {

   args.map(a => {
      const argVal = toValue(a)
      return (typeof argVal === 'string')
         ? argVal
         : JSON.stringify(argVal, null, 4)
   })

   console.log('dazoLogger: ' + JSON.stringify(...args, null, 4))
}

/**
 * Will silently return if there's no error.
 * This allows me to use it without putting the 
 * 'if' statement in the calling context.
 */
export function useErrorLogger(error, ...args) {

   if (toValue(error)) {
      useLogger('ERROR', error, ...args)
   }
}