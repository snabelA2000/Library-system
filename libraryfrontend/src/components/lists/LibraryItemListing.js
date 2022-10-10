
import "../../styling/components.css"
import { LibraryItemCard } from "../cards/LibraryItemCard";

export const LibraryItemListing = ({ libraryItems, setIsBorrowed }) => {

    const renderItems = libraryItems.map((item) => {
        return (
            <LibraryItemCard
            setIsBorrowed={setIsBorrowed}
                libraryItem={item}
                key={item.id}
            />
        )
    })


    return <div className="listContainer">{renderItems}</div>
}