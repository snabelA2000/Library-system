import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateLibraryItemForm() {

    const navigate = useNavigate()

    //dynamically gathers input values into an object which will be passed on submit
    const [itemData, setItemData] = useState({
        type: "",
        category: "",
        title: "",
        author: "",
        pages: "",
        runTimeMinutes: "",
    });

      // TEMP categories
      const categories = [
        { id: 1, name: "Choose", value: "" },
        { id: 2, name: "Fiction", value: "Fiction" },
        { id: 3, name: "Fantasy", value: "Fantasy" },
        { id: 4, name: "Horror", value: "Horror" },
        { id: 5, name: "Non-fiction", value: "Non-fiction" }
    ]

    const handleFormSubmit = async (e, value) => {

        console.log(e.target.value)
        e.preventDefault()

        let item = itemData;

        let catId = "";
        categories.forEach((item) => {
            if (item.category === item.name) {
                catId = item.id
                return;
            }
        })

        //POST object
        let newLibraryItem = {
            author: item.author,
            borrowDate: null,
            borrower: null,
            categoryId: catId,
            isBorrowable: true,
            pages: item.pages,
            runTimeMinutes: item.runTimeMinutes,
            title: item.title,
            type: item.type
        }

        try {
            let res = await fetch("/rest/libraryItem", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newLibraryItem)
            });
            res = await res.json();

            navigate.push(`/item-details/${res.id}`)
        } catch (error) {
            console.log("the new item was not submitted")
        }
    }

    return (
        <div>

            <h1>Create library item</h1>

            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Type</label>
                    <input
                        type="type"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, type: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>Category</label>
                    <input
                        type="category"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, category: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>Title</label>
                    <input
                        type="title"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, title: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>Author</label>
                    <input
                        type="author"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, author: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>Pages</label>
                    <input
                        type="pages"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, pages: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <label>Run time minutes</label>
                    <input
                        type="runTimeMinutes"
                        onChange={(e) => {
                            setItemData((prev) => ({ ...prev, runTimeMinutes: e.target.value }))
                        }}

                    ></input>
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-myPr-dark hover:bg-myPr-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

