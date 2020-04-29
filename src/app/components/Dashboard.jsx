import React from 'react';
import { connect } from 'react-redux';
import {ConnectedTaskList} from './TaskList'

const Dashboard = ({groups}) => (
    <div>
        <h2>Dashboard</h2>
        {groups.map(group => (
           <ConnectedTaskList key={group.id} id={group.id} name={group.name}/>
        ))}
    </div>
)


function mapStateToProps (state) {
    return {
        groups: state.groups
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