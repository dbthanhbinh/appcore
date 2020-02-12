import _ from 'lodash'
import { StoreDefided } from './Utils'
const POST_DEFINED = _.get(StoreDefided, 'POST_DEFINED')
const ADD_POST = POST_DEFINED.ADD_POST
const FETCH_POSTS = POST_DEFINED.FETCH_POSTS
const DEL_POST = POST_DEFINED.DEL_POST
const DETAIL_POST_WITH_EDIT = POST_DEFINED.DETAIL_POST_WITH_EDIT

const initialState = {
    postData: {
        postList: [],
        detailData: null
    }
}

export const actionCreators = {
    addPost: (postData) => ({ type: ADD_POST, payload: { postData } }),
    deletePost: (id) => ({ type: DEL_POST, payload: { id } }),
    fetchPosts: (postList) => ({ type: FETCH_POSTS, payload: { postList } }),
    detailPostWithEdit: (detailData) => ({ type: DETAIL_POST_WITH_EDIT, payload: { detailData } }),
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_POSTS:  // List of items
            let { postList } = action.payload
            return {
                ...state,
                postData: {
                  ...state.postData,
                  postList         
                }
            }
        case ADD_POST:
            return {
                ...state,
                postData: {
                    ...state.postData,
                    postList: [...state.postData.postList, action.payload.postData],
                    detailData: null
                }
            }
        case DEL_POST:   // Delete item
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