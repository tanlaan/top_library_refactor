let myLibrary = []
let test = new Book('testTitles', 'testAuthor', 42, true)
myLibrary.push(test)

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
    let libraryPath = document.getElementById('library')
    let bookTable = document.createElement('table')
    let tableBody = document.createElement('tbody')
    let tableHeader = document.createElement('tr')
    tableHeader.innerHTML = (
    `<th>Title</th>
    <th>Author</th>
    <th>Page Count</th>
    <th>Read It?</th>`)
    tableBody.appendChild(tableHeader)
    for (book in library) {
        tableBody.appendChild(printBook(library[book]))
    }
    bookTable.appendChild(tableBody)
    libraryPath.appendChild(bookTable)
}

function printBook(book) {
    let row = document.createElement('tr')
    let title = document.createElement('td')
    title.innerHTML = book.title
    let author = document.createElement('td')
    author.innerHTML = book.author
    let pages = document.createElement('td')
    pages.innerHTML = book.pages
    let read = document.createElement('td')
    read.innerHTML = (book.read ? 'Yes' : 'No')
    row.appendChild(title)
    row.appendChild(author)
    row.appendChild(pages)
    row.appendChild(read)
    return row
}