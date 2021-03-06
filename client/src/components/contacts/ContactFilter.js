import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');
    const {filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
        if (!filtered) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value) {
            filterContacts(e.target.value);
        }
        else {
            clearFilter();
        }
    };

    return (
        <form className="measure left">
            <input ref={text} placeholder="Filter contacts..." type="text" onChange={onChange} />
        </form>
    )
}

export default ContactFilter
