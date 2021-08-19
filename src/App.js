import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle'
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import MovieList from "./components/MovieList";
import MovieConsumer from "./context";
import AddMovie from "./components/AddMovie";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import UpdateMovie from "./components/UpdateMovie";
import "./style.css"
import SingleMovie from "./components/SingleMovie";

class App extends Component {

    render() {
        return (
            <Router>
                <MovieConsumer>
                    {
                        value => {
                            return (
                                <div className={"d-flex h-100 text-center text-white bg-dark"}>
                                    <div className={"cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"}>
                                        <Navbar/>

                                        <Switch>
                                            <Route path="/add">
                                                <AddMovie/>
                                            </Route>

                                            <Route path="/update/:id">
                                                <UpdateMovie/>
                                            </Route>

                                            <Route path="/detail/:id">
                                                <SingleMovie/>
                                            </Route>

                                            <Route path="/">
                                                <div className="container pt-3">
                                                    <SearchBox/>

                                                    {value.movies.length > 0
                                                        ? <MovieList/>
                                                        : <div className="alert alert-warning text-center mt-5" role="alert"> Movie Not
                                                            Found!</div>
                                                    }
                                                </div>
                                            </Route>


                                        </Switch>

                                    </div>

                                </div>
                            )
                        }
                    }
                </MovieConsumer>
            </Router>
        )
    }

}


export default App;