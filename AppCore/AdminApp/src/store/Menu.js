import _ from 'lodash'

const ADD_MENU = 'ADD_MENU'
const UPDATE_MENU = 'UPDATE_MENU'
const FETCH_MENU = 'FETCH_MENU'
const DEL_MENU = 'DEL_MENU'
const DETAIL_MENU = 'DETAIL_MENU'
const DETAIL_MENU_WITH_EDIT = 'DETAIL_MENU_WITH_EDIT'

const initialState = {
    menuData: {
        menuList: [],
        detailData: null
    }
}

export const actionCreators = {
    fetchMenu: (menuList) => ({ type: FETCH_MENU, payload: { menuList } }),
    addMenu: (menu) => ({ type: ADD_MENU, payload: { menu } }),
    updateMenu: (menu) => ({ type: UPDATE_MENU, payload: { menu } }),
    deleteMenu: (id) => ({ type: DEL_MENU, payload: { id } }),
    detailMenuWithEdit: (detailData) => ({ type: DETAIL_MENU_WITH_EDIT, payload: { detailData } }),
    detailMenu: (detailData) => ({ type: DETAIL_MENU, payload: { detailData } })
}

export const reducer = (state, action) => {
    state = state || initialState
    switch(action.type){
        case FETCH_MENU:
            let { menuList } = action.payload
            let temp = {
                ...state,
                menuData: {
                  ...state.menuData,
                  menuList         
                }
            }
            return temp
        case ADD_MENU:
            let tep = {
                ...state,
                menuData: {
                    ...state.menuData,
                    menuList: [...state.menuData.menuList, action.payload.menu]
                }
            }
            return tep
        case UPDATE_MENU:
            let updateMenuList = _.get(state, 'menuData.menuList')
            updateMenuList && updateMenuList.forEach((e, i) => {
                if(e.id === action.payload.menu.id) {
                    updateMenuList[i] = action.payload.menu
                }
            })
            return {
                ...state,
                menuData: {
                    ...state.menuData,
                    menuList: updateMenuList
                }
            }
        case DEL_MENU:   // Delete item
            let deleteMenuList = _.get(state, 'menuData.menuList')
            let filterList = deleteMenuList.filter((f) => f.id !== action.payload.id)
            return {
                ...state,
                menuData: {
                    ...state.menuData,
                    menuList: filterList
                }
            }
        case DETAIL_MENU:            
            return Object.assign({}, state, {
                detailData: _.get(action.payload, 'detailData')
              })
        case DETAIL_MENU_WITH_EDIT:
            return {
                ...state,
                menuData: {
                    ...state.menuData,
                    menuList: _.get(action.payload, 'detailData.menuList'),
                    detailData: {
                        menu: _.get(action.payload, 'detailData.menu'),
                        seoData: _.get(action.payload, 'detailData.seo')
                    }         
                }
            }
        default:
            return state
    }
}
