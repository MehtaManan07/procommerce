export const authLogin = (user) => async dispatch => {
    try {
        const idtokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: { email: user.email, token: idtokenResult.token },
        });
    } catch (error) {
        console.log(error)
    }
}
