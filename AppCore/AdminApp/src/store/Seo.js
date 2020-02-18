import _ from 'lodash'
import { StoreDefided } from './Utils'
const SEO_DEFINED = _.get(StoreDefided, 'SEO_DEFINED')

const ADD_SEO = SEO_DEFINED.ADD_ITEM
const FETCH_SEOS = SEO_DEFINED.FETCH_ITEMS
const UPDATE_SEO = SEO_DEFINED.UPDATE_ITEM
const DETAIL_SEO = SEO_DEFINED.DETAIL_SEO

const initialState = {
    seoData: {
        seoList: [],
        detailData: null
    }
}

export const actionCreators = {
    fetchSeo: (seoList) => ({ type: FETCH_SEOS, payload: { seoList } }),
    addSeo: (seo) => ({ type: ADD_SEO, payload: { seo } }),
    updateSeo: (seo) => ({ type: UPDATE_SEO, payload: { seo } }),
    detailSeo: (detailData) => ({ type: DETAIL_SEO, payload: { detailData } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_SEOS:
            return {
                ...state,
                seoData: {
                    ...state.seoData,
                    seoList: action.payload.seoList         
                }
            }
        case ADD_SEO:
            return {
                ...state,
                seoData: {
                    ...state.seoData,
                    seoList: [...state.seoData.seoList, action.payload.seo]
                }
            }
        case UPDATE_SEO:
                let updateSeoList = _.get(state, 'seoData.seoList')
                updateSeoList && updateSeoList.forEach((e, i) => {
                    if(e.id === action.payload.seo.id) {
                        updateSeoList[i] = action.payload.seo
                    }
                })
                return {
                    ...state,
                    seoData: {
                        ...state.seoData,
                        seoList: updateSeoList
                    }
                }
        case DETAIL_SEO:            
            return Object.assign({}, state, {
                detailData: _.get(action.payload, 'detailData')
                })
        default:
            return state
    }
}
