const ADD_CATEGORY = 'ADD_CATEGORY'
const FETCH_CATEGORY = 'FETCH_CATEGORY'

const initialState = {
    categoryList: null
}

export const actionCreators = {
    fetchCategory: (categoryList) => ({ type: FETCH_CATEGORY, payload: { categoryList } }),
    addCategory: (category) => ({ type: ADD_CATEGORY, payload: { category } }),
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_CATEGORY:
            let { categoryList } = action.payload
            return {
                categoryList
            }
        case ADD_CATEGORY:
            return {
                ...state,
                categoryList: [ ...state.categoryList, action.payload.category]
            }
        default:
            return state
    }
}
