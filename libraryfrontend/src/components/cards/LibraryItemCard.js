
import "../../styling/components.css"

export const LibraryItemCard = ({ libraryItem }) => {

    let item = libraryItem
    return (
        <div className="card">
            <div className="cardContainer">
                <div className="flexed-left">
                    <div>
                        <h3>{item.title} </h3>
                        <h5>{item.author}</h5>
                    </div>
                    <div>
                        <div>{item.type}</div>
                        {item.pages ? <div>{item.pages} pages</div> : <div>{item.runTimeMinutes} minutes</div>}
                    </div>
                </div>
                <div className="flexed-right">
                    <div>Borrowed: {item.borrowable.toString()}</div>
                </div>
            </div>

        </div>
    )
}