// ===============================
// EXPORT ENGINE (CLEAN PRO)
// ===============================


// ===============================
// DOWNLOAD HELPER
// ===============================
function downloadDataURL(dataURL, filename) {

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = filename;
    link.click();
}


// ===============================
// EXPORT PNG
// ===============================
window.exportPNG = function () {

    if (!canvas) return;

    const dataURL = canvas.toDataURL({
        format: "png",
        multiplier: 2
    });

    downloadDataURL(dataURL, "design.png");
};


// ===============================
// EXPORT JPG
// ===============================
window.exportJPG = function () {

    if (!canvas) return;

    const dataURL = canvas.toDataURL({
        format: "jpeg",
        quality: 0.9,
        multiplier: 2
    });

    downloadDataURL(dataURL, "design.jpg");
};


// ===============================
// EXPORT WEBP
// ===============================
window.exportWEBP = function () {

    if (!canvas) return;

    const dataURL = canvas.toDataURL({
        format: "webp",
        quality: 0.9,
        multiplier: 2
    });

    downloadDataURL(dataURL, "design.webp");
};

window.exportPDF = function () {

    if (!canvas) return;

    const imgData = canvas.toDataURL({
        format: "png",
        multiplier: 2
    });

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("design.pdf");
};

// ===============================
// SAVE PROJECT (JSON FILE)
// ===============================
window.saveProjectToFile = function () {

    if (!canvas) return;

    const data = canvas.toJSON();

    const blob = new Blob([JSON.stringify(data)], {
        type: "application/json"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "project.json";
    link.click();
};

window.openProjectFromFile = function (event) {

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const json = JSON.parse(e.target.result);

        canvas.loadFromJSON(json, function () {
            canvas.renderAll();
            console.log("📂 Project Loaded");
        });
    };

    reader.readAsText(file);
};

window.saveState = function () {

    if (!canvas) return;

    const state = JSON.stringify(canvas.toJSON());

    localStorage.setItem("canva_autosave", state);
};


