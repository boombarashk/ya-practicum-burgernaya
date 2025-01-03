export default function findByParam(collection, id, param = '_id') {
    const selectedItems = collection.filter(item => item[param] === id)
    if (selectedItems) {
        return selectedItems[0]
    }

    return null
}