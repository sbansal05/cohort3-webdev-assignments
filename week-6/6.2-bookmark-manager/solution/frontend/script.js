const API_URL = 'http://localhost:3001/bookmarks';

// Fetch bookmarks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchBookmarks();

});

// Fetch bookmarks from the backend
function fetchBookmarks() {
    fetch(API_URL)
        .then(response => response.json())
        .then(bookmarks => {
            bookmarks.forEach(bookmark => addBookmarkToDOM(bookmark))
        })
}

// Add a bookmark to the DOM
function addBookmarkToDOM(bookmark) {
    const bookmarkList = document.getElementById('bookmark-list');
    const bookmarkItem = document.createElement('li');
    bookmarkItem.classList.add('bookamrk-item');
    bookmarkItem.setAttribute('data-id', bookmark.id);

    const url = document.createElement('span');
    console.log(bookmark.bookmark?.url);
    url.textContent = `${bookmark.url} (${bookmark.category})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => (deleteBookmark(bookmark.id)));

    bookmarkItem.appendChild(url);
    bookmarkItem.appendChild(deleteButton);

    bookmarkList.appendChild(bookmarkItem);

}

// Add a new bookmark
document.getElementById('add-bookmark-btn').addEventListener('click', () => {
    const urlInput = document.getElementById('bookmark-url');
    const categoryInput = document.getElementById('bookmark-category');

    const newBookmark = {url: urlInput.value, category: categoryInput.value};

    fetch(API_URL, {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(newBookmark),
    })
        .then(response => response.json())
        .then(bookmark => {
            addBookmarkToDOM(bookmark);
            urlInput.value = '';
            categoryInput.value = '';

        })
        .catch(error => console.log("Error adding bookmark: ", error));
});

// Delete a bookmark
function deleteBookmark(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            const bookmarkItem = document.querySelector(`[data-id='${id}']`);
            bookmarkItem.remove();
        })
        .catch(error => console.error('Error deleting bookmark:', error));
}
