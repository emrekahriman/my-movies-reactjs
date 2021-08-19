import React, {Component} from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const movieContext = React.createContext();

export class MovieProvider extends Component {

    addNewMovie = async (movieObj) => {
        const response = await axios.post("http://192.168.10.13:3004/movies", movieObj);
        return response.status === 201;
    }

    getMoviesFromDb = async () => {
        const response = await axios.get("http://192.168.10.13:3004/movies");
        await this.setState({movies: response.data.reverse()}) // .reverse() ile son eklenene göre sıralama yaptık.
    }

    searchMovie = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }

    updateMovie = async (movieId, updatedMovie) => {
        const response = await axios.put(`http://192.168.10.13:3004/movies/${movieId}`, updatedMovie);
        return response.status === 200;
    }

    deleteMovie = async (movieId) => {
        const response = await axios.delete(`http://192.168.10.13:3004/movies/${movieId}`);
        return response.status === 200;
    }


    state = {
        movies: [],
        addNewMovie: this.addNewMovie,
        getMoviesFromDb: this.getMoviesFromDb,
        searchQuery: "",
        searchMovie: this.searchMovie,
        updateMovie: this.updateMovie,
        deleteMovie: this.deleteMovie

    }

    componentDidMount = async () => {
        await this.getMoviesFromDb();
    }


    render() {
        return (
            <movieContext.Provider value={this.state}>
                {this.props.children}
                <ToastContainer/>
            </movieContext.Provider>
        );
    }
}


const MovieConsumer = movieContext.Consumer;

export default MovieConsumer;