import React, { Fragment, useState, useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactFilter from '../contacts/ContactFilter';
import ContactForm from '../contacts/ContactForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() =>{
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <ContactForm />
            <ContactFilter/>
            <Contacts/>
        </Fragment>
    )
}

export default Home;
