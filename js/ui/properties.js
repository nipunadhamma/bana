// ===============================
// LIVE PROPERTIES UPDATE
// ===============================

canvas?.on("selection:created", updateUI);
canvas?.on("selection:updated", updateUI);

function updateUI() {

    const obj = canvas.getActiveObject();
    if (!obj) return;

    // COLOR
    document.getElementById("colorPicker").value = obj.fill || "#000000";

    // FONT SIZE
    if (obj.fontSize) {
        document.getElementById("fontSize").value = obj.fontSize;
    }
}
