const bookList = document.getElementById("book-list");
const totalCount = document.getElementById("total-count");
const readCount = document.getElementById("read-count");
const unreadCount = document.getElementById("unread-count");

let statusTimer;
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
    deleteBTN.classList.add(
        "delete-btn",
        "btn",
        "btn-sm",
        "btn-danger",
        "float-end"
    );
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
    updateBookVisibility();

    status(`Added "${title}" to your library.`);
}


function setupFormListener() {
    const form = document.getElementById("book-form");
    form.addEventListener("submit", handleAddBook);
}


function handleBookClick(event) {
    if (event.target.classList.contains("delete-btn")) {
        const listItem = event.target.parentElement;
        const title = listItem.querySelector(".book-title").textContent;

        listItem.remove();

        updateStatistics();
        updateBookVisibility();

        status(`Deleted "${title}" from your library.`);
    } else if (event.target.type === "checkbox") {
        const titleSpan = event.target.nextElementSibling;
        const title = titleSpan.textContent;

        if (event.target.checked) {
            titleSpan.classList.add("text-decoration-line-through");
            status(`Marked "${title}" as read.`);
        } else {
            titleSpan.classList.remove("text-decoration-line-through");
            status(`Marked "${title}" as unread.`);
        }

        updateStatistics();
        updateBookVisibility();
    }
}


function setupBookListListener() {
    bookList.addEventListener("click", handleBookClick);
}


function enableBookEditing(event) {
    const target = event.target;

    if (!target.classList.contains("book-title")) {
        return;
    }

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
    if (event.key !== "Enter") {
        return;
    }

    event.preventDefault();
    event.target.blur();
}


function setupEditListeners() {
    bookList.addEventListener("dblclick", enableBookEditing);
    bookList.addEventListener("blur", finishBookEditing, true);
    bookList.addEventListener("keydown", handleEditKey);
}


function updateBookVisibility() {
    for (const book of bookList.children) {
        const checkbox = book.querySelector("input[type='checkbox']");
        const title = book.querySelector(".book-title").textContent.toLowerCase();

        const matchesSearch = title.includes(currentSearch);

        let matchesFilter = true;

        if (currentView === "read") {
            matchesFilter = checkbox.checked;
        }

        if (currentView === "unread") {
            matchesFilter = !checkbox.checked;
        }

        if (matchesSearch && matchesFilter) {
            book.style.display = "";
        } else {
            book.style.display = "none";
        }
    }
}


function handleSearch(event) {
    currentSearch = event.target.value.toLowerCase().trim();
    updateBookVisibility();
}


function setupSearchListener() {
    document.getElementById("search-input")
        .addEventListener("input", handleSearch);
}


function updateFilterButtons() {
    document.getElementById("show-all")
        .setAttribute("aria-pressed", currentView === "all");

    document.getElementById("show-read")
        .setAttribute("aria-pressed", currentView === "read");

    document.getElementById("show-unread")
        .setAttribute("aria-pressed", currentView === "unread");
}


function showAllBooks() {
    currentView = "all";
    updateBookVisibility();
    updateFilterButtons();
}


function showUnreadBooks() {
    currentView = "unread";
    updateBookVisibility();
    updateFilterButtons();
}


function showReadBooks() {
    currentView = "read";
    updateBookVisibility();
    updateFilterButtons();
}


function setupFilterListeners() {
    document.getElementById("show-all")
        .addEventListener("click", showAllBooks);

    document.getElementById("show-read")
        .addEventListener("click", showReadBooks);

    document.getElementById("show-unread")
        .addEventListener("click", showUnreadBooks);
}


function announceLibraryStatus() {
    const total = totalCount.textContent;
    const read = readCount.textContent;
    const unread = unreadCount.textContent;

    const statusElement = document.getElementById("status");

    statusElement.textContent =
        `Library status: ${total} total books. ${read} read. ${unread} unread.`;

    statusElement.hidden = false;
}


function setupStatusListener() {
    document.getElementById("library-status")
        .addEventListener("click", announceLibraryStatus);
}

function status(message) {
    const statusElement = document.getElementById("status");

    clearTimeout(statusTimer);

    statusElement.textContent = message;
    statusElement.hidden = false;

    statusTimer = setTimeout(() => {
        statusElement.hidden = true;
    }, 3000);
}


function bootSystem() {
    setupFormListener();
    setupBookListListener();
    setupEditListeners();
    setupSearchListener();
    setupFilterListeners();
    setupStatusListener();

    updateStatistics();
    updateFilterButtons();
}


document.addEventListener("DOMContentLoaded", bootSystem);

