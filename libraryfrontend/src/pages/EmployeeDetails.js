
import "../styling/pages.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EmployeeDetails = () => {

    const navigate = useNavigate()
    const { id } = useParams();
    const [employee, setEmployee] = useState([])

    //dynamically gathers input values into an object which will be passed on submit
    const [employeeDataInput, setEmployeeDataInput] = useState({
        firstName: "",
        lastName: "",
        isCeo: "false",
        isManager: "false",
        managerId: null
    });

    const fetchEmployeeById = async (id) => {
        let res = await fetch(`http://localhost:4000/rest/employee/${id}`)
        res = await res.json()
        console.log(" res get employee by id: ", res)
        setEmployee(res)
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        //POST json body object
        let updateEmployee = {
            id: id,
            firstName: employeeDataInput.firstName,
            lastName: employeeDataInput.lastName,
            isCeo: employeeDataInput.isCeo.toString(),
            isManager: employeeDataInput.isManager.toString(),
            salary: employee.salary,
            managerId: employeeDataInput.managerId
        }

        try {
            await fetch("http://localhost:4000/rest/employee/update", {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(updateEmployee)
            });
            navigate("/manage-employees");
        } catch (error) {
            console.log("the new item was not submitted")
        }

    }

    const handleOnClickDelete = async () => {
        try {
            await fetch(`http://localhost:4000/rest/employee/delete/${id}`, {
                method: 'DELETE'
            })

            navigate("/manage-employees");
        } catch (error) {
            console.log("Employee was not deleted")
        }
    }

    useEffect(() => {
        fetchEmployeeById(id)
    }, [id])

    return (
        <div className="">

            <h1>Create an employee</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>First name</label>
                    <input
                        placeholder={employee.firstName}
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={(e) => {
                            setEmployeeDataInput((prev) => ({ ...prev, firstName: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>Last name</label>
                    <input
                        placeholder={employee.lastName}
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={(e) => {
                            setEmployeeDataInput((prev) => ({ ...prev, lastName: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>CEO</label>
                    <input
                        placeholder={employee.isCEO}
                        type="checkbox"
                        name="isCeo"
                        id="isCeo"
                        onChange={(e) => {
                            setEmployeeDataInput((prev) => ({ ...prev, isCeo: e.target.checked }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>Manager</label>
                    <input
                        placeholder={employee.isManager}
                        type="checkbox"
                        name="isManager"
                        id="isManager"
                        onChange={(e) => {
                            setEmployeeDataInput((prev) => ({ ...prev, isManager: e.target.checked }))
                        }}

                    ></input>
                </div>
                <div>
                    <button
                        type="submit"
                        className="btnSubmit"
                    >
                        Submit changes
                    </button>
                </div>
            </form>
            <div className="">
                <button type="button" onClick={handleOnClickDelete}>Delete</button>
            </div>

        </div >
    )


}