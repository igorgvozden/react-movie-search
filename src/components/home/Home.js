import React, { Component } from 'react';
import './home.scss';
import Search from '../search/Search';

class Home extends Component {
    render () {
        return (
            <div className='home'>
                <Search />
            </div>
        )
    }
}

export default Home;