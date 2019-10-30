import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import { Form, Button, Modal } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actionCreators } from '../../store/Category'
import { addProducts, getProducts, addCategory } from '../../store/ItemActions'
import { getInputData, setFieldValue } from '../form/FormUtils'
import Model from '../models/cat.model'
import Utils from '../commons/utils'

class customDropdown extends Component {
    constructor(props){
        super(props)
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
        getProducts(payload, (result)=> {
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
                this.setState(()=>({ isLoading: false }), ()=>{
                    addCategory(payload, (result)=> {
                        this.props.addCategory(Utils.getResApi(result))
                        this.handleCloseModal()  // Close modal
                    })
                    // eventEmitter.emit('handle-submit-form-data', { isLoading: false })
                })
            }
        }
    }

    render(){
        let { isShowModal } = this.state
        let { categoryLists, placeholder, name } = this.props
        return(
            <Fragment>
                <Form.Control name={ name } as='select' onChange={this.handleOnDropdownChange} defaultValue='1' >
                    <option key='-1' value='-1'>Select category</option>
                    { categoryLists && categoryLists.map((item) => {
                        return <option key={ item.id } value={ item.id }>{ item.name }</option>
                    }) }
                </Form.Control>
                <span as='a' onClick={this.handleOpenModal}>Add Cat</span>

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
    let { categoryLists } = state.categoryLists
    return { categoryLists }
}

const CustomDropdown = customDropdown
export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CustomDropdown)