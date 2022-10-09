
import { useState, useEffect } from "react"
import "../styling/pages.css"
import CreateEmployeeForm from "../components/forms/CreateEmployeeForm"
import { ManagerListing } from "../components/lists/ManagerListing"

export const CreateEmployee = () => {

    const [managers, setManagers] = useState([])
    const [manager, setManager] = useState([])
    const [hideManagerListing, setHideManagerListing] = useState(false)

    useEffect(() => {
        fetch("http://localhost:4000/rest/employee/managers")
            .then(res => res.json())
            .then((result) => {
                console.log("result", result)
                setManagers(result);
            })
    }, [])

    return (
        <div className="flex">
            <CreateEmployeeForm manager={manager} setHideManagerListing={setHideManagerListing} />
            {hideManagerListing ?
                <br></br> :
                <div>
                    <h3>Pick a manager</h3>
                    <ManagerListing managers={managers} setManager={setManager} />
                </div>
            }
        </div>
    )
}