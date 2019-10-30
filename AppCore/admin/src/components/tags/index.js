import React from 'react'
import './tags.scss'

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

class TagsOptions extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tagListFilter: [],
            tagList: TagList,
            tagListSelected: [],
            tagListMixed: TagList
        }
        this.handleCheckBoxTogetherItem = this.handleCheckBoxTogetherItem.bind(this)
        this.filterList = this.filterList.bind(this)
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

    togetherItemToArray(id, isChecked) {
        let { tagList, tagListSelected, tagListMixed } = this.state
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
        let { tagList, tagListSelected, tagListMixed, tagListFilter } = this.state
        tagListMixed = (tagListFilter && tagListFilter.length > 0) ? tagListFilter : tagListMixed
        return(
            <React.Fragment>
                <div className='tags-options'>
                    <div className='tags-input-options'>
                        {
                            tagListSelected && tagListSelected.map((item) => {
                                return <span key={ item.id } className='tag-item'>{ item.name }<i onClick={ ()=>this.handleRemoveItem(item.id) }>X</i></span>
                            })
                        }
                        <input type='text' className='input-small' name='' placeholder='Enter ...' onChange={this.filterList} />
                    </div>
                    <div className='tags-dropdown-options'>
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

export default TagsOptions