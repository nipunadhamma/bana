fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('container');
        
        function display(list) {
            container.innerHTML = list.map(item => `
                <div class="item">📁 <a href="${item.link}">${item.name}</a></div>
            `).join('');
        }

        display(data);

        // සෙවුම් පහසුකම
        document.getElementById('search').addEventListener('input', (e) => {
            const filtered = data.filter(i => i.name.includes(e.target.value));
            display(filtered);
        });
    });
