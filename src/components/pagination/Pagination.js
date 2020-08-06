import React, { Component } from 'react';
import './pagination.scss';

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            totalResults: null,
            totalPages: 0
        }
    }

    getTotalPages = () => {
        this.setState({ totalPages: Math.ceil(this.props.totalResults/10) })
    };

    componentDidMount () {
        this.setState({ page: this.props.page });
        setTimeout(() => {this.getTotalPages()}, 500)
    }

    render () {
        const { page, increasePage, decreasePage, totalResults } = this.props;

        if (totalResults === null) {
            return (
                <div className='pagination'>
                <p className='pagination__total-results'>Movies found: { totalResults }</p>
            </div>
            )
        } else if (page === 1) {
            return (
                <div className='pagination'>
                    <p className='pagination__total-results'>Movies found: { totalResults }</p>
                    <p className='pagination__page pagination__page--info'>You are on page { page }</p>
                    <p className='pagination__page pagination__page--info'> { (totalResults != null)? `of ${ Math.ceil(this.props.totalResults/10) } total pages` : '' }</p>
                    <p className='pagination__page' onClick={ increasePage } >Next &#8680;</p>
                </div>
            )
        } else if (page === Math.ceil(this.props.totalResults/10)) {
            return (
                <div className='pagination'>
                    <p className='pagination__total-results'>Movies found: { totalResults }</p>
                    <p className='pagination__page' onClick={ decreasePage } >&#8678; Previous</p>
                    <p className='pagination__page pagination__page--info'>You are on page { page }</p>
                    <p className='pagination__page pagination__page--info'> { (totalResults != null)? `of ${ Math.ceil(this.props.totalResults/10) } total pages` : '' }</p>
                </div>
            )
        } else {
            return (
                <div className='pagination'>
                    <p className='pagination__total-results'>Movies found: { totalResults }</p>
                    <p className='pagination__page' onClick={ decreasePage } >&#8678; Previous</p>
                    <p className='pagination__page pagination__page--info'>You are on page { page }</p>
                    <p className='pagination__page pagination__page--info'> { (totalResults != null)? `of ${ Math.ceil(this.props.totalResults/10) } total pages` : '' }</p>
                    <p className='pagination__page' onClick={ increasePage } >Next &#8680;</p>
                </div>
            )
        }
        
    }
}

export default Pagination;