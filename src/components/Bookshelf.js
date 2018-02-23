import React from 'react';
import Book from './Book';

class Bookshelf extends React.Component {
    
    state = {
        showAddBook: false, 
        title: '', 
        author: '', 
        isbn: ''
    };
    showAddBook = () => {
        this.setState({showAddBook: true});
    }

    cancelAdding = () => {
        this.setState({showAddBook: false});
    }

    addBookParameters = (event) => {
       const fieldType = event.target.attributes.getNamedItem('data-name').value;
       this.setState({[fieldType] : event.target.value});
    }

    saveBook = () => {
        const {title, author, isbn} = this.state;
        this.props.onSave({title, author, isbn, bookshelf_id : this.props.bookshelf.id});
        this.setState({
            showAddBook: false, 
            title: '', 
            author: '', 
            isbn: ''
        });
    }

    render () {
        const {bookshelf} = this.props;
        return (
            <div className="bookshelf-container">
                {/* <h2 className="">{bookshelf.title}</h2>
                <button onClick={this.showAddBook}>+</button> */}
                {/* <button onClick={this.showAddBook}>+</button> */}

                <ul className="books-wrapper">
                    {/* {this.state.showAddBook ? 
                        <li>
                            <input type="text" placeholder="Title" data-name="title" onChange={this.addBookParameters}></input>
                            <input type="text" placeholder="Author" data-name="author" onChange={this.addBookParameters}></input>
                            <input type="text" placeholder="ISBN" data-name="isbn" onChange={this.addBookParameters}></input>
                            <button onClick={this.cancelAdding}>Cancel</button>
                            <button onClick={this.saveBook}>Save</button>
                        </li>
                        : null} */}
                    <li>
                        {
                            bookshelf.relatedBooks.map((book, index) => <Book key={index} onDeleteBook={this.props.onDeleteBook} book={book} />)
                        }
                    </li>
                </ul>
                <div className="bookshelf-block"> 
                    <h4 className="">{bookshelf.title}</h4>
                    {!this.state.showAddBook ?
                        <button onClick={this.showAddBook}>Add new book</button> 
                        : null}

                    {this.state.showAddBook ? 
                        <li>
                            <input type="text" placeholder="Title" data-name="title" onChange={this.addBookParameters}></input>
                            <input type="text" placeholder="Author" data-name="author" onChange={this.addBookParameters}></input>
                            <input type="text" placeholder="ISBN" data-name="isbn" onChange={this.addBookParameters}></input>
                            <button onClick={this.cancelAdding}>Cancel</button>
                            <button onClick={this.saveBook}>Save</button>
                        </li>
                        : null}
                </div>
            </div>
        );
    };
}
export default Bookshelf;