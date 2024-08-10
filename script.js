let books = [];
let borrowHistory = [];

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;

    if (title && author && category) {
        books.push({ title, author, category });
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('category').value = '';
        displayBooks();
    }
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${book.title} by ${book.author} (Category: ${book.category}) 
                        <button onclick="borrowBook(${index})">Borrow</button>`;
        bookList.appendChild(li);
    });
}

function borrowBook(index) {
    const book = books[index];
    const date = new Date().toLocaleDateString();
    borrowHistory.push({ ...book, date });
    books.splice(index, 1);
    displayBooks();
    displayBorrowHistory();
}

function displayBorrowHistory() {
    const borrowHistoryList = document.getElementById('borrowHistory');
    borrowHistoryList.innerHTML = '';

    borrowHistory.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `${entry.title} by ${entry.author} (Category: ${entry.category}) - Borrowed on ${entry.date}`;
        borrowHistoryList.appendChild(li);
    });
}

document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );

    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    filteredBooks.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${book.title} by ${book.author} (Category: ${book.category}) 
                        <button onclick="borrowBook(${index})">Borrow</button>`;
        bookList.appendChild(li);
    });
});
