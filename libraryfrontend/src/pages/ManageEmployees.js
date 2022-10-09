import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmployeeListing } from "../components/lists/EmployeeListing"
import "../styling/pages.css"

export const ManageEmployees = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/rest/employee/all")
            .then(res => res.json())
            .then((result) => {
                console.log("result", result)
                setEmployees(result);
            })
    }, [])

    return (
        <div className="flex-center">
            <button className="btn-create-employee" type="button"><Link to={"/manage-employees/create-employee"}>Create Employee</Link></button>
            <EmployeeListing employees={employees} />
        </div>
    )
}