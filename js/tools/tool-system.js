// ===============================
// TOOL SYSTEM (CLEAN PRO)
// ===============================

window.APP = window.APP || {};
window.APP.tool = "select";


// ===============================
// SET TOOL
// ===============================
window.setTool = function (tool) {

    if (!canvas) return;

    window.APP.tool = tool;

    canvas.isDrawingMode = false;
    canvas.selection = true;
    canvas.defaultCursor = "default";

    switch (tool) {

        case "move":
            canvas.selection = true;
            canvas.defaultCursor = "move";
            break;

        case "select":
            canvas.selection = true;
            canvas.defaultCursor = "default";
            break;

        case "brush":
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.width = 5;
            canvas.freeDrawingBrush.color = "#000";
            canvas.defaultCursor = "crosshair";
            break;

        case "eraser":
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.width = 20;
            canvas.freeDrawingBrush.color = "#ffffff";
            canvas.defaultCursor = "cell";
            break;
    }

    console.log("🎯 Tool Active:", tool);
};


// ===============================
// BRUSH COLOR CONTROL
// ===============================
window.setBrushColor = function (color) {

    if (!canvas || !canvas.freeDrawingBrush) return;

    canvas.freeDrawingBrush.color = color;
};


// ===============================
// BRUSH SIZE CONTROL
// ===============================
window.setBrushSize = function (size) {

    if (!canvas || !canvas.freeDrawingBrush) return;

    canvas.freeDrawingBrush.width = parseInt(size);
};


// ===============================
// ENABLE QUICK FUNCTIONS
// ===============================
window.enableBrush = function () {
    setTool("brush");
};

window.disableBrush = function () {
    setTool("select");
};

window.enableEraser = function () {
    setTool("eraser");
};
