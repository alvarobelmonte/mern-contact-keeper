import React, { useState, useContext} from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const { _id, name, email, phone, type } = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    };

    return (
        <section className="tc pa3 pa5-ns">
            <article className="hide-child relative ba b--black-20 mw5 center">
                <img src="https://i.imgur.com/dOx2wRl.jpg" className="db" alt="Photo of Jesse Grant" />
                <div className="pa2 bt b--black-20">
                    <span className="f6 db link dark-blue hover-blue">{ name }</span> 
                    <span className={'b mw8 pa1 center br2 ba b--light-blue  ' + (type === 'professional' ? 'bg-pink' : 'bg-yellow')}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                    <ul className="list f6 gray mv1">
                    { email && (<li>
                        <i className="fas fa-envelope-open"></i> { email }
                    </li>)}
                    {phone && (<li>
                        <i className="fas fa-phone"></i> { phone }
                    </li>)}</ul>
                    <span className="mv1 tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" onClick={() => setCurrent(contact)}>Edit</span>
                    <span className="mv1 tc ph3 pv1 db bg-animate bg-dark-red hover-bg-red white f6 br1" onClick={onDelete}>Delete</span>
                </div>
            </article>
        </section>       
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
};

export default ContactItem;
