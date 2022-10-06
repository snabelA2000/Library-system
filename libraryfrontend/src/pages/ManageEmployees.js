import { useEffect, useContext } from "react";

import {EmployeeContext} from "../contextProviders/EmployeeContextProvider"
import { EmployeeListing } from "../components/lists/EmployeeListing"

export const ManageEmployees = () => {

    const { allEmployees, fetchAllEmployees } = useContext(EmployeeContext);

    useEffect(() => {
        const x = setTimeout(() => {
            fetchAllEmployees();
        }, 500);
        return () => {
          clearTimeout(x);
        };
      }, []);


    return (
        <div>
            <EmployeeListing allEmployees={allEmployees} />
        </div>
    )
}