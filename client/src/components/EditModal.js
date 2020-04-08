import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input} from 'reactstrap';
import { connect } from 'react-redux';
import { editContact } from '../actions/contactActions';
import editIcon from '../icons/edit.png';

class EditModal extends Component 
{
    // Component state, different from redux/application state
    state = 
    {
        modal: false,
        id: this.props._id,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        address: this.props.address,
        phoneNumber: this.props.phoneNumber,
        email: this.props.email
    }

    toggle = () => 
    {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        // Stops the form from submitting
        e.preventDefault();


        const contact = {
            _id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email
        }

        this.props.editContact(contact);

        // Close modal
        this.toggle();
    }

    render()
    {
        return (
            <div style={{display:"inline"}}>
                <Button
                    color="primary"
                    style={{ margin: '1rem'}} 
                    onClick={this.toggle}
                ><img src={editIcon} alt=" Edit"/></Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Contact</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={this.state.firstName}
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={this.state.lastName}
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={this.state.address}
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Edit Contact</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contact: state.contact,
    auth: state.auth
});

export default connect(mapStateToProps, { editContact })(EditModal);