import _ from 'lodash'
import { StoreDefided } from './Utils'
const TAG_DEFINED = _.get(StoreDefided, 'TAG_DEFINED')

const ADD_TAG = TAG_DEFINED.ADD_TAG
const FETCH_TAGS = TAG_DEFINED.FETCH_TAGS
const UPDATE_TAG = TAG_DEFINED.UPDATE_TAG
const DEL_TAG = TAG_DEFINED.DEL_TAG
const DETAIL_TAG_WITH_EDIT = TAG_DEFINED.DETAIL_TAG_WITH_EDIT
const DETAIL_TAG = TAG_DEFINED.DETAIL_TAG

const initialState = {
    tagData: {
        tagList: null,
        detailData: null
    }
}

export const actionCreators = {
    fetchTag: (tagList) => ({ type: FETCH_TAGS, payload: { tagList } }),
    addTag: (tag) => ({ type: ADD_TAG, payload: { tag } }),
    updateTag: (tag) => ({ type: UPDATE_TAG, payload: { tag } }),
    deleteTag: (id) => ({ type: DEL_TAG, payload: { id } }),
    detailTagWithEdit: (detailData) => ({ type: DETAIL_TAG_WITH_EDIT, payload: { detailData } }),
    detailTag: (detailData) => ({ type: DETAIL_TAG, payload: { detailData } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_TAGS:
            return {
                ...state,
                tagData: {
                    ...state.tagData,
                    tagList: action.payload.tagList         
                }
            }
        case ADD_TAG:
            return {
                ...state,
                tagData: {
                    ...state.tagData,
                    tagList: [...state.tagData.tagList, action.payload.tag]
                }
            }
        case UPDATE_TAG:
                let updateTagList = _.get(state, 'tagData.tagList')
                updateTagList && updateTagList.forEach((e, i) => {
                    if(e.id === action.payload.Tag.id) {
                        updateTagList[i] = action.payload.Tag
                    }
                })
                return {
                    ...state,
                    tagData: {
                        ...state.tagData,
                        TagList: updateTagList
                    }
                }
        case DEL_TAG:   // Delete item
            let deleteTagList = _.get(state, 'tagData.tagList')
            let filterList = deleteTagList.filter((f) => f.id !== action.payload.id)
            return {
                ...state,
                tagData: {
                    ...state.tagData,
                    tagList: filterList
                }
            }
        case DETAIL_TAG:            
            return Object.assign({}, state, {
                detailData: _.get(action.payload, 'detailData')
                })
        case DETAIL_TAG_WITH_EDIT:
            return {
                ...state,
                tagData: {
                    ...state.tagData,
                    tagList: _.get(action.payload, 'detailData.TagList'),
                    detailData: {
                        tag: _.get(action.payload, 'detailData.Tag')
                    }         
                }
            }
        default:
            return state
    }
}
