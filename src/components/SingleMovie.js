import React, {Component} from 'react';
import MovieConsumer from "../context";
import {withRouter} from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";




class SingleMovie extends Component {

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
                        const handleDeleteBtnClick = async (e) => {
                            e.preventDefault();

                            const id = this.props.match.params.id;


                            // context.js'e objeyi gönder
                            const isDeleted = await value.deleteMovie(id);

                            if (isDeleted){
                                toast.success("Movie deleted successfully!");
                                await value.getMoviesFromDb()
                                await this.props.history.push("/"); // Anasayfaya yönlendirme
                            }else {
                                toast.error("An error occurred while deleting the movie!");
                            }
                        }

                        const id = this.props.match.params.id;
                        const {name, rating, overview, imageURL} = this.state;

                        return (
                            <div className="row my-5">
                                <div className="col-12">
                                    <div className="card mb-3 shadow-lg" style={{backgroundColor: "#32363a"}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={imageURL} className="text-start img-fluid rounded-start" alt={"yek"} width={300}/>
                                            </div>
                                            <div className="col-md-8 position-relative pb-5">
                                                <div className="card-body">
                                                    <h4 className="card-title">{name}</h4>
                                                    <p className="card-text mt-4">
                                                        {overview}
                                                    </p>
                                                </div>

                                                <div
                                                    className="card-footer d-flex justify-content-between
                                                    align-items-center position-absolute bottom-0 w-100"
                                                >
                                                    <button onClick={handleDeleteBtnClick}
                                                            className="btn btn-danger btn-sm">Delete
                                                    </button>
                                                    <Link to={`/update/${id}`} className="btn btn-warning btn-sm">Update</Link>
                                                    <span className="fs-5 badge bg-info">{rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </MovieConsumer>
        );
    }
}

export default withRouter(SingleMovie);