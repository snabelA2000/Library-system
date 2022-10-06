import { useEffect, useState } from "react";

import { EmployeeListing } from "../components/lists/EmployeeListing"

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
        <div>
            <EmployeeListing employees={employees} />
        </div>
    )
}