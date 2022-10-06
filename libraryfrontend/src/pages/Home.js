

import { useEffect, useState } from "react";

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
            <LibraryItemListing libraryItems={libraryItems} />
        </div>
    )
}