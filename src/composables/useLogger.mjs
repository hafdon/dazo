import { toValue } from 'vue'

export function useLogger(...args) {

   console.log('    useLogger ===> ')

   args.map(a => {
      const argVal = toValue(a)
      if (typeof argVal === 'string') {
         return argVal
      } else {
         return JSON.stringify(argVal, null, 4)
      }
   })

   console.log(JSON.stringify(...args, null, 4))

   console.log('    <=== useLogger ')

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