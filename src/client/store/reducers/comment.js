const initComment = {
    newId: 0
}

const comment = (state = initComment, action) => {
    switch (action.type) {
        case 'addComment': {
            return {
                id: 1
            };
        }
        default: return state;
    }
};

export default comment;
