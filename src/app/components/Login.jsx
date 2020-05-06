import React from 'react';
import { connect } from 'react-redux';
import * as mutation from '../store/mutation'
import { buffers } from 'redux-saga';
import { Link } from 'react-router-dom';


const LoginComponent = ({authenticateUser, authenticated}) => {
    return <div className="card p-3 col-6">
        <h2>
            Hazte un login porfis
    </h2>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="username" name="username" defaultValue="Dev" className="form-control"/>
            <input type="password" placeholder="password" name="password" defaultValue="" className="form-control mt-2"/>
            {authenticated === mutation.NOT_AUTHENTICATED ? <p>Login incorrecto </p> : null}
            <button type="submit" className="form-control mt-2 btn btn-primary"> Botón del logeamiento </button>
    </form>

    <div>
                <Link to="/createuser">
                    <button className="btn btn-primary mt-2">Create un pinche usuario</button>
                </Link>
            </div>
    </div>
};

const mapStateToProps = ({session}) => ({

    authenticated: session.authenticated
})

const mapDispatchToProps = (dispatch) =>{
    return {authenticateUser(e){
         e.preventDefault();
         let username = e.target[`username`].value;
         let password = e.target[`password`].value;
         dispatch(mutation.requestAuthenticateUser(username, password));

    }
}
}


export const ConnetedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);