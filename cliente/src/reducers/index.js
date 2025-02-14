const initialState = {
    Posts: [],
    OriginalPosts: [],
    Details: null,
    uploadedImages: {
        coverImage: null,
        contentImages: {}
    },
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
        case "UPLOAD_IMAGE_SUCCESS":
            const { imageUrl, imageType, index } = action.payload;

            if (imageType === "coverImage") {
                return { ...state, uploadedImages: { ...state.uploadedImages, coverImage: imageUrl } };
            }

            if (imageType === "contentImage") {
                return {
                    ...state,
                    uploadedImages: {
                        ...state.uploadedImages,
                        contentImages: { ...state.uploadedImages.contentImages, [index]: imageUrl }
                    }
                };
            }

            return {...state};
        case "CLEAR_IMAGE_SUCCESS":
            return {...state, uploadedImages: {
                coverImage: null,
                contentImages: {}
            }};
        case "SUBSCRIBE":
            return {...state};
        case "SEND_NEWSLETTER":
            return {...state};
        case "UNSUBSCRIBE":
            return {...state};
        default:
            return state;
    }
}

export default rootReducer;
