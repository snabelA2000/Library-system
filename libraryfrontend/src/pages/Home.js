

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { LibraryItemListing } from "../components/lists/LibraryItemListing"

export const Home = () => {

    const [libraryItems, setLibraryItems] = useState([])

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
                <button><Link to={"/createLibraryItem"}>createLibraryItem</Link></button>
            </div>
            <LibraryItemListing libraryItems={libraryItems} />
        </div>
    )
}