import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CreateLibraryItemForm({ categories }) {

    const navigate = useNavigate()

    const [allCategories, setAllCategories] = useState(categories)
    const [boolean, setBoolean] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)

    //dynamically gathers input values into an object which will be passed on submit
    const [itemData, setItemData] = useState({
        type: "",
        title: "",
        author: "",
        pages: null,
        runTimeMinutes: null,
        categoryName: ""
    });

    console.log(itemData)



    const handleSubmit = async (e) => {





        e.preventDefault()

        let item = itemData;

        let catId = ""

        if (allCategories.some(obj => item.categoryName === obj.categoryName)) {
            console.log("debug------1")
            allCategories.forEach((obj) => { //get the id of the chosen category
                if (item.categoryName === obj.categoryName) {
                    console.log("--------foreach categorie: ", item.categoryName, obj.categoryName)
                    catId = obj.id
                    return;
                }
            });
        }



        console.log("----catId: ", catId)


        //POST object
        let newLibraryItem = {
            title: item.title,
            author: item.author,
            pages: item.pages,
            category: {
                id: catId,
                categoryName: item.categoryName,
            },
            isBorrowable: true,
            borrowDate: null,
            borrower: null,
            runTimeMinutes: item.runTimeMinutes,
            type: item.type
        }

        console.log("jsonobject: ", JSON.stringify(newLibraryItem))



        try {
            let res = await fetch("http://localhost:4000/rest/libraryItem/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newLibraryItem)
            });
            res = await res.json();
            console.log("response create library item: ", res)
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
                    <label>Type of media</label>
                    <input
                        type="text"
                        name="type"
                        id="type"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, type: e.target.value }))
                        }}

                    ></input>
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

