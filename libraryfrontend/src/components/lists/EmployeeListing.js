
import "../../styling/components.css"
import { EmployeeCard } from "../cards/EmployeeCard";

export const EmployeeListing = ({ employees }) => {

    const renderItems = employees.map((e) => {
        return (
            <EmployeeCard
                employee={e}
                key={e.id}
            />
        )
    })


    return <div className="listContainer">{renderItems}</div>
}