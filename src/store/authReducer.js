const AUTH_INFO = "AUTH_INFO";

export const auth = (state = [], action) => {
    switch (action.type) {
        case AUTH_INFO:
        const { payload } = action
            return { payload };
        default:
            return state;
    }
}