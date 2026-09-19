const bookList = document.getElementById("book-list");
const totalCount = document.getElementById("total-count");
const readCount = document.getElementById("read-count");
const unreadCount = document.getElementById("unread-count");

let currentView = "all";
let currentSearch = "";


function updateStatistics() {
    const totalBooks = bookList.children.length;
    let readBooks = 0;
    let unreadBooks = 0;

    for (let book of bookList.children) {
        const checkBox = book.querySelector("input[type='checkbox']");

        if (checkBox.checked) {
            readBooks++;
        } else {
            unreadBooks++;
        }
    }

    readCount.textContent = readBooks;
    unreadCount.textContent = unreadBooks;
    totalCount.textContent = totalBooks;
}

function createBookItem(title) {
    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = title;

    const deleteBTN = document.createElement("button");
    deleteBTN.classList.add("btn", "btn-sm", "btn-danger", "float-end");
    deleteBTN.textContent = "Delete";

    listItem.classList.add("list-group-item");
    listItem.append(checkBox, span, deleteBTN);

    return listItem;
}

function handleAddBook(event) {
    event.preventDefault();

    const input = document.getElementById("book-input");
    const title = input.value.trim();

    if (title === "") {
        return;
    }

    const bookItem = createBookItem(title);
    bookList.appendChild(bookItem);

    input.value = "";
    input.focus();

    updateStatistics();
}

function setupFormListener() {
    const form = document.getElementById("book-form");
    form.addEventListener("submit", handleAddBook);
}

function handleBookClick(event) { }
function setupBookListListener() { }
function enableBookEditing(event) { }
function finishBookEditing(event) { }
function handleEditKey(event) { }
function setupEditListeners() { }
function handleSearch(event) { }
function setupSearchListener() { }
function showAllBooks() { }
function showUnreadBooks() { }
function showReadBooks() { }
function setupFilterListeners() { }
function bootSystem() {
    setupFormListener();
    updateStatistics();
}
document.addEventListener("DOMContentLoaded", bootSystem);