import _ from 'lodash'

const ADD_CATEGORY = 'ADD_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const FETCH_CATEGORY = 'FETCH_CATEGORY'
const DEL_CATEGORY = 'DEL_CATEGORY'
const DETAIL_CATEGORY = 'DETAIL_CATEGORY'
const DETAIL_CATEGORY_WITH_EDIT = 'DETAIL_CATEGORY_WITH_EDIT'

const initialState = {
    categoryData: {
        categoryList: [],
        detailData: null
    }
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
            let temp = {
                ...state,
                categoryData: {
                  ...state.categoryData,
                  categoryList         
                }
            }
            return temp
        case ADD_CATEGORY:
            let tep = {
                ...state,
                categoryData: {
                    ...state.categoryData,
                    categoryList: [...state.categoryData.categoryList, action.payload.category]
                }
            }
            return tep
        case UPDATE_CATEGORY:
            let updateCategoryList = _.get(state, 'categoryData.categoryList')
            updateCategoryList && updateCategoryList.forEach((e, i) => {
                if(e.id === action.payload.category.id) {
                    updateCategoryList[i] = action.payload.category
                }
            })
            return {
                ...state,
                categoryData: {
                    ...state.categoryData,
                    categoryList: updateCategoryList
                }
            }
        case DEL_CATEGORY:   // Delete item
            let deleteCategoryList = _.get(state, 'categoryData.categoryList')
            let filterList = deleteCategoryList.filter((f) => f.id !== action.payload.id)
            return {
                ...state,
                categoryData: {
                    ...state.categoryData,
                    categoryList: filterList
                }
            }
        case DETAIL_CATEGORY:            
            return Object.assign({}, state, {
                detailData: _.get(action.payload, 'detailData')
              })
        case DETAIL_CATEGORY_WITH_EDIT:
            return {
                ...state,
                categoryData: {
                    ...state.categoryData,
                    categoryList: _.get(action.payload, 'detailData.categoryList'),
                    detailData: {
                        category: _.get(action.payload, 'detailData.category'),
                        seoData: _.get(action.payload, 'detailData.seo')
                    }         
                }
            }
        default:
            return state
    }
}
