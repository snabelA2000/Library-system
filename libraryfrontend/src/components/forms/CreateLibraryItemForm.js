import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../../styling/components.css'

export default function CreateLibraryItemForm({ categories }) {

    const navigate = useNavigate()

    const [allCategories, setAllCategories] = useState(categories)
    const [boolean, setBoolean] = useState(false)

    //dynamically gathers input values into an object which will be passed on submit
    const [itemData, setItemData] = useState({
        mediaType: "",
        title: "",
        author: "",
        pages: null,
        runTimeMinutes: null,
        categoryName: "",
        isBorrowable: true
    });

    const mediaTypes = [
        { id: 1, name: "Choose", value: "" },
        { id: 2, name: "Book", value: "Book" },
        { id: 3, name: "Reference Book", value: "Reference Book" },
        { id: 4, name: "DVD", value: "DVD" },
        { id: 5, name: "Audio Book", value: "Audio Book" }
      ]

    const handleSubmit = (e) => {

        e.preventDefault()

        let item = itemData;

        let catId = ""
        if (allCategories.some(obj => item.categoryName === obj.categoryName)) {
            allCategories.forEach((obj) => { //get the id of the chosen category
                if (item.categoryName === obj.categoryName) {
                    catId = obj.id
                    return;
                }
            });
        }
        console.log("----found catId: ", catId)

        if(item.mediaType === 'Reference Book'){
            item.isBorrowable = false
        }

        //POST Body
        let newLibraryItem = {
            title: item.title,
            author: item.author,
            pages: item.pages,
            category: {
                id: catId,
                categoryName: item.categoryName,
            },
            isBorrowable: item.isBorrowable,
            borrowDate: null,
            borrower: null,
            runTimeMinutes: item.runTimeMinutes,
            type: item.mediaType
        }

        console.log("jsonobject: ", newLibraryItem)

        createLibraryItem(newLibraryItem)
    }

    const createLibraryItem = async (newLibraryItem) => {
        try {
            let res = await fetch("http://localhost:4000/rest/libraryItem/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newLibraryItem)
            });
            if(res.ok){
                alert("Product was successfully created")
            }else{
                alert("Something went wrong, try again")
            }
            navigate("/");
        } catch (error) {
            console.log("the new library item was not submitted")
        }
    }

    const createNewCategory = async () => {

        let newCategoryObj = {
            categoryName: itemData.categoryName
        }

        console.log("Add new category object body: ", newCategoryObj)

        try {
            let res = await fetch("http://localhost:4000/rest/category/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newCategoryObj)
            });
            res = await res.json();
            console.log("response create category: ", res)
        } catch (error) {
            console.log("the new category item was not submitted")
        }

        let resFetchAllCategories = await fetch("http://localhost:4000/rest/category/all");

        try {
            resFetchAllCategories = await resFetchAllCategories.json();
            if (resFetchAllCategories) {
                console.log("-----resFetchAllCategories: ", resFetchAllCategories)
                setAllCategories(resFetchAllCategories)
            }
        } catch (error) {
            console.log("couldn't fetch all categories")
        }

    }

    return (
        <div>

            <h1>Create product</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type</label>
                    <select
                        id="mediaType"
                        name="mediaType"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, mediaType: e.target.value }));
                        }}
                        required
                    >
                        {mediaTypes.map((type) => <option value={type.name} key={type.id}>{type.name}</option>)}
                        required
                    </select>
                </div>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, title: e.target.value }))
                        }}
                        required
                    ></input>
                </div>
                <div>
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, author: e.target.value }))
                        }}
                        required
                    ></input>
                </div>
                {/* Category input */}
                <div>
                    <label htmlFor="category">
                        Category*
                    </label>
                    <button type="button" onClick={(e) => { boolean ? setBoolean(false) : setBoolean(true) }}>Other...</button>
                    {boolean ? <div><input
                        type="text"
                        name="categoryName"
                        id="categoryName"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, categoryName: e.target.value }))
                        }}

                    ></input>
                        <button type="button" onClick={createNewCategory}>Create category</button>
                    </div>
                        : <div>
                            <select
                                id="categoryName"
                                name="categoryName"
                                onChange={(e) => {
                                    setItemData((prev) => ({ ...prev, categoryName: e.target.value }));
                                }}
                                required
                            >
                                {allCategories.map((cat) => <option value={cat.categoryName} key={cat.id}>{cat.categoryName}</option>)}
                            </select>
                        </div>}
                </div>
                <div>
                    <label>Pages</label>
                    <input
                        type="number"
                        name="pages"
                        id="pages"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, pages: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>Run time minutes</label>
                    <input
                        type="number"
                        name="runTimeMinutes"
                        id="runTimeMinutes"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, runTimeMinutes: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <button
                        type="submit"
                        className="btnSubmit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

