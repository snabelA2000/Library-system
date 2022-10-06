import { Link } from "react-router-dom"
import '../App.css';

export const Navbar = () => {

    return (
        <nav className="navbar">
            <h1>The Library</h1>
            <div><Link to={"/manageEmployees"}>Manage Employees</Link></div>
        </nav>
    )
}