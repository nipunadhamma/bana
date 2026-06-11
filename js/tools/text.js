// =======================
// ✏️ TEXT ENGINE (PRO)
// =======================

window.APP = window.APP || {};

// =======================
// ADD TEXT
// =======================
window.addText = function () {

    const canvas = getCanvas();
    if (!canvas) return;

    const text = new fabric.Textbox("Double click to edit", {
        left: 100,
        top: 100,
        width: 250,

        fontSize: 30,
        fontFamily: "Arial",
        fill: "#000000",

        editable: true,
        hasControls: true,
        lockScalingFlip: true
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();

    if (window.addLayer) {
        addLayer(text, "Text");
    }

    if (window.saveState) {
        saveState();
    }
};

// =======================
// UPDATE FONT FAMILY
// =======================
window.setFontFamily = function (font) {

    const obj = getCanvas().getActiveObject();
    if (!obj || obj.type !== "textbox") return;

    obj.set("fontFamily", font);
    getCanvas().requestRenderAll();
};

// =======================
// UPDATE FONT SIZE
// =======================
window.setFontSize = function (size) {

    const obj = getCanvas().getActiveObject();
    if (!obj || obj.type !== "textbox") return;

    obj.set("fontSize", parseInt(size));
    getCanvas().requestRenderAll();
};

// =======================
// CHANGE COLOR
// =======================
window.setTextColor = function (color) {

    const obj = getCanvas().getActiveObject();
    if (!obj || obj.type !== "textbox") return;

    obj.set("fill", color);
    getCanvas().requestRenderAll();
};

// =======================
// BOLD TOGGLE
// =======================
window.toggleBold = function () {

    const obj = getCanvas().getActiveObject();
    if (!obj || obj.type !== "textbox") return;

    const isBold = obj.fontWeight === "bold";
    obj.set("fontWeight", isBold ? "normal" : "bold");

    getCanvas().requestRenderAll();
};

// =======================
// ITALIC TOGGLE
// =======================
window.toggleItalic = function () {

    const obj = getCanvas().getActiveObject();
    if (!obj || obj.type !== "textbox") return;

    const isItalic = obj.fontStyle === "italic";
    obj.set("fontStyle", isItalic ? "normal" : "italic");

    getCanvas().requestRenderAll();
};

// =======================
// TEXT ALIGN
// =======================
window.setTextAlign = function (align) {

    const obj = getCanvas().getActiveObject();
    if (!obj || obj.type !== "textbox") return;

    obj.set("textAlign", align);

    getCanvas().requestRenderAll();
};
