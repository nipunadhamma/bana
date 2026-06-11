// ===============================
// PSD EXPORT (SIMULATED STRUCTURE)
// ===============================

window.exportPSD = function () {

    const data = {
        version: "1.0",
        width: canvas.width,
        height: canvas.height,
        layers: canvas.getObjects().map(obj => ({
            type: obj.type,
            left: obj.left,
            top: obj.top,
            width: obj.width,
            height: obj.height,
            fill: obj.fill
        }))
    };

    const blob = new Blob([JSON.stringify(data)], {
        type: "application/json"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "design.psd.json";
    link.click();
};
