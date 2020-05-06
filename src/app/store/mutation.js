export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const REQUEST_COMMENT_CREATION = `REQUEST_COMMENT_CREATION`;
export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_USER = 'CREATE_USER';
export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const REQUEST_AUTHENTICATE_USER = `REQUEST_AUTHENTICATE_USER`;
export const PROCESSING_AUTHENTICATE_USER = `PROCESSING_AUTHENTICATE_USER`;
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const SET_STATE = `SET_STATE`;
export const SET_USERNAME = `SET_USERNAME`;
export const REQUEST_USER_CREATION = `REQUEST_USER_CREATION`;

export const requestCreateUser = (username, password) => ({
    type: REQUEST_USER_CREATION,
    username,
    password
})

export const requestCommentCreation = (content, taskID) => ({
    type: REQUEST_COMMENT_CREATION,
    content,
    taskID
});

export const requestTaskCreation = (groupID) => ({
    type: REQUEST_TASK_CREATION,
    groupID
});

export const createTask = (taskID, groupID, owner) => ({

    type: CREATE_TASK,
    taskID,
    groupID,
    owner
});

export const createUser = (id, name, password, friends) =>({

    type: CREATE_USER,
    id, 
    name,
    password,
    friends
})

export const createComment = (ownerID, commentID, taskID, content) => ({
    type: CREATE_COMMENT,
    ownerID,
    commentID,
    taskID,
    content
})
export const setTaskCompletation = (id, isComplete) => ({
    type: SET_TASK_COMPLETE,
    taskID: id,
    isComplete
});

export const setTaskName = (id, name) => ({
    type: SET_TASK_NAME,
    taskID: id,
    name

});

export const setTaskGroup = (id, groupID) => ({
    type: SET_TASK_GROUP,
    taskID: id,
    groupID

});

export const requestAuthenticateUser = (username, password) => ({
    type: REQUEST_AUTHENTICATE_USER,
    username,
    password
});

export const processAuthenticateUser = (status = AUTHENTICATING, session = null) => ({
    type: PROCESSING_AUTHENTICATE_USER,
    session,
    authenticated: status
});

export const setState = (state = {}) => ({
    type: SET_STATE,
    state
});

export const setUserName = (username = {}) => ({
    type: SET_USERNAME,
    username
})