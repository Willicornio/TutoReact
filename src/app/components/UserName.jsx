import React from 'react';
import { connect } from 'react-redux';
import {requestTaskCreation} from '../store/mutation'
import { Link } from 'react-router-dom';

import * as mutations from '../store/mutation';


export const UserNameComponent = ({uname}) => (
    <div>
        <h3>
            Hola {uname}!, tus tareas: 
        </h3>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    return{
     uname: state.username
    }
};


export const ConnectedUserName = connect(mapStateToProps)(UserNameComponent);
