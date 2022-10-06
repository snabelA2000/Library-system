
import "../../styling/components.css"

export const LibraryItemCard = ({ libraryItem }) => {


    return (
        <div className="card">
            <div className="cardContainer">
                <span>{libraryItem.id}</span><span>last name</span>
                <p>?turnery ceo</p>
                <p>?turnery manager</p>
                <p>salary</p>
                <p>? turnery manager id</p>
            </div>

        </div>
    )
}