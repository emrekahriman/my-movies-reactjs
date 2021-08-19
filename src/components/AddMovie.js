import React, {Component} from 'react';
import MovieConsumer from "../context";
import serialize from "form-serialize"
import {withRouter} from "react-router-dom";
import {Flip, toast} from "react-toastify";



class AddMovie extends Component {

    render() {
        return (
            <MovieConsumer>
                {
                    value => {
                        const handleFormSubmit = async (e) => {
                            e.preventDefault();
                            const {name, rating, imageURL, overview} = e.target.elements;

                            if (!name.value || !rating.value || !imageURL.value || !overview.value){
                                toast.warning("Fields cannot be empty!", {position: "top-center",autoClose: 3000, transition: Flip})
                            }else {
                                const newMovie = serialize(e.target, { hash: true });

                                // context.js'e objeyi gönder
                                const isAdded = await value.addNewMovie(newMovie);

                                if (isAdded){
                                    toast.success("Movie added successfully!");
                                    await value.getMoviesFromDb()
                                    await this.props.history.push("/"); // Anasayfaya yönlendirme
                                }else {
                                    toast.error("An error occurred while adding the movie!");
                                }
                            }
                        }

                        return (
                            <div className="row my-5">
                                <div className="col-md-8 offset-md-2 col-12">
                                    <h2 className={"fw-normal"}>Add Movie Form</h2>
                                    <hr className="bg-light border-3 border-top border-light mb-4"/>
                                    <form onSubmit={handleFormSubmit} className={"text-start"}>
                                        <div className="row g-2 mb-3">
                                            <div className="col-9">
                                                <label htmlFor={"name"} className="form-label">Name</label>
                                                <input id={"name"} name={"name"} type="text" className="form-control"/>
                                            </div>
                                            <div className="col-3">
                                                <label htmlFor={"rating"} className="form-label">Rating</label>
                                                <input id={"rating"} name={"rating"} type="text" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <label htmlFor={"imageURL"} className="form-label">İmage Url</label>
                                                <input id={"imageURL"} name={"imageURL"} type="text" className="form-control"/>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="overview" className="form-label">Overview</label>
                                            <textarea id={"overview"} name={"overview"} className="form-control" rows="3"/>
                                        </div>

                                        <button type="submit" className="btn btn-outline-light px-5">Add Movie</button>
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

export default withRouter(AddMovie);