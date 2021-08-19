import React, {Component} from 'react';
import MovieConsumer from "../context";
import {withRouter} from "react-router-dom";
import axios from "axios";
import {Flip, toast} from "react-toastify";




class UpdateMovie extends Component {

    state = {
        name: "",
        rating: "",
        overview: "",
        imageURL: ""
    }

    componentDidMount = async () => {
        const id = this.props.match.params.id;
        const response = await axios.get(`http://192.168.10.13:3004/movies/${id}`);
        const {name, rating, overview, imageURL} = response.data;

        this.setState({
            name,
            rating,
            overview,
            imageURL
        })
    }


    onInputChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <MovieConsumer>
                {
                    value => {
                        const handleFormSubmit = async (e) => {
                            e.preventDefault();

                            const id = this.props.match.params.id;
                            const {name, rating, overview, imageURL} = this.state;
                            const updatedMovie = {
                                name,
                                rating,
                                overview,
                                imageURL
                            }

                            if (!name || !rating || !imageURL || !overview){
                                toast.warning("Fields cannot be empty!", {position: "top-center",autoClose: 3000, transition: Flip})
                            }else{
                                // context.js'e objeyi gönder
                                const isUpdated = await value.updateMovie(id, updatedMovie);

                                if (isUpdated){
                                    toast.success("Movie updated successfully!");
                                    await value.getMoviesFromDb()
                                    await this.props.history.push(`/detail/${id}`); // Film detay sayfasına yönlendirme
                                }else {
                                    toast.error("An error occurred while updating the movie!");
                                }
                            }
                        }

                        const {name, rating, overview, imageURL} = this.state;


                        return (
                            <div className="row my-5">
                                <div className="col-md-8 offset-md-2 col-12">
                                    <h2 className={"fw-normal"}>Update Movie Form</h2>
                                    <hr className="bg-light border-3 border-top border-light mb-4"/>
                                    <form onSubmit={handleFormSubmit} className={"text-start"}>
                                        <div className="row g-2 mb-3">
                                            <div className="col-9">
                                                <label htmlFor={"name"} className="form-label">Name</label>
                                                <input id={"name"} name={"name"}
                                                       value={name} type="text"
                                                       className="form-control"
                                                       onChange={this.onInputChange}
                                                />
                                            </div>
                                            <div className="col-3">
                                                <label htmlFor={"rating"} className="form-label">Rating</label>
                                                <input id={"rating"} name={"rating"}
                                                       value={rating} type="text"
                                                       className="form-control"
                                                       onChange={this.onInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <label htmlFor={"imageURL"} className="form-label">İmage Url</label>
                                                <input id={"imageURL"} name={"imageURL"}
                                                       value={imageURL} type="text"
                                                       className="form-control"
                                                       onChange={this.onInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="overview" className="form-label">Overview</label>
                                            <textarea id={"overview"} name={"overview"}
                                                      value={overview} className="form-control"
                                                      rows="3"
                                                      onChange={this.onInputChange}
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-outline-light px-5">Update Movie</button>
                                    </form>

                                </div>
                            </div>
                        )
                    }
                }
            </MovieConsumer>
        );
    }
}

export default withRouter(UpdateMovie);