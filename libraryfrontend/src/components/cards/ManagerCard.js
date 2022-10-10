import { useState } from "react"
import "../../styling/components.css"

export const ManagerCard = ({ manager, setManager, setHideManagerListing }) => {

    console.log("manager object: ", manager)




  
    const handleOnClick = () => {
        setManager(manager)
        setHideManagerListing(false);
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