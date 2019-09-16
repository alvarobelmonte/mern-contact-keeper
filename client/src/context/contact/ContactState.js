import React, { useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //Get contacts
    const getContacts = async contact => {
        try {
            const res = await axios.get('/api/contacts');
            dispatch( {
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR ,
                payload: err.response.msg
            });
        }
    };

    //Add contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch( {
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    //Update contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put('/api/contacts/' + contact._id, contact, config);
            dispatch( {
                type: UPDATE_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    //Delete contact
    const deleteContact = async id => {
        try {
            const res = await axios.delete('/api/contacts/' + id);
            dispatch( {
                type: DELETE_CONTACT,
                payload: id
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    //Clear contacts
    const clearContacts = () => {
        dispatch( {
            type: CLEAR_CONTACTS
        });
    };

    //Set current contact
    const setCurrent = contact => {
        dispatch( {
            type: SET_CURRENT,
            payload: contact
        });
    };

    //Clear current contact
    const clearCurrent = () => {
        dispatch( {
            type: CLEAR_CURRENT
        });
    };


    //Filter contacts
    const filterContacts = text => {
        dispatch( {
            type: FILTER_CONTACTS,
            payload: text
        });
    };

    //Clear filter
    const clearFilter = () => {
        dispatch( {
            type: CLEAR_FILTER
        });
    };

    return <ContactContext.Provider
    value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter
    }}>
        {props.children}
    </ContactContext.Provider>
}

export default ContactState;