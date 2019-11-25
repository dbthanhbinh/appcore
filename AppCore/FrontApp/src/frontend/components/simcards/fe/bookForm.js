import React, { Fragment } from 'react'
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap'

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
                        <Modal.Title>Đặt mua sim</Modal.Title>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className='group-info'>
                                <p>Sim số: { name }</p>
                                <p>Price: { price }</p>
                                <p>Supplier: { supplier }</p>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type='text' name='name' placeholder='Name...'/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type='text' name='phone' placeholder='Điện thoại..' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type='text' name='email' placeholder='Email...' />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        )
    }
}
export default BookForm