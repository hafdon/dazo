
export default function (obj) {
    if (!obj) {
        return false;
    } else if (!Array.isArray(obj)) {
        return false;
    } else if (obj.length === 0) {
        return false;
    }
    return true;
}