import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashBoard } from './Dashboard';
import { ConnetedLogin } from './Login';
import { Router, Route, Redirect} from 'react-router-dom';
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';
import { ConnectTaskDetail } from './TaskDetail';
// import { Redirect } from 'react-router';


const RouteGuard = Component => (({match})=>{

    console.info("Route guard", match);
    if (!store.getState().session.authenticated){
        return <Redirect to= "/login"/>
    }
    return <Component match = {match}/>; 


});
export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            {/* <div> DashBoard Goes</div> */}
            <div>
                <ConnectedNavigation />
                <Route exact path="/login" component={ConnetedLogin}></Route>
                <Route exact path="/dashboard" render={RouteGuard(ConnectedDashBoard)}></Route>
                <Route exact path="/task/:id" render={RouteGuard(ConnectTaskDetail)}></Route>
            </div>
        </Provider>
    </Router>
);