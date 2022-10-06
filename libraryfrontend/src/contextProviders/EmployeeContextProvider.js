import { createContext, useState, useEffect } from "react";

export const EmployeeContext = createContext();

export default function EmployeeContextProvider(props) {
    const [employees, setEmployees] = useState([]);

    const fetchAllEmployees = async () => {
        let res = await fetch("http://localhost:4000/rest/employee");

        try {
            res = await res.json();
            if (res) {
                setEmployees(res)
            }
        } catch {
            console.log("!!Failed to fetch all employees ")
        }
    }

    useEffect(() => {
        fetchAllEmployees()
    }, []);

    const values = {
        employees,
        fetchAllEmployees
    }

    return (
        <EmployeeContext.Provider value={values}>
            {props.children}
        </EmployeeContext.Provider>
    );
}