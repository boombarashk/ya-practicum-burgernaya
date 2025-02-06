export default function collectFormValues(fields) {
    return fields.reduce((initialState, field) => {
        initialState[field.inputName] = field.value ?? ''
        return initialState
    }, {})
}