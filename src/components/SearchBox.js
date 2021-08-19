import React, {Component} from 'react';
import MovieConsumer from "../context";


class SearchBox extends Component {

    handleFormSubmit = (e) => {
        e.preventDefault();

    }

    render() {
        return (
            <MovieConsumer>
                {
                    value => {
                        return (
                            <div className="row my-3">
                                <form onSubmit={this.handleFormSubmit}>
                                    <div className="row g-1">
                                        <div className="col-md-6 offset-md-3 col-10 offset-1">
                                            <input
                                                onInput={value.searchMovie}
                                                type="text"
                                                className="form-control bg-transparent text-light text-center rounded-pill"
                                                placeholder="Search Movie"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        );
                    }
                }
            </MovieConsumer>
        )
    }
}

export default SearchBox;