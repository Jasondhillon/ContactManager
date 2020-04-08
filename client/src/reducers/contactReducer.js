import {GET_CONTACTS, SEARCH_CONTACTS, ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT, CLEAR_CONTACT, CONTACTS_LOADING} from '../actions/types';

const initialState = 
{   
    contacts:[],
    loading: false
}

export default function(state = initialState, action)
{
    switch (action.type) 
    {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
        case SEARCH_CONTACTS:
            return {
                ...state,
                contacts: action.payload
        };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload)
            };
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            };
        case CLEAR_CONTACT:
            return {
                ...state,
                contacts: action.payload
            };
        case CONTACTS_LOADING:
            return {
                ...state,
                contacts: [],
                loading: true
            };
        case EDIT_CONTACT:
            
            const index = state.contacts.findIndex(contact => contact._id === action.payload._id);

            state.contacts[index] = action.payload;
            return{
                ...state,
                contacts: state.contacts
            };
        default:
                return state;
    }   
}