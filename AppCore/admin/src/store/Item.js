const ADD_ITEM = 'ADD_ITEM'
const FETCH_ITEM = 'FETCH_ITEM'
const DEL_ITEM = 'DEL_ITEM'

// For category
const ADD_CAT = 'ADD_CAT'

const initialState = {
    items: null
}

export const actionCreators = {
    addItem: (item) => ({ type: ADD_ITEM, payload: { item } }),
    deleteItem: (id) => ({ type: DEL_ITEM, payload: { id } }),
    fetchItem: (items) => ({ type: FETCH_ITEM, payload: { items } }),
    addCategory: (category) => ({ type: ADD_CAT, payload: { category } })
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
                items: [ ...state.items, action.payload.item]
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