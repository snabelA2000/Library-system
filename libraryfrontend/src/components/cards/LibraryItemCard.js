
import "../../styling/components.css"

export const LibraryItemCard = ({ libraryItem, setIsBorrowed }) => {

    let item = libraryItem

    const handleClick = () => {
        setIsBorrowed(true)
    }
    return (
        <div className="card" onClick={handleClick}>
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