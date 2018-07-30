export const authInfo = (authData) => {
    let action = {
        type: "AUTH_INFO",
        payload: authData
    }
    return action;
}