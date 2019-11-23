const ADD_USER = 'ADD_USER'
const LOGIN_USER = 'LOGIN_USER'
const FETCH_USER = 'FETCH_USER'
const DEL_USER = 'DEL_USER'

// For category
const initialState = {
    users: null
}

export const actionCreators = {
    addUser: (user) => ({ type: ADD_USER, payload: { user } }),
    loginUser: (user) => ({ type: LOGIN_USER, payload: { user } }),
    deleteUser: (id) => ({ type: DEL_USER, payload: { id } }),
    fetchUser: (users) => ({ type: FETCH_USER, payload: { users } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_USER:  // List of
            let { users } = action.payload
            return { ...state, users }

        case ADD_USER:  // Add new
            return {
                ...state,
                isLoading: false,
                isAddSuccess: true,
                users: [ ...state.users, action.payload.user]
            }
        case DEL_USER:   // Delete item
            return { 
                ...state,
                users: state.users.filter((f) => f.id !== action.payload.id)
            }
        case LOGIN_USER:  // Add new
            return {
                ...state,
                isLoading: false,
                isAddSuccess: true,
                users: [ ...state.users, action.payload.user]
            }
        default: // Return default state
            return state
    }
}