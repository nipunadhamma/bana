fetch("Folderdata.json")

.then(response=>response.json())

.then(data=>{

const list=document.getElementById("authorList");

data.forEach(author=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<div class="left">

<span class="material-icons">

folder

</span>

<span class="name">

${author.name}

</span>

</div>

<span class="material-icons arrow">

chevron_right

</span>

`;

card.onclick=()=>{

location.href=author.folder+"index.html";

};

list.appendChild(card);

});

});
