import React from 'react';
import { connect } from 'react-redux';
import {ConnectedTaskList} from './TaskList';
import {ConnectedUserName} from './UserName';

const Dashboard = ({groups, name}) => (
    <div className = "row">
        <h2></h2>
        <ConnectedUserName key={name} name={name} className="col"/>
        {groups.map(group => (
           <ConnectedTaskList key={group.id} id={group.id} name={group.name} className="col"/>
        ))}
    </div>
)


function mapStateToProps (state) {
    return {
        groups: state.groups,
        name: state.username
    }
}

// const Dashboard = ({groups})=>(
//     <div className="row">
//         {groups.map(group=>(
//             <ConnectedTaskList key={group.id} {...group} className="col"/>
//         ))}
//     </div>
// );

// const mapStateToProps = ({groups})=>({groups});

export const ConnectedDashBoard = connect(mapStateToProps)(Dashboard)