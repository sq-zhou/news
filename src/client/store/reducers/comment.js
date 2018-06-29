const comment = (state, action) => {
    switch (action.type) {
        case 'addComment': {
            return {
                id: 1
            };
        }
        default: return state;
    }
}