const initialState = {

}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case 'LOGGED_IN_USER':
        return payload
    case 'LOGOUT_USER':
        return payload

    default:
        return state
    }
}
