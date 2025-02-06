const initialState = {
    Posts: [],
    OriginalPosts: [],
    Details: null,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_POSTS":
            return { ...state, Posts: action.payload, OriginalPosts: action.payload };
        case "GET_POST_BY_ID":
            return { ...state, Details: action.payload };
        case "POST_UPDATED":
            return { ...state };
        case "CREATE_POST":
            return { ...state };
        case "REMOVE_POST":
            return { ...state };
        case "CLEAR_DETAIL":
            return { ...state, Details: null };
        default:
            return state;
    }
}

export default rootReducer;
