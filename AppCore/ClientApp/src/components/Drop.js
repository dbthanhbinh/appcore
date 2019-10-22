import React from 'react'
class ItemList extends React.Component {
    render(){
        let { itemList, handleRemoveItem } = this.props
        return(
            <React.Fragment>
                { 
                    itemList && itemList.length > 0 && itemList.map((item) => {
                        return <span className='tags-name' key={item.id}>
                        { item.name } <i onClick={() => handleRemoveItem(item.id)}>x</i></span>
                    })
                }
            </React.Fragment>
        )
    }
}

class CheckBoxList extends React.Component {
    render(){
        let { itemList, handleChecked } = this.props
        return(
            <React.Fragment>
                { 
                    itemList && itemList.length > 0 && itemList.map((item) => {
                        return <li key={item.id}>
                        <input type='checkbox' value={ item.id } checked={!!item.isSelected} onChange={ handleChecked } />
                        { item.name } </li>
                    })
                }
            </React.Fragment>
        )
    }
}


class Drop extends React.Component {
    constructor(props){
        super(props)
        // this.wrapperRef = React.createRef()
        this.wrapperRef = null
        this.isDropOpen = false
        let { itemList, selectedItems } = this.synchronizeDrop(this.props.options || null, [])
        this.state = {
            itemList: itemList,
            selectedItems: selectedItems,
            isOpen: false
        }
        this.handleChecked = this.handleChecked.bind(this)
        this.handleRemoveItem = this.handleRemoveItem.bind(this)
        this.handleFocusInput = this.handleFocusInput.bind(this)
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick)
    }
    
    componentWillUnmount() {
    // important
    document.removeEventListener('click', this.handleClick)
    }
    
    handleClick = (event) => {
        const { target } = event
        if ( this.isDropOpen && target && this.wrapperRef && !this.wrapperRef.contains(target)) {
            this.isDropOpen = false
            this.setState((prevState, props) => {
                return {
                    isOpen: false
                }
            })
        }
    }

    addToList(itemList, item){
        if (itemList && typeof itemList === 'object') {
            let idx = itemList.find((f) => {
                return f.id === item.id
            })
            if(!idx) {
                itemList.push(item)
            }
        }
        return itemList
    }

    removeFromList(itemList, id){
        let newItemList = itemList
        if (itemList && typeof itemList === 'object' && itemList.length > 0) {
            newItemList = itemList.filter((f) => f.id !== id)
        }
        return newItemList
    }

    synchronizeDrop(itemList, selectedItems){
        itemList && itemList.map((item) => {
            let idx = selectedItems.find((f) => f.id === item.id)
            return item.isSelected = idx ? true : false
        })
        return { itemList, selectedItems }
    }

    handleChecked(e){
        let { itemList, selectedItems } = this.state
        let eventId = (e && e.target && e.target.type === 'checkbox') ? parseInt(e.target.value, 10) : e.target.value
        if(eventId) {
            let checkedData = itemList && itemList.find(f => { return f.id === eventId })
            if (checkedData) {
                selectedItems = e.target.checked  ? this.addToList(selectedItems, checkedData) : this.removeFromList(selectedItems, checkedData)
                this.setState((prevState, props) => { return this.synchronizeDrop(itemList, selectedItems)})
            }
        }
    }

    handleRemoveItem(id){
        let { itemList, selectedItems } = this.state
        selectedItems = this.removeFromList(selectedItems, id)
        this.setState((prevState, props) => { return this.synchronizeDrop(itemList, selectedItems)})
    }

    handleFocusInput() {
        this.isDropOpen = true
        this.setState((prevState, props) => {
            return {
                isOpen: true
            }
        })
    }

    render() {
        let { itemList, selectedItems, isOpen } = this.state
        console.log(itemList);
        return(
            <React.Fragment>
                <div className='custom-dropdownlist' ref = { ref => { this.wrapperRef = ref }}>
                    <div className='input-items'>
                        <input type='text' onClick={ this.handleFocusInput }/>
                        <ItemList
                            handleRemoveItem = { this.handleRemoveItem }
                            itemList = { selectedItems }
                        />
                    </div>
                    <div className={ isOpen ? 'list-items open' : 'list-items'}>
                        <CheckBoxList
                            handleChecked = {this.handleChecked}
                            itemList = {itemList}
                        />
                    </div>
                </div>
                <div> fasdf </div>
            </React.Fragment>
        )
    }
}

export default Drop