import React, { Component } from 'react';
import './searchResults.scss';
import Result from '../results/Result';

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            yearsParam: '',
            titleParam: ''
        }
        
    }

    getTitleParam = (param) => {
        this.setState({ titleParam: param });
        this.SortByTitle(param);
    }

    SortByTitle = (sortParam) => {
        let sortedByTitle = [];
        sortedByTitle = this.props.movies;

        if (sortParam === 'asc') {
            sortedByTitle.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0)); 
        }
        if (sortParam === 'desc') {
            sortedByTitle.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0)).reverse();
        }
    }

    getYearsParam = (param) => {
        this.setState({ yearsParam: param });
        this.sortByYear(param);
    }

    sortByYear = (sortParam) => {
        let sorted = [];
        sorted = this.props.movies;

        if (sortParam === 'asc') {
            sorted.sort(function(a, b) {
                return Number(a.Year) - Number(b.Year);
            });
        }
         if (sortParam === 'desc') {
            sorted.sort(function(a, b) {
                return Number(b.Year) - Number(a.Year);
            });
        }
    }

    render() {
        const { movies, actors, genre, plot } = this.props;
        let tempMovies = movies;
        
        if (actors !== '' || genre !== '' || plot !== '') {
            tempMovies = movies.filter(movie => movie.Actors.toLowerCase().includes(actors))
            .filter(movie => movie.Genre.toLowerCase().includes(genre))
            .filter(movie => movie.Plot.toLowerCase().includes(plot));
            return (
                <tbody>
                    {
                        tempMovies.map((movie, i) => <Result key={i} movie={movie} />)
                    }
                </tbody>
            )  
        } else {
            return (
                <tbody>
                    <tr>
                        <td className='search-results__table-data search-results__table-data--sort'>
                            <p className='search-results__table-data__text-sort' onClick={ () => this.getTitleParam('asc') }>A .. Z</p>
                            <p className='search-results__table-data__text-sort' onClick={ () => this.getTitleParam('desc') }>Z .. A</p>
                        </td>
                        <td className='search-results__table-data search-results__table-data--toggler'>
                            <p className='search-results__table-data__arrow' onClick={ () => this.getYearsParam('asc') }>&#8679;</p>
                            <p className='search-results__table-data__arrow' onClick={ () => this.getYearsParam('desc') }>&#8681;</p>
                        </td>
                        <td className='search-results__table-data'></td>
                        <td className='search-results__table-data'></td>
                        <td className='search-results__table-data'></td>
                    </tr>
                    {
                        movies.map((movie, i) => <Result key={i} movie={movie} />)
                    }
                </tbody>
            )
        }
    }
}

export default SearchResults;