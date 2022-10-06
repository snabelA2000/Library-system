import { Link } from "react-router-dom"

export const Navbar = () => {

    return (
        <div>Hello Navbar
            <nav>
                <Link to={"/manageEmployees"}>Manage Employees</Link>
            </nav>
        </div>
    )
}