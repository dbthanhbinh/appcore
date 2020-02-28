import React from 'react'
import {
    BuildLabelField,
    BuildButtonField
} from '../components/form/BuildFormField'

const DetailMediaModal = (props) => {
    let { imageDetail, onHandleUpdateMedia, modalName } = props

    return <div className="modal fade" id={modalName}>
        <div className="modal-dialog">
            <div className="modal-content">
                <form>
                    <BuildLabelField
                        placeholder='Name'
                        value={imageDetail.name}
                    />
                    <BuildLabelField
                        placeholder='Alias'
                        value={imageDetail.name}
                    />
                    <BuildLabelField
                        placeholder='Public url'
                        value={imageDetail.name}
                    />
                    <BuildLabelField
                        placeholder='Sub Name'
                        value={imageDetail.name}
                    />
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <BuildButtonField
                            label={`Update`}
                            className='btn-success float-right'
                            onClick={onHandleUpdateMedia}
                        />
                </form>
            </div>
        </div>
    </div>

    // return( 
    //     imageDetail ? <Modal
    //         open={isOpenModal}
    //         >
    //         <ModalHeader>
    //             <h4>View image</h4>
    //         </ModalHeader>
    //         <ModalContent>
    //             <Container>
    //                 <Grid>
    //                     <Grid.Row columns={1} className="show-grid">
    //                         <Grid.Column width={10}>
    //                             <Form>
    //                                 <Form.Field>
    //                                     <label>Name: {imageDetail.name}</label>
    //                                 </Form.Field>
    //                                 <Form.Field>
    //                                     <label>Alias: {imageDetail.name}</label>
    //                                 </Form.Field>
    //                                 <Form.Field>
    //                                     <label>Public url: {imageDetail.name}</label>
    //                                 </Form.Field>
    //                                 <Form.Field>
    //                                     <label>Sub Name</label>
    //                                     <input type='text' name='subName' />
    //                                 </Form.Field>
    //                                 <Form.Field>
    //                                     <Button variant="secondary" onClick={onHandleUpdateMedia}> Update</Button>
    //                                     <Button variant="secondary" onClick={onHandleCloseModal}> Close</Button>
    //                                 </Form.Field>
    //                             </Form>
                                
    //                         </Grid.Column>
    //                     </Grid.Row>
    //                 </Grid>
    //             </Container>
    //         </ModalContent>
    //     </Modal> : null
    // )
}

export default DetailMediaModal