const ADD_TAG = 'ADD_TAG'
const FETCH_TAG = 'FETCH_TAG'

const initialState = {
    tagData: null
}

export const actionCreators = {
    fetchTag: (tagList) => ({ type: FETCH_TAG, payload: { tagList } }),
    addTag: (tag) => ({ type: ADD_TAG, payload: { tag } }),
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_TAG:
            let { tagList } = action.payload
            return {
                tagList
            }
        case ADD_TAG:
            return {
                ...state,
                tagList: [ ...state.tagList, action.payload.tag]
            }
        default:
            return state
    }
}
