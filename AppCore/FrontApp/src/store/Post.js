import _ from 'lodash'
import { StoreDefided } from './Utils'
const POST_DEFINED = _.get(StoreDefided, 'POST_DEFINED')
const ADD_ITEM = POST_DEFINED.ADD_ITEM
const FETCH_ITEMS = POST_DEFINED.FETCH_ITEMS
const DEL_ITEM = POST_DEFINED.DEL_ITEM
const DETAIL_POST_WITH_EDIT = POST_DEFINED.DETAIL_POST_WITH_EDIT

const initialState = {
    postData: {
        postList: null,
        detailData: null
    }
}

export const actionCreators = {
    addItem: (post) => ({ type: ADD_ITEM, payload: { post } }),
    deleteItem: (id) => ({ type: DEL_ITEM, payload: { id } }),
    fetchItem: (postList) => ({ type: FETCH_ITEMS, payload: { postList } }),
    detailPostWithEdit: (detailData) => ({ type: DETAIL_POST_WITH_EDIT, payload: { detailData } }),
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_ITEMS:  // List of items
            let { postList } = action.payload
            return {
                ...state,
                postData: {
                  ...state.postData,
                  postList         
                }
            }
        case ADD_ITEM:
            let tep = {
                ...state,
                postData: {
                    ...state.postData,
                    postList: [...state.postData.postList, action.payload.post]
                }
            }
            return tep
        case DEL_ITEM:   // Delete item
            let deletePostList = _.get(state, 'postData.postList')
            let filterList = deletePostList.filter((f) => f.id !== action.payload.id)
            return {
                ...state,
                postData: {
                    ...state.postData,
                    postList: filterList
                }
            }
        case DETAIL_POST_WITH_EDIT:
            return {
                ...state,
                postData: {
                    ...state.postData,
                    postList: _.get(action.payload, 'detailData.postList'),
                    detailData: {
                        post: _.get(action.payload, 'detailData.post'),
                        seoData: _.get(action.payload, 'detailData.seo')
                    }         
                }
            }
        default: // Return default state
            return state
    }
}