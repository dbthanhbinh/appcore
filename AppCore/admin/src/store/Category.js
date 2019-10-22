const ADD_CATEGORY = 'ADD_CATEGORY'
const FETCH_CATEGORY = 'FETCH_CATEGORY'

const initialState = {
    categoryLists: null
}

export const actionCreators = {
    fetchCategory: (categoryLists) => ({ type: FETCH_CATEGORY, payload: { categoryLists } }),
    addCategory: (category) => ({ type: ADD_CATEGORY, payload: { category } }),
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_CATEGORY:
            let { categoryLists } = action.payload
            return {
                categoryLists
            }
        case ADD_CATEGORY:
            return {
                ...state,
                categoryLists: [ ...state.categoryLists, action.payload.category]
            }
        default:
            return state
    }
}
