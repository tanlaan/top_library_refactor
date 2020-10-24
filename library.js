
let myLibrary = []
console.log(localStorage.getItem('library'))
if(localStorage.getItem('library')){
    console.log('Got the library')
    myLibrary = JSON.parse(localStorage.getItem('library'))
}


readBooksInLibrary(myLibrary)

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ` + (this.read ? 'have read' : 'not read yet')
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function readBooksInLibrary(library) {
    let tableBody = document.getElementsByTagName('tbody')[0]
    // Gabriel McAdams on Stackoverflow had a great point
    // about selecting by first child and deleting last
    // child as most likely these are going to be the fastest
    // forms of searching and deletion
    if(tableBody.hasChildNodes()) {
        while(tableBody.firstChild) {
            tableBody.removeChild(tableBody.lastChild)
        }
    }
    for (book in library) {
        tableBody.appendChild(getBookRow(library[book], book))
    }
    console.log(`Added ${JSON.stringify(library)} to local storage.`)
    localStorage.setItem('library', JSON.stringify(library))
}

function getBookRow(book, id) {
    let row = document.createElement('tr')
    row.setAttribute('data-index', id)
    let title = document.createElement('td')
    title.innerHTML = book.title
    let author = document.createElement('td')
    author.innerHTML = book.author
    let pages = document.createElement('td')
    pages.innerHTML = book.pages
    let read = document.createElement('td')
    read.setAttribute('class', 'book-read')
    let readState = document.createElement('input')
    readState.setAttribute('type', 'checkbox')
    readState.checked = book.read
    readState.onclick = function () {
        toggleRead(myLibrary, id)
    }
    read.appendChild(readState)
    let remove = document.createElement('button')
    remove.onclick = function(){removeBook(myLibrary, id)}
    remove.textContent = 'REMOVE'
    let changeRead = document.createElement('td')
    let changeButton = document.createElement('button')
    row.appendChild(title)
    row.appendChild(author)
    row.appendChild(pages)
    row.appendChild(read)
    row.appendChild(remove)
    return row
}

function newBookForm() {
    let base = document.getElementById('book-form')
    let bookForm = document.createElement('form')
    // Remove form if it already exists
    if(base.hasChildNodes()) {
        while(base.firstChild) {
            base.removeChild(base.lastChild)
        }
    }

    let TITLE = document.createElement('input')
    TITLE.setAttribute('id', 'book-title')
    TITLE.setAttribute('type', 'text')
    TITLE.setAttribute('name', 'BookTitle')
    TITLE.setAttribute('placeholder', 'Title')

    let AUTHOR = document.createElement('input')
    AUTHOR.setAttribute('id', 'book-author')
    AUTHOR.setAttribute('type', 'text')
    AUTHOR.setAttribute('name', 'BookAuthor')
    AUTHOR.setAttribute('placeholder', 'Author')

    let PAGES = document.createElement('input')
    PAGES.setAttribute('id', 'book-pages')
    PAGES.setAttribute('type', 'number')
    PAGES.setAttribute('name', 'BookPages')
    PAGES.setAttribute('placeholder', '0')

    let READ = document.createElement('input')
    READ.setAttribute('id', 'book-read')
    READ.setAttribute('type', 'checkbox')
    READ.setAttribute('name', 'BookRead')

    let SUBMIT = document.createElement('button')
    SUBMIT.onclick = function(){submitBook()}
    SUBMIT.setAttribute('type', 'button')
    SUBMIT.textContent = 'SUBMIT'

    bookForm.appendChild(TITLE)
    bookForm.appendChild(AUTHOR)
    bookForm.appendChild(PAGES)
    bookForm.appendChild(READ)
    bookForm.appendChild(SUBMIT)

    base.appendChild(bookForm)
}

function submitBook() {
    let form = document.getElementById('book-form')
    let title = document.getElementById('book-title').value
    let author = document.getElementById('book-author').value
    let pages = document.getElementById('book-pages').value
    let read = document.getElementById('book-read').checked
    let newBook = new Book(title, author, pages, read)
    addBookToLibrary(newBook)
    while(form.firstChild) {
        form.removeChild(form.lastChild)
    }
    readBooksInLibrary(myLibrary)
}

function removeBook(library, id) {
    library.splice(id, 1)
    readBooksInLibrary(library)
}

function toggleRead(library, id) {
    library[id]['read'] = !(library[id]['read'])
    readBooksInLibrary(library)
}