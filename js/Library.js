import Book from "./Book.js";

export default class Library{
    books = [];

    constructor(books){
        //load from lockalstorage
        const dataFromLocalStorage = this.readFromLocalStorage();
        if(dataFromLocalStorage.length > 0){
            console.log('load from LocalStorage', dataFromLocalStorage.length);
            this.books = dataFromLocalStorage;
        }else{
            this.books = books;
            //add to localstorage
            this.saveToLocalStorage();
        }

    }

    returnMarkup(books){
        const booksMarkup = books.map(book =>{
            const genres = book.genres.join(', ');
            return `<div class="book-container">
            <p class="book-title">${book.title}</p>
            <p class="book-id">id: <span>${book.id}</span></p>
            <p class="book-author">author: <span>${book.author}</span></p>
            <p class="book-genres">genres: <span>${genres}</span></p>
            <p class="book-publischedYear">year: <span>${book.publishedYear}</span></p>
            <p class="book-isAvailable">isAvailable: <span>${book.isAvailable}</span></p>
            <p class="book-isAvailable">return Day: <span>${book.returnDay?book.returnDay:''}</span></p>
            <button data-id="${book.id}" class="button is-primary is-light is-outlined m-4 ml-0 delete-book">Delete book</button>
            </div>
            `;
        });

        return booksMarkup.join('');
    }

    addBook(id, title, author, genres, publishedYear){
        console.log(id, title, author, genres, publishedYear);
        const newBook = new Book(id, title, author, genres, publishedYear);
        const createdBook = newBook.createBook();
        this.books.unshift(createdBook);
        this.showBooks(this.books);
        //Add to localStorage
        this.saveToLocalStorage();
    }

    deleteBook(id){
        const deleteId = this.books.findIndex(book => book.id === id);
        console.log("=>(Library.js:38) deleteId", deleteId);
        this.books.splice(deleteId, 1);
        this.showBooks(this.books);
        //Add to localStorage
        this.saveToLocalStorage();
    }

    showBooks(books){
        // console.log(books);
        const containerEl = document.querySelector(".books-container");
        containerEl.innerHTML = this.returnMarkup(books);
        // add event listener on delete button
        const deleteBookBtn = document.querySelectorAll(".delete-book");

        deleteBookBtn.forEach(btn=>btn.addEventListener("click", evt =>{
            console.log(evt.target.dataset.id);
            this.deleteBook(evt.target.dataset.id);}
        ));
    }

    showNotify(notify){
        const containerEl = document.querySelector(".books-container");

        containerEl.innerHTML= `<div class="book-container">
            <p class="my-4 is-size-6 has-text-weight-semibold has-text-danger">${notify}</p>
        </div>`;

    }

    searchByTitleBook(titleInput){
        const filteredBooks = this.books.filter(book => book.title.toLowerCase().includes(titleInput.toLowerCase().trim()));
        if(filteredBooks.length === 0){
            this.showNotify('No books found.');
        } else{
            this.showBooks(filteredBooks);
        }

    }

    searchByAuthorBook(authorInput){
        const filteredBooks = this.books.filter(book => book.author.toLowerCase().includes(authorInput.toLowerCase().trim()));
        if(filteredBooks.length === 0){
            this.showNotify('No books found.');
        } else{
            this.showBooks(filteredBooks);
        }

    }

    borrowBook(idInput){
        const borrowedBookIndex = this.books.findIndex(book => book.id === idInput);
       if(borrowedBookIndex === -1){
           this.showNotify('No books found.');
       }else if(this.books[borrowedBookIndex].isAvailable===false){
           this.showNotify('The Book is already borrowed');
       } else {
           this.books[borrowedBookIndex].isAvailable = false;
           const day = new Date();
           day.setDate(day.getDate() + 10)
           // this.books[borrowedBookIndex].returnDay = day.toLocaleDateString('de-DE');
           this.books[borrowedBookIndex].returnDay = day;

           this.showBooks([this.books[borrowedBookIndex]]);
           this.saveToLocalStorage();
       }

    }

    returnBook(idInput){
        const borrowedBookIndex = this.books.findIndex(book => book.id === idInput);
        if(borrowedBookIndex === -1){
            this.showNotify('No books found.');
        }else if(this.books[borrowedBookIndex].isAvailable===true){
            this.showNotify('The Book was not borrowed');}
        else {
            this.books[borrowedBookIndex].isAvailable = true;
            this.showBooks([this.books[borrowedBookIndex]]);
            this.saveToLocalStorage();
        }

    }

    saveToLocalStorage() {
        try {
            const serializedBooks = JSON.stringify(this.books);
            localStorage.setItem('books', serializedBooks);

        } catch (error) {
            console.log(error.message)
        }
    }

    readFromLocalStorage(){
        try {
            const serializedBooks = localStorage.getItem('books');
            return serializedBooks ? JSON.parse(serializedBooks) : [];
        } catch (error) {
            console.log(error.message);
        }
    }




    getBooks(){
        return this.books;
    }

    getAvailableBooks(){
        const availablebooks = this.books.filter(book => book.isAvailable=== true);
        return availablebooks;
    }


}