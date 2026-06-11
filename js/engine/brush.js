// ===============================
// BRUSH & ERASER ENGINE (CLEAN PRO)
// ===============================

window.APP = window.APP || {};
window.APP.brushMode = false;


// ===============================
// ENABLE BRUSH
// ===============================
window.enableBrush = function () {

    if (!canvas) return;

    window.APP.brushMode = true;

    canvas.isDrawingMode = true;

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = "#000000";
    canvas.freeDrawingBrush.width = 5;

    canvas.selection = false;

    console.log("🖌 Brush ON");
};


// ===============================
// DISABLE BRUSH
// ===============================
window.disableBrush = function () {

    if (!canvas) return;

    window.APP.brushMode = false;

    canvas.isDrawingMode = false;
    canvas.selection = true;

    console.log("🧭 Brush OFF");
};


// ===============================
// SET BRUSH COLOR
// ===============================
window.setBrushColor = function (color) {

    if (!canvas || !canvas.freeDrawingBrush) return;

    canvas.freeDrawingBrush.color = color;
};


// ===============================
// SET BRUSH SIZE
// ===============================
window.setBrushSize = function (size) {

    if (!canvas || !canvas.freeDrawingBrush) return;

    canvas.freeDrawingBrush.width = parseInt(size);
};


// ===============================
// ENABLE ERASER (REAL SIMULATION)
// ===============================
window.enableEraser = function () {

    if (!canvas) return;

    window.APP.brushMode = true;

    canvas.isDrawingMode = true;

    const eraser = new fabric.PencilBrush(canvas);

    // ⚠️ Fabric doesn't have real eraser in v5
    // so we simulate via background color clearing strategy
    eraser.color = "#ffffff";
    eraser.width = 20;

    canvas.freeDrawingBrush = eraser;

    canvas.selection = false;

    console.log("🧽 Eraser ON");
};


// ===============================
// SMART TOGGLE FIX
// ===============================
canvas?.on("path:created", function () {

    if (typeof saveState === "function") {
        saveState();
    }
});
