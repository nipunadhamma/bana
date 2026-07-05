fetch("data.json")

.then(r=>r.json())

.then(data=>{

const list=document.getElementById("bookList");

data.forEach(book=>{

const div=document.createElement("div");

div.className="book";

div.innerHTML=`

<div class="left">

<span class="material-icons">

picture_as_pdf

</span>

<span class="title">

${book.title}

</span>

</div>

<div class="buttons">

<button class="view">View</button>

<button class="download">Download</button>

</div>

`;

div.querySelector(".view").onclick=()=>{

window.open(book.file,"_blank");

};

div.querySelector(".download").onclick=()=>{

const a=document.createElement("a");

a.href=book.file;

a.download="";

a.click();

};

list.appendChild(div);

});

});
