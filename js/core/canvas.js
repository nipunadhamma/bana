// ===============================
// CANVAS CORE ENGINE (CLEAN)
// ===============================

window.canvas = null;

// ===============================
// INIT CANVAS
// ===============================
window.initCanvas = function () {

    window.canvas = new fabric.Canvas("canvas", {
        width: 800,
        height: 500,
        backgroundColor: "#ffffff",
        preserveObjectStacking: true
    });

    bindCanvasEvents();

    console.log("✅ Canvas Initialized");
};


// ===============================
// EVENTS
// ===============================
function bindCanvasEvents() {

    canvas.on("selection:created", updateActiveObject);
    canvas.on("selection:updated", updateActiveObject);
    canvas.on("selection:cleared", clearActiveObject);

    canvas.on("object:modified", saveState);
    canvas.on("object:added", saveState);
    canvas.on("object:removed", saveState);
}


// ===============================
// ACTIVE OBJECT
// ===============================
window.APP = window.APP || {};
window.APP.activeObject = null;

function updateActiveObject(e) {
    window.APP.activeObject = e.selected ? e.selected[0] : null;
}

function clearActiveObject() {
    window.APP.activeObject = null;
}


// ===============================
// CREATE PROJECT
// ===============================
window.newProject = function (w = 800, h = 500) {

    if (!canvas) return;

    canvas.clear();
    canvas.setWidth(w);
    canvas.setHeight(h);
    canvas.backgroundColor = "#ffffff";

    canvas.renderAll();

    window.historyStack = [];
    window.redoStack = [];

    saveState();

    console.log("🆕 New Project Created");
};


// ===============================
// RESIZE CANVAS
// ===============================
window.resizeCanvas = function (w, h) {

    if (!canvas) return;

    canvas.setWidth(w);
    canvas.setHeight(h);
    canvas.renderAll();

    saveState();
};


// ===============================
// GET ACTIVE OBJECT SAFE
// ===============================
window.getActiveObject = function () {
    return canvas ? canvas.getActiveObject() : null;
};
