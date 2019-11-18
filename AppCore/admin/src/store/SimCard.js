import _ from 'lodash'

const FETCH_SIMCARD = 'FETCH_SIMCARD'

const initialState = {
    simCardData: {
        simCardList: null,
        detailData: null
    }
}

export const actionCreators = {
    fetchSimCard: (simCardList) => ({ type: FETCH_SIMCARD, payload: { simCardList } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_SIMCARD:
            let { mediaList } = action.payload
            state.mediaData.mediaList = mediaList
            return Object.assign({}, state)
        default:
            return state
    }
}
