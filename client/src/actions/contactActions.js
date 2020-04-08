// Where we make our requests to the backend, which then goes to the reducer, and is actually called
import {GET_CONTACTS, ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT, CONTACTS_LOADING, CLEAR_CONTACT, SEARCH_CONTACTS} from '../actions/types';
import {tokenConfig} from './authActions';
import axios from 'axios';
import { returnErrors } from './errorActions';

// Function getContacts returns action.type = GET_CONTACTS
// dispatch comes from thunk that allows asynch loading
export const getContacts = (_id) => (dispatch, getState)  => 
{
    dispatch(setContactsLoading());

    const id = JSON.stringify({_id}); 

    axios
        .post(`./api/contacts/getContacts`, id, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_CONTACTS, 
            payload: res.data,
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

export const searchContacts = (_id, first, last, address, phoneNumber, email) => (dispatch, getState)  => 
{
    dispatch(setContactsLoading());

    const id = JSON.stringify({_id});

    axios
        .post(`./api/contacts/getContacts`, id, tokenConfig(getState))
        .then(res => dispatch({
            type: SEARCH_CONTACTS,
            payload: res.data.filter(contact => contact.firstName.toLowerCase().includes(first.toLowerCase())  
                                                && contact.lastName.toLowerCase().includes(last.toLowerCase())
                                                && contact.address.toLowerCase().includes(address.toLowerCase())
                                                && contact.phoneNumber.includes(phoneNumber)
                                                && contact.email.toLowerCase().includes(email.toLowerCase()))
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
    
};

export const addContact = (contact) => (dispatch, getState) => 
{   
   axios
       .post('./api/contacts', contact, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_CONTACT,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status, 'Please enter a first and last name'))
        );
};
export const clearContact = () => (dispatch) => 
{
    dispatch ({
        type: CLEAR_CONTACT,
        payload: []
    });
};

export const editContact = (contact) => (dispatch, getState) => 
{   
   axios
       .post('./api/contacts/edit', contact, tokenConfig(getState))
        .then(res => dispatch({
            type: EDIT_CONTACT,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// Needs id to determine what to delete
export const deleteContact = id => (dispatch, getState) => 
{
    axios
        .delete(`./api/contacts/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            // reducer also needs id to delete = action.payload
            type: DELETE_CONTACT,
            payload: id
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setContactsLoading = contact => 
{
    return {
        type: CONTACTS_LOADING,
        payload: []
    };
};