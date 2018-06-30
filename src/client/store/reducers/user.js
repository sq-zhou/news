const initUser = {
    userId: 0,
    loginState: 0,
    username: ''
}
export default user = (state = initUser, actions) => {
    switch (actions.type) {
        case 'login':
            return state;
        case  'loginout':
            return state;
        default: 
            return state;
    }
}