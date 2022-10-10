
import "../styling/pages.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EmployeeDetails = () => {

    const [manager, setManager] = useState([])

    const navigate = useNavigate()
    const { id } = useParams();
    const [employee, setEmployee] = useState([])


    //dynamically gathers input values into an object which will be passed on submit
    const [employeeDataInput, setEmployeeDataInput] = useState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        isCeo: employee.isCeo,
        isManager: employee.isManager,
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
        updateEmployee()
    }

    const updateEmployee = async () => {
        //POST json body object
        let updateEmployee = {
            id: id,
            firstName: employeeDataInput.firstName,
            lastName: employeeDataInput.lastName,
            isCeo: employee.isCeo.toString(),
            isManager: employee.isManager.toString(),
            salary: employee.salary,
            managerId: manager.id
        }

        console.log("jsonobject: ", JSON.stringify(updateEmployee))

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
        fetch("http://localhost:4000/rest/employee/managers")
            .then(res => res.json())
            .then((result) => {
                console.log("result", result)
                if (employee.isManager !== 'true' && result.some(man => employee.managerId === man.id)) {
                    result.forEach((man) => { //get the id of the chosen category
                        if (employee.managerId === man.id) {
                            console.log("manager match: ", man)
                            setManager(man)
                            return;
                        }
                    });

                }
            })
    }, [employee])

    useEffect(() => {
        setEmployeeDataInput((prev) => ({ ...prev, managerId: manager.id }))

    }, [manager])

    useEffect(() => {
        setEmployeeDataInput((prev) => ({ ...prev, firstName: employee.firstName }))
        setEmployeeDataInput((prev) => ({ ...prev, lastName: employee.lastName }))
        setEmployeeDataInput((prev) => ({ ...prev, isManager: employee.isManager }))
        setEmployeeDataInput((prev) => ({ ...prev, isCeo: employee.isCeo }))
        console.log(employee)
    }, [employee])

    useEffect(() => {
        fetchEmployeeById(id)
    }, [id])

    return (
        <div className="flex">
            <div className="">

                <h1>Edit employee</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <h5>Employee ID: {id}</h5>
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
            </div>

        </div >
    )


}