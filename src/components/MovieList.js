import React from 'react';
import MovieConsumer from "../context";
import {Link} from "react-router-dom";


const MovieList = () => {

    const truncateText = (string, maxLength) => {
      if (string.length <= maxLength) return string;
      return `${string.substring(0, maxLength)}..`;
    }
    
    return (
        <MovieConsumer>
            {
                value => {
                    const {movies, searchQuery} = value;
                    let filteredMovies = movies.filter(movie => movie.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
                    if (filteredMovies.length < 1) {
                        return (
                            <div className="alert alert-warning text-center mt-5"
                                 role="alert">
                                No movies found matching "{searchQuery}"
                            </div>
                        )
                    } else {
                        return (
                            <>
                                <div className="row my-5">
                                    {
                                        filteredMovies.map(movie => {
                                            return (
                                                <div key={movie.id} className="col-md-4 my-3">
                                                    <div className="filmbox bg-dark shadow-lg">
                                                        <img src={movie.imageURL} height="350px" alt={"yek"}/>
                                                        <div className="card-body">
                                                            <h3 className="title">{truncateText(movie.name, 16)}</h3>
                                                            <p className="overview">
                                                                {truncateText(movie.overview, 100)}
                                                            </p>
                                                            <Link
                                                                to={`detail/${movie.id}`}
                                                                className="btn btn-outline-light rounded-pill card-link text-decoration-none"
                                                            >
                                                                See More
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </>
                        );
                    }

                }
            }
        </MovieConsumer>
    )
}

export default MovieList;
