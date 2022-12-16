
// check if an object is empty
// using for check Firestore object
function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export {
    isObjEmpty
}