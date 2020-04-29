import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutation';

const TaskDetail = ({
    id,
    comments,
    groups,
    task,
    isComplete,
    setTaskCompletation,
    setTaskName,
    setTaskGroup

}) => (
        <div>
            <div>
                <input onChange={setTaskName} value={task.name}></input>
            </div>
            <div>
                <button onClick={() => setTaskCompletation(id, !isComplete)}> {isComplete ? `Re Abrir Because Yes` : `Completar`}</button>
            </div>
            <div>
                <select onChange={setTaskGroup} value={task.group}>

                    {groups.map(group => (
                        <option key={group.id} value={group.id}>{group.id}</option>
                    ))}

                </select>
            </div>
            <div>
                <Link to="/dashboard">
                    <button>Volver al inisio</button>
                </Link>
            </div>
        </div>
    );

const mapStateToProps = (state, ownProps) => {

    let id = ownProps.match.params.id;
    let task = state.tasks.find(task => task.id === id);
    let groups = state.groups;

    return {
        id,
        task,
        groups,
        isComplete: task.isComplete
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        setTaskCompletation(id, isComplete) {
            dispatch(mutations.setTaskCompletation(id, isComplete));
        },

        setTaskGroup(e) {
            dispatch(mutations.setTaskGroup(id, e.target.value));
        },
        setTaskName(e) {
            dispatch(mutations.setTaskName(id, e.target.value));
        }

    }
}


export const ConnectTaskDetail = connect(mapStateToProps, mapDispatchToProps)(TaskDetail);