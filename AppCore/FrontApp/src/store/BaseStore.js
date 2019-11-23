import _ from 'lodash'

const FETCH_LISTITEM = 'FETCH_LISTITEM'
const DETAIL_ITEM = 'DETAIL_ITEM'

const initialState = {
    simCardList: null,
    detailData: null
}

export const actionCreators = {
    fetchListItem: (listItem) => ({ type: FETCH_LISTITEM, payload: { listItem } }),
    detailItem: (item) => ({ type: DETAIL_ITEM, payload: { item } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_LISTITEM:
            let { categoryList } = action.payload
            return Object.assign({}, state, {
                categoryList
              })
        case DETAIL_ITEM:            
            return Object.assign({}, state, {
                detailData: _.get(action.payload, 'detailData')
              })
        default:
            return state
    }
}
