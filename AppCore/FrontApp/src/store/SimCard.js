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
            let temp = {
                ...state,
                simCardData: {
                  ...state.simCardData,
                  simCardList         
                }
            }
            return temp;
        default:
            return state
    }
}
