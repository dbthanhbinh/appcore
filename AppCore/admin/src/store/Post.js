import _ from 'lodash'
const ADD_ITEM = 'ADD_ITEM'
const FETCH_ITEM = 'FETCH_ITEM'
const DEL_ITEM = 'DEL_ITEM'
const initialState = {
    items: null
}

export const actionCreators = {
    addItem: (post) => ({ type: ADD_ITEM, payload: { post } }),
    deleteItem: (id) => ({ type: DEL_ITEM, payload: { id } }),
    fetchItem: (items) => ({ type: FETCH_ITEM, payload: { items } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_ITEM:  // List of items
            let { items } = action.payload
            return { ...state, items }

        case ADD_ITEM:  // Add new item
            return {
                ...state,
                isLoading: false,
                isAddSuccess: true,
                items: [ ...state.items, action.payload.post]
            }
        case DEL_ITEM:   // Delete item
            return { 
                ...state,
                items: state.items.filter((f) => f.id !== action.payload.id)
            }
        default: // Return default state
            return state
    }
}