import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {ConnectedDashBoard} from './Dashboard';



export const Main = () => (

    <Provider store={store}>
        {/* <div> DashBoard Goes</div> */}
        <ConnectedDashBoard/>

    </Provider>
)