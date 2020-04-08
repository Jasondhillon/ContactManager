import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap'
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { clearContact } from '../../actions/contactActions';


export class Logout extends Component 
{
    render() {
        return (
            <Fragment>
                <NavLink onClick={() => this.logOut()} href="#">
                Logout {this.props.auth.user.userName}</NavLink>
            </Fragment>
        );
    }

    logOut = () => {
        this.props.clearContact();
        this.props.logout();
    };
}

const mapStateToProps = state => ({
    // contact = reducer from index.js
    // Stores it to this.props.contact
    contact: state.contact,
    auth: state.auth
});

export default connect(mapStateToProps, { logout, clearContact }) (Logout);