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
    span.classList.add("book-title");

    const deleteBTN = document.createElement("button");
    deleteBTN.classList.add("delete-btn", "btn", "btn-sm", "btn-danger", "float-end");
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

function handleBookClick(event) {
    if (event.target.classList.contains("delete-btn")) {
        const listItem = event.target.parentElement;
        listItem.remove();
        updateStatistics();
    } else if (event.target.type === "checkbox") {
        if (event.target.checked) {
            const titleSpan = event.target.nextElementSibling;
            titleSpan.classList.add("text-decoration-line-through");
            updateStatistics();
        } else {
            const titleSpan = event.target.nextElementSibling;
            titleSpan.classList.remove("text-decoration-line-through");
            updateStatistics();
        }
    }
}

function setupBookListListener() {
    bookList.addEventListener("click", handleBookClick);
}

function enableBookEditing(event) {
    const target = event.target;
    if (!target.classList.contains("book-title")) { return; }
    target.contentEditable = true;
    target.focus();
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(target);
    selection.removeAllRanges();
    selection.addRange(range);
}

function finishBookEditing(event) {
    const target = event.target;
    target.contentEditable = false;
    const newValue = target.textContent.trim();
    if (newValue === "") {
        target.textContent = "Untitled Book";
        return;
    }
    target.textContent = newValue;
}

function handleEditKey(event) {
    if (event.key !== "Enter") { return; }
    event.preventDefault();
    event.target.blur();
}

function setupEditListeners() {
    bookList.addEventListener("dblclick", enableBookEditing);
    bookList.addEventListener("blur", finishBookEditing, true);
    bookList.addEventListener("keydown", handleEditKey);
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    for (const book of bookList.children) {
        const title = book.querySelector("span.book-title").textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            book.style.display = "";
        } else {
            book.style.display = "none";
        }
    }
}

function setupSearchListener() {
    document.getElementById("search-input").addEventListener("input", handleSearch);
}
function showAllBooks() { }
function showUnreadBooks() { }
function showReadBooks() { }
function setupFilterListeners() { }
function bootSystem() {
    setupFormListener();
    setupBookListListener();
    setupEditListeners();
    setupSearchListener();
    updateStatistics();
}
document.addEventListener("DOMContentLoaded", bootSystem);