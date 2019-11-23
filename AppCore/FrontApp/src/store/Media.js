import _ from 'lodash'

const ADD_MEDIA = 'ADD_MEDIA'
const UPDATE_MEDIA = 'UPDATE_MEDIA'
const FETCH_MEDIA = 'FETCH_MEDIA'
const DEL_MEDIA = 'DEL_MEDIA'
const DETAIL_MEDIA = 'DETAIL_MEDIA'

const initialState = {
    mediaData: {
        mediaList: null,
        detailData: null
    }
}

export const actionCreators = {
    fetchMedia: (mediaList) => ({ type: FETCH_MEDIA, payload: { mediaList } }),
    addMedia: (media) => ({ type: ADD_MEDIA, payload: { media } }),
    updateMedia: (media) => ({ type: UPDATE_MEDIA, payload: { media } }),
    deleteMedia: (id) => ({ type: DEL_MEDIA, payload: { id } }),
    detailMedia: (detailData) => ({ type: DETAIL_MEDIA, payload: { detailData } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_MEDIA:
            let { mediaList } = action.payload
            state.mediaData.mediaList = mediaList
            return Object.assign({}, state)
        case ADD_MEDIA:
            return {
                ...state,
                mediaList: [ ...state.mediaData.mediaList, action.payload.media]
            }
        case UPDATE_MEDIA:
            let myState = Object.assign({}, state)
            myState.mediaList.forEach((e, i) => {
                if(e.id === action.payload.media.id) {
                    myState.mediaList[i] = action.payload.media
                }
            })
            return myState
        case DEL_MEDIA:   // Delete item
            return { 
                ...state,
                mediaList: state.mediaList.filter((f) => f.id !== action.payload.id)
            }
        case DETAIL_MEDIA:            
            return Object.assign({}, state, {
                detailData: _.get(action.payload, 'detailData')
              })
        default:
            return state
    }
}
