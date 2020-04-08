import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Alert} from 'reactstrap';
import { connect } from 'react-redux';
import { searchContacts, getContacts } from '../actions/contactActions';

class SearchModal extends Component 
{
    // Component state, different from redux/application state
    state = 
    {
        modal: false,
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        email: '',
        isSearching: false,
        searchTargets: {}
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

        // Add contact via addContact action
        this.setState(prevState => ({
            isSearching: true,
            searchTargets: [
                {id: "First Name", val: prevState.firstName},
                {id: "Last Name", val: prevState.lastName},
                {id: "Address", val: prevState.address},
                {id: "Phone Number", val: prevState.phoneNumber},
                {id: "Email", val: prevState.email}
            ]
        }), () => {
            this.props.searchContacts(this.props.auth.user._id, this.state.firstName, this.state.lastName, this.state.address, this.state.phoneNumber, this.state.email)
            this.setState({
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                email: ''
            })
        })
       
        // Close modal
        this.toggle();
    }

    resetSearch = () => {
        this.setState({
            isSearching: false
        }, () => {
            this.props.getContacts(this.props.auth.user._id)
        })
    }

    mapSearchTargets = () => {
        let { searchTargets } = this.state
        return searchTargets.map(target => {
            return target.val ? " " + target.id + ": " + target.val : null           
        }).filter(Boolean)
    }

    render()
    {
        return (
            <div>
                <Button
                    color="light"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Search</Button>
                { this.state.isSearching ? (
                <div style={{flexDirection: 'row'}}>
                    <Button color="light" style={{ marginBottom: '2rem' }} onClick={this.resetSearch}>Reset</Button>
                    <Alert color="success">{"Searching for... " +  this.mapSearchTargets() }</Alert>
                </div>
                ) : null} 
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Search Contacts</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="First Name"
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Last Name"
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="address"
                                    id="address"
                                    placeholder="Address"
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.onChange}/>
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Search</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { searchContacts, getContacts })(SearchModal);