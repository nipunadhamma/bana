pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs/pdf.worker.min.js";

const params = new URLSearchParams(location.search);

const file = params.get("file");

let pdfDoc = null;

let pageNum = 1;

let scale = 1.5;

const canvas = document.getElementById("pdfCanvas");

const ctx = canvas.getContext("2d");

function renderPage(num) {
  pdfDoc.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale });

    canvas.height = viewport.height;

    canvas.width = viewport.width;

    page.render({
      canvasContext: ctx,

      viewport,
    });

    document.getElementById("pageInfo").innerText =
      pageNum + " / " + pdfDoc.numPages;
  });
}

pdfjsLib.getDocument(file).promise.then((pdf) => {
  pdfDoc = pdf;

  renderPage(pageNum);
});

document.getElementById("next").onclick = () => {
  if (pageNum < pdfDoc.numPages) {
    pageNum++;

    renderPage(pageNum);
  }
};

document.getElementById("prev").onclick = () => {
  if (pageNum > 1) {
    pageNum--;

    renderPage(pageNum);
  }
};

document.getElementById("zoomIn").onclick = () => {
  scale += 0.25;

  renderPage(pageNum);
};

document.getElementById("zoomOut").onclick = () => {
  if (scale > 0.5) {
    scale -= 0.25;

    renderPage(pageNum);
  }
};

document.getElementById("download").onclick = () => {
  const a = document.createElement("a");

  a.href = file;

  a.download = "";

  a.click();
};
