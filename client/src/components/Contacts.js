import React, { Component } from 'react';
import 
{ 
    Table,
    Button
} from 'reactstrap';
import 
{ 
    CSSTransition, 
    TransitionGroup 
} from 'react-transition-group';
import 
{ 
    getContacts, 
    deleteContact,
    clearContact
} from '../actions/contactActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditModal from './EditModal';
import deleteIcon from '../icons/delete.png';

class Contacts extends Component
{

    static propTypes =
    {
        auth: PropTypes.object.isRequired
    }

    componentDidMount()
    {   
        if (this.props.auth.isAuthenticated)
            this.props.getContacts(this.props.auth.user._id);
    }

    onDeleteClick = (id) => {
        this.props.deleteContact(id);
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.auth.isAuthenticated && !prevProps.auth.isAuthenticated)
            this.props.getContacts(this.props.auth.user._id);

    }

    render() {

        const { contacts } = this.props.contact;


        return(
            <Table style={{background: 'white', opacity: .85 }}>
                
                {this.props.auth.isAuthenticated ? 
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th/>
                        {/* <th>Edit</th>
                        <th>Delete</th> */}
                    </tr>
                    </thead>
                    : <thead/>}

                    <TransitionGroup component="tbody">
                        {contacts.map(({ _id,firstName, lastName, address, phoneNumber, email }) => (
                            <CSSTransition key={_id} timeout={1000} classNames="fade">
                                <tr>
                                    <td><div>{firstName}</div></td>
                                    <td><div>{lastName}</div></td>
                                    <td><div>{address}</div></td>
                                    <td><div>{phoneNumber}</div></td>
                                    <td><div>{email}</div></td>

                                    <td>
                                        <EditModal  
                                            _id= {_id} 
                                            firstName={firstName} 
                                            lastName={lastName} 
                                            address={address}
                                            phoneNumber={phoneNumber}
                                            email={email}>
                                        </EditModal>
                                        
                                        <Button
                                            style={{float:"inline-end", display:"inline", margin: '1rem'}}
                                            className="remove-btn"
                                            color="danger"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                        ><img src={deleteIcon} alt="Delete"/>
                                        </Button>
                                    </td>
                                </tr>       
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
            </Table>
        );
    }
}


// Validates the possible property types
// Also sets he properties for this component
Contacts.propTypes = 
{   
    // getContacts property = function action that gets the contacts list
    getContacts: PropTypes.func.isRequired,
    // contact property = state
    contact: PropTypes.object.isRequired
}

// Takes the state from the reducer and makes it a propert of this component
// this.props.contact = the state
// this.props.contact.contacts = the list of contacts
const mapStateToProps = state => ({
    // contact = reducer from index.js
    // Stores it to this.props.contact
    contact: state.contact,
    auth: state.auth,
});

// first param = mapping, 2nd = actions, 3rd = component we are connecting to state
export default connect(mapStateToProps, { getContacts, deleteContact, clearContact })(Contacts);