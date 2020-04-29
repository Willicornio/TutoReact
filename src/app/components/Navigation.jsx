import { connect } from 'react-redux';
import {Link } from 'react-router-dom';
import React from  'react';

const Navigation = ()=>(
    <div>
        <Link to="/dashboard">
            <h1>A la victoria equipo</h1>
        </Link>
    </div>
);

export const ConnectedNavigation = connect (state=> state)(Navigation);