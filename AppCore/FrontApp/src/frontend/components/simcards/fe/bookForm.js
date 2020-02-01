import React, { Fragment } from 'react'
import { Button, Modal, Form, ModalHeader } from 'semantic-ui-react'

class BookForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isShowModal: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleOpenModal(){
        this.setState({isShowModal: true})
    }

    handleCloseModal(){
        this.setState({isShowModal: false})
    }
    
    render(){
        let { isShowModal } = this.state
        let { name, price, supplier } = this.props
        return(
            <Fragment>
                <span as='a' onClick={this.handleOpenModal}>Đặt mua</span>

                <Modal className='book-form-modal' show={isShowModal}>
                    <Modal.Header>
                        <ModalHeader>Đặt mua sim</ModalHeader>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field className='group-info'>
                                <p>Sim số: { name }</p>
                                <p>Price: { price }</p>
                                <p>Supplier: { supplier }</p>
                            </Form.Field>
                            <Form.Field>
                                <input name='name' placeholder='Name...' />
                            </Form.Field>
                            <Form.Field>
                                <input name='phone' placeholder='Điện thoại..' />
                            </Form.Field>
                            <Form.Field>
                                <input name='email' placeholder='Email...' />
                            </Form.Field>
                        </Form>
                        <Button variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Content>
                </Modal>
            </Fragment>
        )
    }
}
export default BookForm