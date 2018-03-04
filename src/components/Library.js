import React from 'react';
import Bookshelf from './Bookshelf';
import { getAllBookshelves, getAllBooks, addBook, deleteBook } from '../api'

class Library extends React.Component {

    state = {
        bookshelvesList: []
    };
    
    onSave = (newBook) => {
       addBook(this.props.token, newBook).then(
           (response) => {
               response.json().then(result => {
                    if (response.status === 201) {
                        const updatedShelvesList = 
                            this.state.bookshelvesList.map((bookshelf) => { 
                                if (bookshelf.id === result.bookshelf_id) { 
                                    return { ...bookshelf, relatedBooks: [...bookshelf.relatedBooks, result] } 
                                } 
                                return bookshelf; 
                            });
                        this.setState({bookshelvesList: updatedShelvesList});
                    } else {
                        console.log('Your book object was invalid.');
                    }
               });
           }
       );
    }

    onDeleteBook = (bookId) => {
        deleteBook(this.props.token, bookId).then(
            (response) => {
                if (response.status === 204) {
                    const updatedShelvesList = this.state.bookshelvesList.map((bookshelf) => {
                        const booksList = bookshelf.relatedBooks;
                        const updatedBooks = bookshelf.relatedBooks.filter((book) => {
                            return book.id !== bookId;
                        });
                    
                        if (updatedBooks.length !== booksList.length) {
                            return { 
                                ...bookshelf, 
                                relatedBooks: updatedBooks
                            }
                        }
                    
                            return bookshelf;
                    });

                    this.setState({bookshelvesList: updatedShelvesList});
                } else {
                    console.log('Your book object was invalid.');
                }
            });
     }


    
    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            Promise.all([
                getAllBookshelves(nextProps.token),  
                getAllBooks(nextProps.token)
            ]).then(([bookshelves, books]) => {
                const bookshelvesList = bookshelves.reduce((acc, item) => {
                    const relatedBooks = books.filter(book => book.bookshelf_id === item.id);
                    acc.push({...item, relatedBooks});
                    return acc;
                }, []);
                    this.setState({bookshelvesList});
            });
        }
    };

    render () {
        return (
            <div>
                <ul className="book-shelf-wrapper">
                    <li className="">
                        {
                            this.state.bookshelvesList 
                            ? this.state.bookshelvesList.map(
                                (bookshelf, index) => 
                                    <Bookshelf
                                        key={index}
                                        onSave={this.onSave} 
                                        onDeleteBook={this.onDeleteBook} 
                                        bookshelf={bookshelf} />) 
                            : null
                        }
                    </li>
                </ul>
            </div>
        );
    };
}
export default Library;