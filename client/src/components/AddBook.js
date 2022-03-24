import axios from "axios";
import React, { useEffect, useState } from "react";

const AddBook = ({setBooks}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const changeTitle = (e) => setTitle(e.target.value);
    const changeAuthor = (e) => setAuthor(e.target.value);
    
    useEffect(() => {
        if (!errorMessage) {
            setIsVisible(false)
            return
        }
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 5000);
        return () => clearTimeout(timer);
    }, [errorMessage])

    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post('http://localhost:5001/add-book', {
                title,
                author
            }, {
                headers: {
                    "content-type": "application/json"
                }
            }).then(res => {
            setTitle("");
            setAuthor("");
            setBooks(res.data);
        }).catch(err => {
            setErrorMessage(err.response.data.message)
        })
    }
    return(
        <form onSubmit={handleSubmit} className="add-form">
            {isVisible ? <label className="errorMessage">{errorMessage}</label> : <label></label>}
            <input type = "text"
                name = "title"
                placeholder = "Book Title"
                className = "input-fields"
                value= {title}
                onChange = {changeTitle}
                required
            />

            <input type = "text"
                name = "author"
                placeholder = "Author"
                className = "input-fields"
                value= {author}
                onChange = {changeAuthor}
                required
            />

            <input
                type = "submit"
                value = "Create"
                className = "btn"
            />
        </form>
    )
}

export default AddBook;
