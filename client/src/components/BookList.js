import React, { useEffect, useState } from "react";
import SingleBook from "./SingleBook";
const BookList = ({books, updateBooks}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!errorMessage) {
            setIsVisible(false)
            return
        }
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 10000);
        return () => clearTimeout(timer);
    }, [errorMessage])
    return(
        <>
        {isVisible ? <label className="errorMessage">{errorMessage}</label> : <label></label>}
            {
                books.map(book => {
                    return(<SingleBook
                                book={book}
                                updateBooks={updateBooks}
                                key={book.id}
                                setErrorMessage={setErrorMessage}
                            />)
                })
            }
        </>
    )
}

export default BookList;
