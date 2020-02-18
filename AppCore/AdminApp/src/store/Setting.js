import _ from 'lodash'
import { StoreDefided } from './Utils'
const SETTING_DEFINED = _.get(StoreDefided, 'SEO_DEFINED')

const ADD_SETTING = SETTING_DEFINED.ADD_ITEM
const FETCH_SETTINGS = SETTING_DEFINED.FETCH_ITEMS
const UPDATE_SETTING = SETTING_DEFINED.UPDATE_ITEM
const DETAIL_SETTING = SETTING_DEFINED.DETAIL_SETTING

const initialState = {
    settingDataConfig: {
        settingList: [],
        detailData: null
    }
}

export const actionCreators = {
    fetchSetting: (settingList) => ({ type: FETCH_SETTINGS, payload: { settingList } }),
    addSetting: (setting) => ({ type: ADD_SETTING, payload: { setting } }),
    updateSetting: (setting) => ({ type: UPDATE_SETTING, payload: { setting } }),
    detailSetting: (detailData) => ({ type: DETAIL_SETTING, payload: { detailData } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_SETTINGS:
            return {
                ...state,
                settingDataConfig: {
                    ...state.settingDataConfig,
                    settingList: action.payload.settingList
                }
            }
        case ADD_SETTING:
            return {
                ...state,
                settingDataConfig: {
                    ...state.settingDataConfig,
                    settingList: [...state.settingDataConfig.settingList, action.payload.setting]
                }
            }
        case UPDATE_SETTING:
                let updateList = _.get(state, 'settingData.settingList')
                updateList && updateList.forEach((e, i) => {
                    if(e.id === action.payload.setting.id) {
                        updateList[i] = action.payload.setting
                    }
                })
                return {
                    ...state,
                    settingDataConfig: {
                        ...state.settingDataConfig,
                        settingList: updateList
                    }
                }
        case DETAIL_SETTING:            
            return Object.assign({}, state, {
                detailData: _.get(action.payload, 'detailData')
                })
        default:
            return state
    }
}
