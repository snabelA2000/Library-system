
import "../../styling/components"
import { EmployeeCard } from "../cards/EmployeeCard";

export const EmployeeListing = ({ items }) => {

    const renderItems = items.map((item) => {
        return (
            <EmployeeCard
                auction={item}
                key={item.id}
            />
        )
    })


    return <div className="listContainer">{renderItems}</div>
}