export const login = () => {
    const loginUrl = 'https://react-test-globacap.herokuapp.com/login.json?user=ReactTestGlobacap&password=ReactTestGlobacap123';
    return fetch(loginUrl, {
            cache: 'no-cache',
            method: 'GET'
        })
        .then(response => response.json())
        .then(result => {
            return result.authorization_token;
        }); 
}

export const getAllBookshelves = (token) => {
    const bookshelvesfUrl = 'https://react-test-globacap.herokuapp.com/bookshelves.json';
    return fetch(bookshelvesfUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token
            },
            method: 'GET'
        }).then(response => response.json()); 
}

export const getAllBooks = (token) => {
    const bookshelvesfUrl = 'https://react-test-globacap.herokuapp.com/books.json';
    return fetch(bookshelvesfUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token
            },
            method: 'GET'
        }).then(response => response.json()); 
}

export const addBook = (token, data) => {
    const bookshelvesfUrl = 'https://react-test-globacap.herokuapp.com/books.json';
    return fetch(bookshelvesfUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token
            },
            body: JSON.stringify(data),
            method: 'POST'
        }); 
}

export const deleteBook = (token, id) => {
    const bookshelvesfUrl = `https://react-test-globacap.herokuapp.com/books/${id}.json`;
    return fetch(bookshelvesfUrl, {
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token
            },
            method: 'DELETE'
        }); 
}


//--header "X-Auth-Token: 123123123123" 'https://react-test-globacap.herokuapp.com/bookshelves/1.json'
//curl -X GET --header "Content-Type: application/json" --header "X-Auth-Token: 123123123123" 'https://react-test-globacap.herokuapp.com/bookshelves.json'