import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateLibraryItemForm({ categories }) {

    const navigate = useNavigate()

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

        console.log(categories.some(obj => item.categoryName === obj.categoryName))

        if (categories.some(obj => item.categoryName === obj.categoryName)) {
            categories.forEach((obj) => { //get the id of the chosen category
                if (item.categoryName === obj.categoryName) {
                    console.log("--------foreach categorie: ", item.categoryName, obj.categoryName)
                    catId = obj.id
                    return;
                }
            });
        } else {
            let newCat = createNewCategory(item.categoryName)
            catId = newCat.id
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

    const createNewCategory = async (categoryInput) => {

        let newCategoryObj = [{
            categoryName: categoryInput
        }]

        console.log("Add new category object body: ", newCategoryObj)

        let newCat = []
        try {
            let res = await fetch("http://localhost:4000/rest/category/add", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newCategoryObj)
            });
            res = await res.json();
            newCat = res
            console.log("response create category: ", res)
            navigate("/");
        } catch (error) {
            console.log("the new category item was not submitted")
        }

        return newCat
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
                    <div>
                        <select
                            id="categoryName"
                            name="categoryName"
                            onChange={(e) => {
                                setItemData((prev) => ({ ...prev, categoryName: e.target.value }));
                            }}
                            required
                        >
                            {categories.map((cat) => <option value={cat.categoryName} key={cat.id}>{cat.categoryName}</option>)}
                        </select>
                    </div>
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

