import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {history} from './history';

import * as mutations from './mutation';
import md5 from 'md5';

const url = "http://localhost:8888";

export  function* taskCreationSaga() {
    while (true) {
        const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = `U1`;
        const taskID = uuidv4();
        yield put(mutations.createTask(taskID, groupID, ownerID));
        const { res } = yield axios.post(url + `/task/new`, {
            task: {
                id: taskID,
                group: groupID,
                owner: ownerID,
                isComplete: false,
                name: "New task"
            }
        });

        console.info("Tenemos respuesta ,", res);
    }
}

// id: "U2",
// name: "PICHÓN VOLADOR",
// passwordHash:md5("willi"),
// friends: []

export  function* userCreationSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_USER_CREATION);
        const friends = [];
        const ID = uuidv4();
        yield put(mutations.createUser(ID, username, password, friends));
        const { res } = yield axios.post(url + `/user/new`, {
            user: {
                id: ID,
                name: username,
                passwordHash: md5(password),
                friends: friends
            }
        });

        console.info("Tenemos respuesta ,", res);
        history.push(`/login`);

    }
}


export  function* taskCreationCommentSaga() {
    while (true) {
        const { content, taskID } = yield take(mutations.REQUEST_COMMENT_CREATION);
        const ownerID = `U1`;
        const commentID = uuidv4();
        
        yield put(mutations.createTask(ownerID, commentID, taskID, content ));
        const { res } = yield axios.post(url + `/comment/new`, {
            comment: {
                owner: ownerID,
                id: commentID,
                task: taskID,
                content: content
            }
        });

        console.info("Tenemos respuesta ,", res);
    }
}


export function* taskModification() {
    while (true) {
        const task = yield take([
            mutations.SET_TASK_GROUP, mutations.SET_TASK_NAME, mutations.SET_TASK_COMPLETE
        ]);
        axios.post(url + `/task/update`, {
            task: {
                   id:task.taskID,
                group:task.groupID,
                name:task.name,
                isComplete:task.isComplete
            }
        })
    }
}

export function* userAuthentificationSaga() {

while (true){
    const {username,password} = yield take(mutations.REQUEST_AUTHENTICATE_USER);
    try {
        const { data } = yield axios.post(url + `/authenticate`,{username,password});
        yield put(mutations.setState(data.state));
        yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED, {
            id:"U1", // todo... get ID from response
            token:data.token
        }));
        history.push(`/dashboard`);
    } catch (e) {
        /* catch block handles failed login */
        yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
}
}