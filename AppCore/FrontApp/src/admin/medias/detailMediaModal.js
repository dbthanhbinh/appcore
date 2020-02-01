import React from 'react'
import { Form, Button, Modal, Container,  Grid, ModalHeader, ModalContent } from 'semantic-ui-react'

const DetailMediaModal = (props) => {
    let { imageDetail, isOpenModal, onHandleCloseModal, onHandleUpdateMedia } = props
    return( 
        imageDetail ? <Modal
            open={isOpenModal}
            >
            <ModalHeader>
                <h4>View image</h4>
            </ModalHeader>
            <ModalContent>
                <Container>
                    <Grid>
                        <Grid.Row columns={1} className="show-grid">
                            <Grid.Column width={10}>
                                <Form>
                                    <Form.Field>
                                        <label>Name: {imageDetail.name}</label>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Alias: {imageDetail.name}</label>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Public url: {imageDetail.name}</label>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Sub Name</label>
                                        <input type='text' name='subName' />
                                    </Form.Field>
                                    <Form.Field>
                                        <Button variant="secondary" onClick={onHandleUpdateMedia}> Update</Button>
                                        <Button variant="secondary" onClick={onHandleCloseModal}> Close</Button>
                                    </Form.Field>
                                </Form>
                                
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </ModalContent>
        </Modal> : null
    )
}

export default DetailMediaModal