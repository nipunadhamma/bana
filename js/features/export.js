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
