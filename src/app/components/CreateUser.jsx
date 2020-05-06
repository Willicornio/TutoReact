import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList';
import { ConnectedUserName } from './UserName';

import * as mutation from '../store/mutation';

const CreateUser = ({createUser}) => {
    return <div className="card p-3 col-6">
        <h2>
            Create porfis
</h2>
        <form onSubmit={createUser}>
            <input type="text" placeholder="username" name="username" defaultValue="" className="form-control" />
            <input type="password" placeholder="password" name="password" defaultValue="" className="form-control mt-2" />
            <button type="submit" className="form-control mt-2 btn btn-primary"> Botón de la creación</button>
        </form>

    </div>

}





function mapStateToProps(state, ownProps) {
    return {state}
}


const mapDispatchToProps = (dispatch) =>{
    return {createUser(e){
         e.preventDefault();
         let username = e.target[`username`].value;
         let password = e.target[`password`].value;
         dispatch(mutation.requestCreateUser(username, password));

    }
}
}

export const ConnectedCreateUser = connect(mapStateToProps, mapDispatchToProps)(CreateUser)