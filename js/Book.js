export default class Book{
    id = null;
    title = null;
    author = null;
    genres = [];
    publishedYear = null;
    isAvailable = null;
    returnDay = null;

    constructor(id, title, author, genres, publishedYear, returnDay) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genres = genres.split(',');
        this.publishedYear = publishedYear;
        this.isAvailable = true;
        this.returnDay = returnDay;
    }

    createBook() {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            genres: this.genres,
            publishedYear: this.publishedYear,
            isAvailable: this.isAvailable
        }
    }

}

