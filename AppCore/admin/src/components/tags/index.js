import React from 'react'
import './tags.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Tag'
// import { getItemList, addItemBase } from '../../store/TagActions'

const TagList = [
    {id: 1, name: 'tag 1'},
    {id: 2, name: 'tsag 2'},
    {id: 3, name: 'tdag 3'},
    {id: 4, name: 'tfag 4'},
    {id: 5, name: 'tgag 5'},
    {id: 6, name: 'tcag 6'},
    {id: 7, name: 'tgag 7'},
    {id: 8, name: 'thgag 8'},
    {id: 9, name: 'tfasag 9'},
    {id: 10, name: 'trưag 10'},
    {id: 11, name: 'tadsag 11'},
    {id: 12, name: 'tkkkag 12'},
]

class tagsOptions extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            defaultValue: '',
            isOpenFilter: false,
            tagListFilter: [],
            tagList: TagList,
            tagListSelected: [],
            tagListMixed: TagList
        }
        this.handleCheckBoxTogetherItem = this.handleCheckBoxTogetherItem.bind(this)
        this.filterList = this.filterList.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.onFocusHandle = this.onFocusHandle.bind(this)
        this.onBlurHandle = this.onBlurHandle.bind(this)
    }

    handleKeyDown(e){
        if (e.key === 'Enter') {
            if(e && e.target && e.target.value){
                let { tagListSelected } = this.state
                let val = e.target.value
                tagListSelected = this.addItemToArray(tagListSelected, val)
                this.setState(prevState => ({ tagListSelected, defaultValue: '' }))
            }
        }
    }

    onFocusHandle(e){
        this.setState(prevState => ({ isOpenFilter: true }))
    }

    onBlurHandle(e){
        this.setState(prevState => ({ isOpenFilter: false }))
    }

    handleRemoveItem(id) {
        let { tagListSelected } = this.state
        if(id) {
            id = Number(id)
            tagListSelected = this.removeItemFromArray(tagListSelected, id)
            this.setState(prevState => ({ tagListSelected }))
        }
    }

    handleCheckBoxTogetherItem(e) {
        if(e && e.target && e.target.type === 'checkbox'){
            let item = e.target.value || null
            let isChecked = e.target.checked
            item && this.togetherItemToArray(Number(item), isChecked)
        }
    }

    removeItemFromArray(arrayList, id) {
        let idx2 = arrayList.findIndex(it => it.id === id)
        arrayList.splice(idx2,1)
        return arrayList
    }

    addItemToArray(arrayList, name) {
        let idx = arrayList.find((it) => { return it.name === name })
        if(!idx && name) arrayList.push({id: name, name})
        return arrayList
    }

    togetherItemToArray(id, isChecked) {
        let { tagList, tagListSelected } = this.state
        if(!id) return tagListSelected
        let item = tagList.find((it) => { return it.id === id })
        if(isChecked) {
            let idx = tagListSelected.find((it) => { return it.id === id })
            if(!idx && item) tagListSelected.push(item)
        } else {
            tagListSelected = this.removeItemFromArray(tagListSelected, id)
        }
        this.setState(prevState => ({ tagListSelected }))
    }

    filterList(e){
        if(e && e.target && e.target.value){
            let { tagListMixed } = this.state
            let str = e.target.value
            tagListMixed = tagListMixed.filter(function(item){
            return item.name.toLowerCase().search(
                str.toLowerCase()) !== -1;
            });
            this.setState(prevState => ({ tagListFilter: tagListMixed }))
        }
    }

    render(){
        let { isOpenFilter, tagListSelected, tagListMixed, tagListFilter, defaultValue } = this.state
        tagListMixed = (tagListFilter && tagListFilter.length > 0) ? tagListFilter : tagListMixed
        console.log('====', defaultValue)
        let tagsDropdownOpen = isOpenFilter ? 'tags-dropdown-options open' : 'tags-dropdown-options'
        return(
            <React.Fragment>
                <div className='tags-options'>
                    <div className='tags-input-options'>
                        {
                            tagListSelected && tagListSelected.map((item) => {
                                return <span key={ item.id } className='tag-item'>{ item.name }<i onClick={ ()=>this.handleRemoveItem(item.id) }>X</i></span>
                            })
                        }
                        <input type='text'
                            className='input-small'
                            name='tagName'
                            placeholder='Enter ...'
                            onChange={this.filterList}
                            onFocus={this.onFocusHandle}
                            onBlur={this.onBlurHandle}
                            onKeyDown={this.handleKeyDown}
                        />
                    </div>
                    <div className={ tagsDropdownOpen }>
                        <div>
                            { tagListMixed && tagListMixed.map((item) => {
                                return <div key={ item.id }>
                                        <input type='checkbox'
                                            name='checkBoxList[]'
                                            value={ item.id }
                                            onClick={ this.handleCheckBoxTogetherItem }
                                        />
                                        { item.name }
                                    </div>
                            }) }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const TagsOptions = tagsOptions
function mapStateToProps(state){
    let { tagList } = state.tagList
    return { tagList }
}
export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(TagsOptions)