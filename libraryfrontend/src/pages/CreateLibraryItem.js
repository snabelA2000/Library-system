
import { useEffect, useState } from "react";

import CreateLibraryItemForm from "../components/forms/CreateLibraryItemForm"

export const CreateLibraryItem = () => {


    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/rest/category/all")
            .then(res => res.json())
            .then((result) => {
                console.log("result", result)
                setCategories(result);
            })
    }, []) 

    return (
        <div>
            <CreateLibraryItemForm categories={categories}/>
        </div>
    )
}