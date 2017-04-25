export default function getAsyncState(action = {}) {

    const { data, errors } = action;

    return {
        _loading: !(data || errors),
        data,
        errors
    }
}