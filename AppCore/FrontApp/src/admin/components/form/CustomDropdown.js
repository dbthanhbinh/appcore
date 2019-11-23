import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { Form, Button, Modal } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../../store/Category'
// import { getItemList, addCategory } from '../../store/CategoryActions'
import CategoryActions from '../../../store/CategoryActions'
import { getInputData, setFieldValue } from '../../../utils/FormUtils'
import Model from '../models/cat.model'
import Utils from '../../../apis/utils'

class customDropdown extends Component {
    constructor(props){
        super(props)
        this.CategoryActions = new CategoryActions()
        this.state = {
            isShowModal: false,
            model: Model.model()
        }
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleOnInputChange = this.handleOnInputChange.bind(this)
        this.handleOnDropdownChange = this.handleOnDropdownChange.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this)
    }

    componentDidMount(){
        let payload = {
            url: 'Category/getAllCategory',
            body: {}
        }
        this.CategoryActions.getListItems(payload, (err, result)=> {
            if(err) return
            let resultData = Utils.getResApi(result)
            resultData = Utils.sortList(resultData, 'desc')  // To sort list
            this.props.fetchCategory(resultData)
        })
    }

    handleOpenModal(){
        this.setState({isShowModal: true})
    }

    handleCloseModal(){
        this.setState({isShowModal: false})
    }

    handleOnDropdownChange = (e, data) => {
        this.props.onInputChange(e, data)
    }

    handleOnInputChange = (e, data) => {
        let { name, value } = getInputData(e, data)
        this.setState((prevState)=>{
            return { model: setFieldValue(name, value, prevState) }
        })
    }

    handleSubmitForm(e, data){
        let { model } = this.state
        let {isFormValid} = this.props
        isFormValid = true
        let payload = {}
        if(isFormValid){
            payload = {
                url: 'Category/createCategory',
                body: { Name: model.name.value }
            }
            // eventEmitter.emit('handle-submit-form-data', { isLoading: true })
            if(!_.isNil(payload) && !_.isEmpty(payload)){
                this.setState(()=>({ isShowModal: false }), () => {
                    this.CategoryActions.addItem(payload, (err, result)=> {
                        if(err) return
                        if(result) this.props.addCategory(Utils.getResApi(result))
                    })
                    // eventEmitter.emit('handle-submit-form-data', { isLoading: false })
                })
            }
        }
    }

    render(){
        let { isShowModal } = this.state
        let { categoryData, placeholder, name } = this.props
        return(
            <Fragment>
                <h5>Select Category</h5>
                <Form.Control name={ name } as='select' onChange={this.handleOnDropdownChange} defaultValue='1' >
                    <option key='-1' value='-1'>Select category</option>
                    { categoryData && categoryData.categoryList && categoryData.categoryList.map((item) => {
                        return <option key={ item.id } value={ item.id }>{ item.name }</option>
                    }) }
                </Form.Control>
                {/* <span as='a' onClick={this.handleOpenModal}>Add Cat</span> */}

                <Modal show={isShowModal}>
                    <Modal.Header>
                        <Modal.Title>Add Cat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control type='text' name='name' placeholder={ placeholder } onChange={this.handleOnInputChange}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmitForm}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    let { categoryData } = state.categoryData
    return { categoryData }
}

const CustomDropdown = customDropdown
export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CustomDropdown)