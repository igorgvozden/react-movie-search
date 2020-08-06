import React from 'react';
import './nav.scss';

function Nav () {
    return (
        <div className='nav'>
            <div className='nav__logo'>
                <h3 className='nav__logo-title'>Movies</h3>
            </div>
            <p className='nav__text'>Search our database and find info about any movie you can think of!</p>
        </div>
    )
}

export default Nav;