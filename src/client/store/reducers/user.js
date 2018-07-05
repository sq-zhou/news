
const user = (state = null, action) => {
    switch (action.type) {
        case 'login':
            const { payload } = action;
            return payload;
        case  'logout':
            return null;
        default: 
            return state;
    }
};

export default user;
