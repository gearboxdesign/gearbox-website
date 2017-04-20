export default Object.freeze({
    email: Object.freeze({
        id: 'email',
        type: String,
        validators: ['required', 'isEmail']
    }),
    message: Object.freeze({
        id: 'message',
        type: String,
        validators: ['required']
    }),
    name: Object.freeze({
        id: 'name',
        type: String,
        validators: ['required']
    })
});