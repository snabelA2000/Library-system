
import "../../styling/components.css"
import { LibraryItemCard } from "../cards/LibraryItemCard";

export const LibraryItemListing = ({ libraryItems }) => {

    const renderItems = libraryItems.map((item) => {
        return (
            <LibraryItemCard
                libraryItem={item}
                key={item.id}
            />
        )
    })


    return <div className="listContainer">{renderItems}</div>
}