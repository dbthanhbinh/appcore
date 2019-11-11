import _ from 'lodash'

const ADD_CATEGORY = 'ADD_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const FETCH_CATEGORY = 'FETCH_CATEGORY'
const DEL_CATEGORY = 'DEL_CATEGORY'
const DETAIL_CATEGORY = 'DETAIL_CATEGORY'
const DETAIL_CATEGORY_WITH_EDIT = 'DETAIL_CATEGORY_WITH_EDIT'

const initialState = {
    categoryList: null,
    detailData: null
}

export const actionCreators = {
    fetchCategory: (categoryList) => ({ type: FETCH_CATEGORY, payload: { categoryList } }),
    addCategory: (category) => ({ type: ADD_CATEGORY, payload: { category } }),
    updateCategory: (category) => ({ type: UPDATE_CATEGORY, payload: { category } }),
    deleteCategory: (id) => ({ type: DEL_CATEGORY, payload: { id } }),
    detailCategoryWithEdit: (detailData) => ({ type: DETAIL_CATEGORY_WITH_EDIT, payload: { detailData } }),
    detailCategory: (detailData) => ({ type: DETAIL_CATEGORY, payload: { detailData } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_CATEGORY:
            let { categoryList } = action.payload
            return Object.assign({}, state, {
                categoryList
              })
        case ADD_CATEGORY:
            return {
                ...state,
                categoryList: [ ...state.categoryList, action.payload.category]
            }
        case UPDATE_CATEGORY:
            let myState = Object.assign({}, state)
            myState.categoryList.forEach((e, i) => {
                if(e.id === action.payload.category.id) {
                    myState.categoryList[i] = action.payload.category
                }
            })
            return myState
        case DEL_CATEGORY:   // Delete item
            return { 
                ...state,
                categoryList: state.categoryList.filter((f) => f.id !== action.payload.id)
            }
        case DETAIL_CATEGORY:            
            return Object.assign({}, state, {
                detailData: _.get(action.payload, 'detailData')
              })
        case DETAIL_CATEGORY_WITH_EDIT:
                let category = _.get(action.payload, 'detailData.category')
            return Object.assign({}, state, {
                categoryList: _.get(action.payload, 'detailData.categoryList'),
                detailData: {
                    category: category,
                    seoData: _.get(action.payload, 'detailData.seo')
                }
            })
        default:
            return state
    }
}
