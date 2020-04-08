import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors} from '../../actions/errorActions';

class RegisterModal extends Component {
    // Component state, different from redux/application state
    state =
        {
            modal: false,
            userName: '',
            password: '',
            msg: null
        }
    
    staticPropTypes = 
    {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) 
    {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) 
            if (error.id === 'REGISTER_FAIL')
                this.setState({msg: error.msg.msg});
            else
                this.setState({ msg: null});

        // Closes the modal if the registration is successful
        if (this.state.modal)
            if (isAuthenticated)
            this.toggle();
    }

    toggle = () => {
        this.props.clearErrors();

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

        const { userName, password } = this.state;

        const newUser = {
            userName,
            password
        }

        // Add contact via addContact action
        this.props.register(newUser);

    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    {/* {this.props.isAuthenticated ? null : 'Register'} */}
                    Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New User</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null} 
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    placeholder="Username"
                                    onChange={this.onChange} />
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange} />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);