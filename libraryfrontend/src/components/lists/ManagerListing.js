
import "../../styling/components.css"
import { ManagerCard } from "../cards/ManagerCard";

export const ManagerListing = ({ managers, setManager }) => {

    const renderItems = managers.map((m) => {
        return (
            <ManagerCard
                manager={m}
                setManager={setManager}
                key={m.id}
            />
        )
    })


    return <div className="listContainer">{renderItems}</div>
}