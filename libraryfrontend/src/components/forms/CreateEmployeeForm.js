import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateEmployeeForm() {

    const navigate = useNavigate()

    //dynamically gathers input values into an object which will be passed on submit
    const [employeeData, setEmployeeData] = useState({
        firstName: "",
        lastName: "",
        isCEO: false,
        isManager: false,
        salary: ""
    });

    const handleSubmit = async (e, value) => {

        console.log("employeeData: ", employeeData)
        e.preventDefault()

        //POST json body object
        let newEmployee = {
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            isCEO: employeeData.isCEO,
            isManager: employeeData.isManager,
            salary: employeeData.salary,
            managerId: null
        }

        console.log("jsonobject: ", JSON.stringify(newEmployee))

        try {
            let res = await fetch("http://localhost:4000/rest/employee/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newEmployee)
            });
            res = await res.json();
            console.log("response create employee: ", res)
            navigate("/");
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

                    ></input>
                </div>
                <div>
                    <label>CEO</label>
                    <input
                        type="text"
                        name="isCEO"
                        id="isCEO"
                        onChange={(e) => {
                            setEmployeeData((prev) => ({ ...prev, isCEO: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>Manager</label>
                    <input
                        type="text"
                        name="isManager"
                        id="isManager"
                        onChange={(e) => {
                            setEmployeeData((prev) => ({ ...prev, isManager: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>Salary</label>
                    <input
                        type="number"
                        name="salary"
                        id="salary"
                        onChange={(e) => {
                            setEmployeeData((prev) => ({ ...prev, salary: e.target.value }))
                        }}

                    ></input>
                </div>
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

