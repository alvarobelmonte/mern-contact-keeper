import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact, current, clearCurrent, updateContact } = contactContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;
    const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (!current) {
            addContact(contact);
        }
        else {
            updateContact(contact);
        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form className="measure left" onSubmit={onSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">{current ? 'Edit' : 'Add'} Contact</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onChange} type="text" name="name" id="name" value={name} />
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onChange} type="email" name="email"  id="email" value={email}/>
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="phone">Phone</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onChange} type="number" name="phone"  id="phone" value={phone}/>
            </div>
            <div classsName="mv3">
                <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} />Personal 
                <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} />Professional
            </div>
            </fieldset>
            <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value={current ? 'Update' : 'Add'}  />
                
                {current && <div>
                    <a href="" className="f6 link dim black db" onClick={clearAll} value="Clear">Clear</a>
                </div>}
            </div>
        </form>
    )
}

export default ContactForm
