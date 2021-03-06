import { applyMiddleware, createStore, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import taskCreationSaga from './sagas';
import userAuthentificationSaga from './sagas';



const sagaMiddleware = createSagaMiddleware();
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutation';
import { select } from 'redux-saga/effects';

export const store = createStore(
    combineReducers({

        username(name = "", action) {
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.username;
                default:
                    return name;
            }
        },
        session(userSession = defaultState.session || {}, action) {
            let { type, authenticated, session } = action;
            switch (type) {
                case mutations.SET_STATE:
                    return { ...userSession, id: action.state.session.id }
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return { ...userSession, authenticated: mutations.AUTHENTICATING }

                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return { ...userSession, authenticated }

                default:
                    return userSession;
            }
        },
        tasks(tasks = [], action) {
            switch (action.type) {

                case mutations.SET_STATE:
                    return action.state.tasks;
                case mutations.CREATE_TASK:
                    // console.log("la acción es : " + action);
                    return [...tasks, {
                        id: action.taskID,
                        name: "new task",
                        group: action.groupID,
                        owner: action.ownerID,
                        isComplete: false
                    }];
                case mutations.SET_TASK_COMPLETE:
                    return tasks.map(task => {
                        return (task.id === action.taskID) ? { ...task, isComplete: action.isComplete } : task;
                    });

                case mutations.SET_TASK_NAME:
                    return tasks.map(task => {
                        return (task.id === action.taskID) ? { ...task, name: action.name } : task;
                    });

                case mutations.SET_TASK_GROUP:
                    return tasks.map(task => {
                        return (task.id === action.taskID) ? { ...task, group: action.groupID } : task;
                    });



            }
            return tasks;

        },
        comments(comments = [], action) {
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.comments;
                case mutations.CREATE_COMMENT:
                    return [...comments, {
                        ownerID: action.ownerID,
                        commentID: action.commentID,
                        taskID: action.taskID,
                        content: action.content
                    }];
            }

            return comments;
        },
        groups(groups = [], action) {
            switch (action.type) {
                case mutations.SET_STATE:
                    return action.state.groups;
            }

            return groups;
        },
        users(users = [], action) {
            switch(action.type){
                case mutations.CREATE_USER:
                    return[{
                        
                    }]
            }
            return users;
        }
    })
    ,
    applyMiddleware(createLogger(), sagaMiddleware)
)

for (let saga in sagas) {
    // sagaMiddleware.run(taskCreationSaga);
    // sagaMiddleware.run(userAuthentificationSaga);
    sagaMiddleware.run(sagas[saga]);
}