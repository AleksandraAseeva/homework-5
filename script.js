const books = JSON.parse(localStorage.getItem("books")) || [];
const bar = JSON.parse(localStorage.getItem("bar")) || [];
const bookList = document.querySelector(".bookList");
const item = document.querySelector(".item");
let currenFilter = null;

displayBooks();

function displaySidebar(list) {
  item.innerHTML += `<p>${list.title}</p>`;
}

function displayBooks() {
  bookList.innerHTML = "";
  item.innerHTML = "";
  books.forEach(book => {
    if (!currenFilter || currenFilter == book.status) {
      displayBook(book);
      displaySidebar(book);
    }
    countBooks();
  });
}

function displayBook(book) {
  const bookNumber = books.indexOf(book);
  bookList.innerHTML += `
          <div class="bookshelf">
                <div class="coverr"></div>
                <div>
                    <p class="text">${book.title}</p>
                    <p class="text">${book.author}</p>
                    <p class="text">${book.year}</p>
                    <p class="text">${book.genre}</p>
                    <p class="text">${book.status}</p>
                    <button onclick="deleteBook(${bookNumber})">Удалить</button>
            <button class="edit" onclick="changeBook(${bookNumber})">Изменить</button>
                </div>
            </div>
          `;
}

function addBook() {
  if (document.getElementById("submit").value == "Добавить") {
    const book = {};
    book.title = document.getElementById("title").value;
    book.author = document.getElementById("author").value;
    book.year = document.getElementById("year").value;
    book.genre = document.getElementById("genre").value;
    book.status = document.getElementById("status").value;
    books.push(book);
  } else {
    const number = +document.getElementById("bookNumber").value;
    const book = books[number];
    book.title = document.getElementById("title").value;
    book.author = document.getElementById("author").value;
    book.year = document.getElementById("year").value;
    book.genre = document.getElementById("genre").value;
    book.status = document.getElementById("status").value;
  }
  displayBooks();
  saveBooks();
  document.forms[0].reset(); //очищает форму
  return false;
}

function deleteBook(bookNumber) {
  books.splice(bookNumber, 1);
  displayBooks();
  deleteItem();
  saveBooks();
  countBooks();
}

function deleteItem(itemNumber) {
  bar.splice(itemNumber, 1);
  saveBooks();
}

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function countBooks() {
  const span = document.querySelector("span");
  span.textContent = bookList.childElementCount;
}

countBooks();

const trashCan = document.querySelector(".trashcan");
trashCan.addEventListener("click", () => {
  books.splice(0, books.length);
  displayBooks();
  saveBooks();
});

function changeBook(bookNumber) {
  const justbook = books[bookNumber];
  document.getElementById("title").value = justbook.title;
  document.getElementById("author").value = justbook.author;
  document.getElementById("year").value = justbook.year;
  document.getElementById("genre").value = justbook.genre;
  document.getElementById("status").value = justbook.status;
  document.getElementById("submit").value = "Сохранить";
  document.getElementById("bookNumber").value = bookNumber;
}

//чтобы фильтровать
const readBook = document.getElementById("read");

readBook.addEventListener("click", () => {
  currenFilter = "прочитано";
  displayBooks();
});

function displayreadBook(book) {
  const bookNumber = books.indexOf(book);
  bookList.innerHTML += `
          <div class="bookshelf">
                <div class="coverr"></div>
                <div>
                    <p class="text">${book.title}</p>
                    <p class="text">${book.author}</p>
                    <p class="text">${book.year}</p>
                    <p class="text">${book.genre}</p>
                    <p class="text">${book.status}</p>
                    <button onclick="deleteBook(${bookNumber})">Удалить</button>
            <button onclick="changeBook(${bookNumber})">Изменить</button>
                </div>
            </div>
          `;
}

//для непрочитанных:
const unreadBook = document.getElementById("unread");

unreadBook.addEventListener("click", () => {
  currenFilter = "не прочитано";
  displayBooks();
});

function displayunreadBook(book) {
  const bookNumber = books.indexOf(book);
  bookList.innerHTML += `
          <div class="bookshelf">
                <div class="coverr"></div>
                <div>
                    <p class="text">${book.title}</p>
                    <p class="text">${book.author}</p>
                    <p class="text">${book.year}</p>
                    <p class="text">${book.genre}</p>
                    <p class="text">${book.status}</p>
                    <button onclick="deleteBook(${bookNumber})">Удалить</button>
            <button onclick="changeBook(${bookNumber})">Изменить</button>
                </div>
            </div>
          `;
}

//для "показать все":
const allBooks = document.getElementById("all");

allBooks.addEventListener("click", () => {
  currenFilter = null;
  displayBooks();
});