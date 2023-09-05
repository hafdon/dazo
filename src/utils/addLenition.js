const lenitablesRegex = /^[bcdfgmpt]|^s[^cmpt]/i;

/**
 * @returns {string} Word with initial lenition.
 */
export default function addLenition(ortho) {
    if (ortho && lenitablesRegex.exec(ortho)) {
        const [first, ...rest] = ortho;
        return [first, 'h', ...rest].join('');
    }
    return ortho
}