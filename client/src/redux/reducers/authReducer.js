export default (state = null, { type, payload }) => {
    switch (type) {

    case 'LOGGED_IN_USER':
        return payload
    case 'LOGOUT_USER':
        return payload

    default:
        return state
    }
}
