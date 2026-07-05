pdfjsLib.GlobalWorkerOptions.workerSrc =
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const params = new URLSearchParams(location.search);
let file = params.get("file");

let pdfDoc = null;
let pageNum = 1;
let scale = 1.5;

const canvas = document.getElementById("pdfCanvas");
const ctx = canvas.getContext("2d");

function renderPage(num){
pdfDoc.getPage(num).then(page=>{
const viewport = page.getViewport({scale});
canvas.height = viewport.height;
canvas.width = viewport.width;

page.render({canvasContext:ctx, viewport});

document.getElementById("pageInfo").innerText =
num + " / " + pdfDoc.numPages;

saveLastPage(num);
});
}

pdfjsLib.getDocument(file).promise.then(pdf=>{
pdfDoc = pdf;
renderPage(pageNum);
loadSidebar();
});

function loadSidebar(){
let sidebar = document.getElementById("sidebar");
sidebar.innerHTML = "";

for(let i=1;i<=pdfDoc.numPages;i++){
let div = document.createElement("div");
div.innerText = "Page " + i;

div.onclick = ()=>{
pageNum = i;
renderPage(pageNum);
};

sidebar.appendChild(div);
}
}

document.getElementById("next").onclick=()=>{
if(pageNum < pdfDoc.numPages){
pageNum++;
renderPage(pageNum);
}
};

document.getElementById("prev").onclick=()=>{
if(pageNum > 1){
pageNum--;
renderPage(pageNum);
}
};

document.getElementById("zoomIn").onclick=()=>{
scale += 0.2;
renderPage(pageNum);
};

document.getElementById("zoomOut").onclick=()=>{
if(scale > 0.6){
scale -= 0.2;
renderPage(pageNum);
}
};

document.getElementById("download").onclick=()=>{
let a=document.createElement("a");
a.href=file;
a.download="";
a.click();
};

// 🔗 SHARE BUTTON (FB + link copy)

document.getElementById("share").onclick = () => {

let url = window.location.href;

// copy link
navigator.clipboard.writeText(url);

// facebook share
window.open(
"https://www.facebook.com/sharer/sharer.php?u=" +
encodeURIComponent(url),
"_blank"
);

alert("Link copied & Facebook opened!");
};

// DARK MODE

document.getElementById("theme").onclick=()=>{
  document.body.classList.toggle("dark");
};

// SAVE LAST PAGE

function saveLastPage(p){
localStorage.setItem(file+"_page", p);
}

function loadLastPage(){
let p = localStorage.getItem(file+"_page");
return p ? parseInt(p) : 1;
}
