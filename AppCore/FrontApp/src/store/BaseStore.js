import _ from 'lodash'
import { StoreDefided } from './Utils'
const SETTING_DEFINED = _.get(StoreDefided, 'SETTING_DEFINED')

const ADD_SETTING = SETTING_DEFINED.ADD_SETTING
const FETCH_SETTINGS = SETTING_DEFINED.FETCH_SETTINGS
const UPDATE_SETTING = SETTING_DEFINED.UPDATE_SETTING
const DETAIL_SETTING = SETTING_DEFINED.DETAIL_SETTING

const initialState = {
    baseSettingData: {
        settingList: [],
        detailData: null
    }
}

export const actionCreators = {
    fetchBaseSetting: (settingList) => ({ type: FETCH_SETTINGS, payload: { settingList } }),
    addBaseSetting: (setting) => ({ type: ADD_SETTING, payload: { setting } }),
    updateBaseSetting: (setting) => ({ type: UPDATE_SETTING, payload: { setting } }),
    detailBaseSetting: (detailData) => ({ type: DETAIL_SETTING, payload: { detailData } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_SETTINGS:
            return {
                ...state,
                baseSettingData: {
                    ...state.baseSettingData,
                    settingList: action.payload.settingList         
                }
            }
        case ADD_SETTING:
            return {
                ...state,
                baseSettingData: {
                    ...state.baseSettingData,
                    settingList: [...state.baseSettingData.settingList, action.payload.setting]
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
                    baseSettingData: {
                        ...state.baseSettingData,
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
