import React, { Component, Fragment } from 'react';
import './search.scss';
import SearchResults from '../searchResults/SearchResults';
import Pagination from '../pagination/Pagination';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            year: null,
            actors: '',
            genre: '',
            plot: '',
            movies: [],
            moviesInfo: [],
            movieCount: null,
            page: 1,
            firstPageToGet: 1
        }
    }

    getMoviesInfo = () => {
        let imdbIDs = this.state.movies.map(id => id.imdbID);
        
        let movieDetails = [];

        imdbIDs.map(info => {
            return (
                fetch(`http://www.omdbapi.com/?i=${ info }&apikey=4ca8ee95`)
                .then(response => response.json())
                .then(data => movieDetails.push(data))
                .then(this.setState({moviesInfo: movieDetails}))
            )
        });
    }

    getMovies = () => {
        if (this.state.year != null) {
            fetch(`http://www.omdbapi.com/?s=${this.state.title}&y=${ this.state.year }&page=${ this.state.firstPageToGet }&apikey=4ca8ee95`)
                .then(response => response.json())
                .then(data => {
                    this.setState({ movies: data.Search });
                    this.setState({ movieCount: data.totalResults });
                })
                .then(setTimeout(() => {this.getMoviesInfo()}, 500))
                .then(setTimeout(() => {this.setState({state: this.state})}, 600))
        } else {
            fetch(`http://www.omdbapi.com/?s=${this.state.title}&page=${ this.state.page }&apikey=4ca8ee95`)
                .then(response => response.json())
                .then(data => {
                    this.setState({ movies: data.Search });
                    this.setState({ movieCount: data.totalResults });
                })
                .then(setTimeout(() => {this.getMoviesInfo()}, 500))
                .then(setTimeout(() => {this.setState({state: this.state})}, 600))
        } 
    }
    
    getTitle = (e) => {
        this.setState({title: e.target.value})
    }

    getYear = (e) => {
        this.setState({year: e.target.value})
    }

    getActors = (e) => {
        this.setState({actors: e.target.value})
    }

    getGenre = (e) => {
        this.setState({genre: e.target.value})
    }

    getPlot = (e) => {
        this.setState({plot: e.target.value})
    }

    increasePage () {
        let increasedPage = this.state.page + 1;
        this.setState({ page: increasedPage });
        setTimeout(() => {this.getMovies()}, 100);
        setTimeout(() => {this.setState({state: this.state})}, 200)
    }

    decreasePage () {
        let decreasedPage = this.state.page - 1;
        this.setState({ page: decreasedPage });
        setTimeout(() => {this.getMovies()}, 100);
        setTimeout(() => {this.setState({state: this.state})}, 200)
        
    }

    onKeyPressed(e) {
        if (e.key === 'Enter') {
            this.getMovies()
        }
      }

    render () {
        return (
            <Fragment>
                <div className='search-results'  onKeyDown={(e) => this.onKeyPressed(e)} tabIndex="0">
                <label htmlFor='title' className='search-results__label'>Title</label>
                <input onChange={ this.getTitle }
                    type='text' id='title' className='search-results__input'/>

                <label htmlFor='year' className='search-results__label'>Year</label>
                <input onChange={ this.getYear }
                    type='text' id='year' maxLength='4' className='search-results__input'/>

                <label htmlFor='actors' className='search-results__label'>Actors</label>
                <input onChange={ this.getActors }
                    type='text' id='actors' className='search-results__input'/>

                <label htmlFor='genre' className='search-results__label'>Genre</label>
                <input onChange={ this.getGenre }
                    type='text' id='genre' className='search-results__input'/>

                <label htmlFor='plot' className='search-results__label'>Plot</label>
                <input onChange={ this.getPlot }
                    type='text' id='plot' className='search-results__input'/>

                <p onClick={ this.getMovies } className='search-results__btn'>Search</p>
            </div>
            <h3 className='search-results__table-title'>Search results:</h3>
            <table className='search-results__table'>
                <thead>
                    <tr className='search-results__table-row'>
                        <th className='search-results__table-data'>Title</th>
                        <th className='search-results__table-data'>Year</th>
                        <th className='search-results__table-data'>Actors</th>
                        <th className='search-results__table-data'>Genre</th>
                        <th className='search-results__table-data'>Plot</th>
                    </tr>
                    </thead>
                    {
                        (this.state.moviesInfo.length > 0)
                        ?
                            <SearchResults movies={this.state.moviesInfo} actors={this.state.actors} genre={this.state.genre} plot={this.state.plot}/>
                        :
                        <tbody>
                            <tr>
                                <td className='search-results__table-data'>-</td>
                                <td className='search-results__table-data'>-</td>
                                <td className='search-results__table-data'>-</td>
                                <td className='search-results__table-data'>-</td>
                                <td className='search-results__table-data'>-</td>
                            </tr>
                        </tbody>
                    }
                </table>
                <Pagination 
                    totalResults={this.state.movieCount} 
                    page={this.state.page} 
                    increasePage={ () => this.increasePage()} 
                    decreasePage={ () => this.decreasePage()}
                />
            </Fragment>   
        )
    }
}

export default Search;