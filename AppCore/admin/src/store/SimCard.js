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
            let { simCardList } = action.payload
            return {
                ...state,
                simCardData: {
                  ...state.simCardData,
                  simCardList: {
                    ...state.simCardData.simCardList
                  }                  
                }
            }
        default:
            return state
    }
}
