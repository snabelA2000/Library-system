import { Link } from "react-router-dom"
import '../App.css';

export const Navbar = () => {

    return (
        <nav className="navbar">
            <h1><Link to={"/"}>The Library</Link></h1>
            <div><Link to={"/manage-employees"}>Manage Employees</Link></div>
        </nav>
    )
}