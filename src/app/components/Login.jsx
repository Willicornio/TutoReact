import React from 'react';
import { connect } from 'react-redux';
import * as mutation from '../store/mutation'

const LoginComponent = ({authenticateUser, authenticated}) => {
    return <div>
        <h2>
            Hazte un login porfis
    </h2>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="username" name="username" defaultValue="Dev" />
            <input type="password" placeholder="password" name="password" defaultValue="" />
            {authenticated === mutation.NOT_AUTHENTICATED ? <p>Login incorrecto </p> : null}
            <button type="submit"> Botón del logeamiento </button>
    </form>

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