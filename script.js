document.addEventListener("DOMContentLoaded", function() {
    const list = document.getElementById('list');

    // පරීක්ෂා කිරීම: list එක අඩවියේ තිබේද?
    if (!list) {
        console.error("Error: 'list' id එක HTML එකේ හොයාගන්න බැහැ.");
        return;
    }

    fetch('Folderdata.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("JSON ගොනුව කියවීමේ දෝෂයක්: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            list.innerHTML = ""; // පරණ දේවල් මකන්න
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'item';
                div.innerHTML = `📁 <a href="${item.path}">${item.name}</a>`;
                list.appendChild(div);
            });
        })
        .catch(error => {
            console.error("වැරැද්දක් සිදුවුණා:", error);
            list.innerHTML = "<p>දත්ත පූරණය කිරීමේ දෝෂයක් සිදුවිය.</p>";
        });
});
