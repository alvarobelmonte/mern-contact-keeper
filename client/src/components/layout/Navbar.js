import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ( { title, icon }) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext;

    const onLogout = () => {
        logout();
        clearContacts();
    };

    const authLinks = (
        <Fragment>
            <span className=" dim white dib mr3">Hello <span className="dim yellow dib mr6">{ user && user.name }</span></span>
            <Link onClick={onLogout} className="link dim white dib mr3" to="/" title="Logout">Logout</Link>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
                <Link className="link dim white dib mr3" to="/register" title="About">Register</Link>
                <Link className="link dim white dib mr3" to="/login" title="About">Login</Link>
                <Link className="link dim white dib mr3" to="/about" title="About">About</Link>
        </Fragment>
    );

    return (

        <header className="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l" style={{'zIndex': '1'}}>
            <nav className="f6 fw6 ttu tracked">
                <Link to="/" className="dim yellow dib mr6"> 
                    <i className= { icon } /> { title }
                </Link>
                {isAuthenticated ? authLinks : guestLinks}
            </nav>
        </header>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'ContactKeeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar
