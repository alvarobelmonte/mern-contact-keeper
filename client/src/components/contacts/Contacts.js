import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, []);

    if (!contacts) {
        return <h4>Add a contact</h4>;
    }

    return (
        <Fragment>
                <div style={{'zIndex': '-1', 'marginTop': '1rem'}}>
                    <TransitionGroup className="flex flex-wrap">
                        {filtered ? 
                        filtered.map(contact  => 
                        <CSSTransition key={contact._id} timeout={1000} classNames="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                        ) :
                        (contacts.map(contact => 
                        <CSSTransition key={contact._id} timeout={1000} classNames="item">
                            <ContactItem contact={contact} />
                        </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
        </Fragment>
    )
}

export default Contacts
