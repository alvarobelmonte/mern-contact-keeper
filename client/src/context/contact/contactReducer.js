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


export default (state, action) => {
    switch(action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload)
            }
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                filtered: null,
                error: null,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact)
            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi'); //global insensitive
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        default:
            return state;
    }
};
