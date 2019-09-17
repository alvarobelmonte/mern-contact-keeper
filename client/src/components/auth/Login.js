import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Invalid credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);


    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if(!email || !password) {
            setAlert('Please fill in all fields', 'danger');
        }
        else {
            login({
                email, 
                password
            });
        }
    };
    return (
        <div className="form-container">
            <form className="measure center" onSubmit={onSubmit}>
                <fieldset id="login" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Login</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onChange} type="email" 
                    name="email"  id="email" value={email} required />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={onChange} type="password" 
                    name="password"  id="password" value={password} required />
                </div>

                </fieldset>
                <div className="">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Login"  />
                </div>
            </form>
        </div>
    )
}

export default Login;
