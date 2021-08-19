import {NavLink} from "react-router-dom";


const Navbar = () => {
    return (
        <header className="mb-3">
            <div>
                <a className="text-light text-decoration-none" href="/">
                    <h2 className="float-md-start mb-1 fw-bold">MovieYek</h2>
                </a>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    <NavLink exact className="nav-link" activeClassName={"nav-link active"} to={"/"}>Home</NavLink>
                    <NavLink className="nav-link" activeClassName={"nav-link active"} to={"/add"}>Add Movie</NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;