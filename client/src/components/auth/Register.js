import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if(!name || !email || !password) {
            setAlert('Please enter all fields', 'danger');
        }
        else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        }
        else {
            register({
                name, 
                email,
                password
            });
        }
    };
    return (
        <div className='form-container'>
            <form className="measure center" onSubmit={onSubmit}>
                <fieldset id="register" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">New account</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onChange} type="text" name="name"  id="name" value={name}/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onChange} type="email" name="email"  id="email" value={email}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onChange} type="password" name="password"  id="password" value={password}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password2">Confirm Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onChange} type="password" name="password2"  id="password2" value={password2}/>
                </div>

                </fieldset>
                <div>
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"  />
                </div>
            </form>
        </div>
    )
}

export default Register;
