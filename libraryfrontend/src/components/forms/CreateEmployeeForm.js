import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CreateEmployeeForm({manager, setHideManagerListing}) {

    const navigate = useNavigate()

    console.log("manager", manager)

    //dynamically gathers input values into an object which will be passed on submit
    const [employeeData, setEmployeeData] = useState({
        firstName: "",
        lastName: "",
        isCeo: "false",
        isManager: false,
        salary: null,
        managerId: null
    });

    console.log("employeeData", employeeData)

    useEffect(() => {
        setEmployeeData((prev) => ({ ...prev, managerId: manager.id }))
    }, [manager])

    const handleSubmit = async (e) => {

        e.preventDefault()

        //POST json body object
        let newEmployee = {
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            isCeo: employeeData.isCeo,
            isManager: employeeData.isManager.toString(),
            salary: employeeData.salary,
            managerId: manager.id
        }

        console.log("jsonobject: ", JSON.stringify(newEmployee))

        try {
            let res = await fetch("http://localhost:4000/rest/employee/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newEmployee)
            });
            if (res.ok) {
                alert("Employee was successfully created")
            } else {
                alert("Something went wrong, try again")
            }
            navigate("/manage-employees");
        } catch (error) {
            console.log("the new item was not submitted")
        }

    }

    return (
        <div>

            <h1>Create an employee</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>First name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={(e) => {
                            setEmployeeData((prev) => ({ ...prev, firstName: e.target.value }))
                        }}
                        required
                    ></input>
                </div>
                <div>
                    <label>Last name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={(e) => {
                            setEmployeeData((prev) => ({ ...prev, lastName: e.target.value }))
                        }}
                        required
                    ></input>
                </div>
                <div>
                    <label>Rank (1-10)</label>
                    <input
                        type="number"
                        name="salary"
                        id="salary"
                        min="1"
                        max="10"
                        onChange={(e) => {
                            setEmployeeData((prev) => ({ ...prev, salary: e.target.value }))
                        }}
                        required
                    ></input>
                </div>
                <div>
                    <label>Role</label>
                    <input
                        type="checkbox"
                        name="isManager"
                        id="isManager"
                        onChange={(e) => {
                            setEmployeeData((prev) => ({ ...prev, isManager: !employeeData.isManager }))
                            setHideManagerListing(current => !current)
                        }}
                    ></input>
                </div>
                {employeeData.isManager ? <br></br> : <h4>Manager: {manager.firstName} {manager.lastName}</h4>}
                <div>
                    <button
                        type="submit"
                        className="btnSubmit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

