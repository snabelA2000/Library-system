import { useNavigate } from "react-router-dom";
import "../../styling/components.css"

export const EmployeeCard = ({ employee }) => {

    const navigate = useNavigate()

    const goToEmployeeDetails = () => {
        navigate(`/manage-employees/employee-details/${employee.id}`);
      };

    return (
        <div className="card">
            <div className="cardContainer">
                <div className="flexed-left">
                    <div>
                        <div>
                            {employee.ceo ? <h3>CEO</h3> : <br></br>}
                            <h5>Employee ID: {employee.id}</h5>
                            <h3>{employee.firstName} {employee.lastName}</h3>
                        </div>
                    </div>
                    <div>
                        <div>
                            {employee.manager ? <h3>Manager</h3> : <br></br>}
                            <p>Salary: {employee.salary}</p>
                            {employee.managerId ? <h3>Managed by id: {employee.managerId}</h3> : <br></br>}
                        </div>
                    </div>
                </div>
                <div className="flexed-right">
                    <button onClick={goToEmployeeDetails} type="button">Edit</button>
                </div>
            </div>
        </div >
    )
}