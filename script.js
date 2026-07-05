// මුල් පිටුවේ ෆෝල්ඩර පෙන්වීමට
function loadFolders() {
    fetch('Folderdata.json')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('list');
            Object.keys(data).forEach(author => {
                list.innerHTML += `<div class="item" onclick="showBooks('${author}')">📁 ${author}</div>`;
            });
        });
}

// පොත් ලැයිස්තුව පෙන්වීමට
function showBooks(author) {
    fetch('Folderdata.json')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('list');
            list.innerHTML = `<button onclick="location.reload()">ආපසු</button>`; // මුල් පිටුවට යාමට
            data[author].forEach(book => {
                list.innerHTML += `<div class="item">📄 ${book.name} <a href="${book.file}" download>Download</a></div>`;
            });
        });
}
