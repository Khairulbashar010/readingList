import axios from "axios";

const SingleBook = ({book, updateBooks, setErrorMessage}) => {
    async function removeBook() {
        await axios.delete(`http://localhost:5001/remove-book/${book.id}`)
            .then(res => {
                updateBooks();
            }).catch(err => {
                setErrorMessage(err.response.data.message);
            })
    }
    return(
            <div className="bookInfo">
                <i className="removeBook" onClick={removeBook}>{'\u2A2F'}</i>
                <p className="bookTitle">{book.title}</p>
                <p className="bookAuthor">{book.author}</p>
            </div>
    )
}

export default SingleBook;
