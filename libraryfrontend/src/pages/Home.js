

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { LibraryItemListing } from "../components/lists/LibraryItemListing"

export const Home = () => {

    const [libraryItems, setLibraryItems] = useState([])
    const [isBorrowed, setIsBorrowed] = useState(false)

    useEffect(() => {
        fetch("http://localhost:4000/rest/libraryItem/all")
            .then(res => res.json())
            .then((result) => {
                console.log("result", result)
                setLibraryItems(result);
            })
    }, [])

    return (
        <div>
            <div>
                <button type="button"><Link to={"/create-library-item"}>createLibraryItem</Link></button>
            </div>
            <LibraryItemListing libraryItems={libraryItems} setIsBorrowed={setIsBorrowed}/>
        </div>
    )
}