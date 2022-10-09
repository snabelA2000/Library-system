import { useState } from "react"
import "../../styling/components.css"

export const ManagerCard = ({ manager, setManager }) => {

    console.log("manager object: ", manager)


    const [isActive, setIsActive] = useState(false)

  
    const handleOnClick = () => {

        setIsActive(current => !current);
        
        setManager(manager)


    }

    return (
        <div
            onClick={handleOnClick}
            className="cardManager">
            <div className="cardContainer">
                <div className="flexed-left">
                    <h5>{manager.firstName} {manager.lastName}</h5>
                </div>
            </div >
        </div >
    )
}