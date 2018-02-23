import React from 'react';

class Book extends React.Component {

    render () {
        const {title, author, id} = this.props.book;
        return (
            <div className="book-item-container">
                <p>{title} </p>
                    <span>by</span>
                <p> {author}</p>
                <button onClick={() => this.props.onDeleteBook(id)}>Delete from shelf</button>
            </div>
        );
    };

}
export default Book;