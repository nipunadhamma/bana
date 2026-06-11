// =======================
// 🖌 BRUSH ENGINE (PRO)
// =======================

window.APP = window.APP || {};

window.APP.brush = {
    color: "#000000",
    size: 5,
    isEraser: false
};

// =======================
// ENABLE BRUSH
// =======================
window.enableBrush = function () {

    const canvas = getCanvas();
    if (!canvas) return;

    canvas.isDrawingMode = true;

    canvas.freeDrawingBrush.color = window.APP.brush.color;
    canvas.freeDrawingBrush.width = window.APP.brush.size;

    window.APP.brush.isEraser = false;
};

// =======================
// DISABLE BRUSH
// =======================
window.disableBrush = function () {

    const canvas = getCanvas();
    if (!canvas) return;

    canvas.isDrawingMode = false;
};

// =======================
// SET BRUSH COLOR
// =======================
window.setBrushColor = function (color) {

    const canvas = getCanvas();
    if (!canvas) return;

    window.APP.brush.color = color;

    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = color;
    }
};

// =======================
// SET BRUSH SIZE
// =======================
window.setBrushSize = function (size) {

    const canvas = getCanvas();
    if (!canvas) return;

    window.APP.brush.size = size;

    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = size;
    }
};

// =======================
// ENABLE ERASER
// =======================
window.enableEraser = function () {

    const canvas = getCanvas();
    if (!canvas) return;

    canvas.isDrawingMode = true;

    // fake eraser (white brush)
    canvas.freeDrawingBrush.color = "#ffffff";
    canvas.freeDrawingBrush.width = 20;

    window.APP.brush.isEraser = true;
};
