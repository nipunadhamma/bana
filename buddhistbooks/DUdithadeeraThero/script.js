fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const listContainer = document.getElementById('file-list');
        data.forEach(file => {
            const div = document.createElement('div');
            div.className = 'item';
            div.innerHTML = `
                <span>${file.name} (${file.size})</span>
                <a href="${file.name}" download>බාගත කරන්න</a>
            `;
            listContainer.appendChild(div);
        });
    });
