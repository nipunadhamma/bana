// ===============================
// TEXT ENGINE (CLEAN PRO)
// ===============================

window.addText = function () {

    if (!canvas) return;

    const text = new fabric.IText("Double Click to Edit", {
        left: 100,
        top: 100,
        fontSize: 30,
        fill: "#000",
        fontFamily: "Arial"
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();

    if (typeof updateLayers === "function") {
        updateLayers();
    }
};


// ===============================
// FONT CHANGE
// ===============================
window.setFont = function (font) {

    const obj = canvas.getActiveObject();
    if (!obj || obj.type !== "i-text") return;

    obj.set("fontFamily", font);
    canvas.renderAll();
};


// ===============================
// FONT SIZE
// ===============================
window.setFontSize = function (size) {

    const obj = canvas.getActiveObject();
    if (!obj) return;

    obj.set("fontSize", parseInt(size));
    canvas.renderAll();
};


// ===============================
// TEXT COLOR
// ===============================
window.setTextColor = function (color) {

    const obj = canvas.getActiveObject();
    if (!obj) return;

    obj.set("fill", color);
    canvas.renderAll();
};


// ===============================
// BOLD TOGGLE
// ===============================
window.toggleBold = function () {

    const obj = canvas.getActiveObject();
    if (!obj) return;

    const isBold = obj.fontWeight === "bold";
    obj.set("fontWeight", isBold ? "normal" : "bold");

    canvas.renderAll();
};


// ===============================
// ITALIC TOGGLE
// ===============================
window.toggleItalic = function () {

    const obj = canvas.getActiveObject();
    if (!obj) return;

    const isItalic = obj.fontStyle === "italic";
    obj.set("fontStyle", isItalic ? "normal" : "italic");

    canvas.renderAll();
};


// ===============================
// TEXT ALIGN
// ===============================
window.setTextAlign = function (align) {

    const obj = canvas.getActiveObject();
    if (!obj) return;

    obj.set("textAlign", align);
    canvas.renderAll();
};


// ===============================
// AUTO UPDATE ON EDIT
// ===============================
canvas?.on("object:modified", function () {
    if (typeof updateLayers === "function") {
        updateLayers();
    }
});
