import {booksCollection} from "./books-collection.js";
import Library from "./Library.js";

// try

// User Stories (Mandatory) - Book management 📕
// As a librarian, I want to be able to add new books to the library so that users can borrow them.
//     As a librarian, I want to remove books from the library using their unique identifier so that the library’s inventory stays current.


//     As a library user, I want to search for books by title or author so that I can find specific books I’m interested in.
// As a library user, I want to view a list of all books in the library so that I know what is available.
//     As a library user, I want to view a list of books that are currently available so that I can borrow them.
//     As a library user, I want to borrow books using their unique identifier so that I can take them home to read.
//     As a library user, I want to return borrowed books using their unique identifier so that they become available for other users.
//     As a user, I want a simple interface to interact with the library system so that I can easily perform operations like adding, removing, searching, borrowing, and returning books.

// id from js
// console.log('fewfe:', crypto.randomUUID())

// generate ID from CDN
// const { randomUUID } = new ShortUniqueId({ length: 10 });



const library = new Library(booksCollection);



//show books bei load
library.showBooks(library.getBooks());

//// if overdue
const isOverdue = 0;
const borrowedBooks = library.getBooks().filter(book=> !book.isAvailable)
// borrowedBooks.forEach(book => { const day = book.returnDay;
//     day.getTime()
//     console.log(day)})


//show books
const showBooksBtn = document.getElementById("show-books");

showBooksBtn.addEventListener("click", () => {
   library.showBooks(library.getBooks());
})

//show available books
const showAvailableBooksBtn = document.getElementById("show-available-books");

showAvailableBooksBtn.addEventListener("click", () => {
    library.showBooks(library.getAvailableBooks());
})


// Take away Form if not used
function displayOnlyForm(formId){
    const allForms = document.querySelectorAll(".form");
    allForms.forEach((form, index) => {
    if(form.id !== formId){
    form.style.display = "none";
    }
    })
}



//add books
const addBooksBtn = document.getElementById("add-books");
const addBooksForm = document.getElementById("book-add-form");
addBooksBtn.addEventListener("click", () => {
    displayOnlyForm(addBooksForm.id);
    addBooksForm.style.display = "block";
})

const submitBookBtn = document.getElementById("submit-add-book");
submitBookBtn.addEventListener("submit", onFormSubmit)
function onFormSubmit(e) {
    e.preventDefault();

    const formEl = e.currentTarget.elements;
    const id = crypto.randomUUID();
    const title = formEl.title.value;
    const author = formEl.author.value;
    const genres = formEl.genres.value;
    const publishedYear = parseInt(formEl.year.value);
   if(title.length ===0 || author.length ===0 || genres.length ===0 || publishedYear.length ===0) {
       addBooksForm.insertAdjacentHTML('afterbegin', '<p style="color:red">Please fill all fields</p>')
   } else{
       console.log('Book added');
       library.addBook(id, title, author, genres, publishedYear);
       //reset Form
       submitBookBtn.reset();
       addBooksForm.style.display = "none";
   }

}

//delete book
// in Library

// search Book bei title
const searchByTitleBtn = document.getElementById("search-books-bei-title");
const submitSearchByTitleBtn = document.getElementById("submit-search-book-title");
const bookSearchByTitleForm = document.getElementById("book-search-by-title-form");

searchByTitleBtn.addEventListener("click", () => {
    displayOnlyForm(bookSearchByTitleForm.id);
    bookSearchByTitleForm.style.display = "block";
})

submitSearchByTitleBtn.addEventListener("submit", onSearchByTitleForm)
function onSearchByTitleForm(e) {
    e.preventDefault();

    const formEl = e.currentTarget.elements;
    const title = formEl.title.value;
    if(title.length ===0 ) {
        bookSearchByTitleForm.insertAdjacentHTML('afterbegin', '<p style="color:red">Please fill the field</p>')
    } else{
        library.searchByTitleBook(title);
        formEl.title.value ='';

        bookSearchByTitleForm.style.display = "none";
    }
}

// search Book bei author
const searchByAuthorBtn = document.getElementById("search-books-bei-author");
const submitSearchByAuthorBtn = document.getElementById("submit-search-book-author");
const bookSearchByAuthorForm = document.getElementById("book-search-by-author-form");

searchByAuthorBtn.addEventListener("click", () => {
    displayOnlyForm(bookSearchByAuthorForm.id)
    bookSearchByAuthorForm.style.display = "block";
})

submitSearchByAuthorBtn.addEventListener("submit", onSearchByAuthorForm)
function onSearchByAuthorForm(e) {
    e.preventDefault();

    const formEl = e.currentTarget.elements;
    const author= formEl.author.value;
    if(author.length ===0 ) {
        bookSearchByAuthorForm.insertAdjacentHTML('afterbegin', '<p style="color:red">Please fill the field</p>')
    } else{
        library.searchByAuthorBook(author);
        formEl.author.value ='';

        bookSearchByAuthorForm.style.display = "none";
    }
}


//borrowbook

const borrowBookBtn = document.getElementById("borrow-book");
const submitBorrowBookBtn = document.getElementById("submit-borrow-book");
const borrowBookForm = document.getElementById("borrow-book-form");

borrowBookBtn.addEventListener("click", () => {
    displayOnlyForm(borrowBookForm.id)
    borrowBookForm.style.display = "block";
})

submitBorrowBookBtn.addEventListener("submit", onBorrowBookForm)
function onBorrowBookForm (e) {
    e.preventDefault();

    const formEl = e.currentTarget.elements;
    const id = formEl.id.value;
    if(id.length ===0 ) {
        borrowBookForm.insertAdjacentHTML('afterbegin', '<p style="color:red">Please fill the field</p>')
    } else{
        library.borrowBook(id);
        formEl.id.value ='';

        borrowBookForm.style.display = "none";
    }
}


//return book

const returnBookBtn = document.getElementById("return-book");
const submitReturnBookBtn = document.getElementById("submit-return-book");
const returnBookForm = document.getElementById("return-book-form");

returnBookBtn.addEventListener("click", () => {
    displayOnlyForm(returnBookForm.id)
    returnBookForm.style.display = "block";
})

submitReturnBookBtn.addEventListener("submit", onReturnBookForm)

function onReturnBookForm (e) {
    e.preventDefault();

    const formEl = e.currentTarget.elements;
    const id = formEl.id.value;
    if (id.length === 0) {
        returnBookForm.insertAdjacentHTML('afterbegin', '<p style="color:red">Please fill the field</p>')
    } else {
        library.returnBook(id);
        formEl.id.value = '';

        returnBookForm.style.display = "none";
    }
}








