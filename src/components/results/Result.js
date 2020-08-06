import React from 'react';
import './result.scss';

function Result(props) {
    return (
        <tr key={props.i}>
            <td className='search-result search-result--title'>{props.movie.Title}</td>
            <td className='search-result'>{props.movie.Year}</td>
            <td className='search-result'>{props.movie.Actors}</td>
            <td className='search-result'>{props.movie.Genre}</td>
            <td className='search-result'>{props.movie.Plot}</td>
        </tr>  
    )
}

export default Result;