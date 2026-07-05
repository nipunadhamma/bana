fetch('Folderdata.json')
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById('list');
        data.forEach(item => {
            // කතුවරයාගේ නම ක්ලික් කළ විට අදාළ index.html එක විවෘත වේ
            list.innerHTML += `<div class="item">📁 <a href="${item.path}">${item.name}</a></div>`;
        });
    });
