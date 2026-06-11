// =======================
// 🎨 CORE CANVAS ENGINE
// =======================

window.APP = window.APP || {};

window.APP.canvas = null;

// =======================
// INIT CANVAS
// =======================
window.APP.initCanvas = function () {

    const canvasEl = document.getElementById("canvas");

    if (!canvasEl) {
        console.error("Canvas element not found!");
        return;
    }

    window.APP.canvas = new fabric.Canvas(canvasEl, {
        width: 800,
        height: 500,
        backgroundColor: "#ffffff",
        preserveObjectStacking: true
    });

    console.log("Canvas Initialized");

    window.APP.bindCanvasEvents();
};

// =======================
// GET CANVAS (SAFE ACCESS)
// =======================
window.getCanvas = function () {
    return window.APP.canvas;
};

// =======================
// NEW PROJECT / CLEAR
// =======================
window.newProject = function () {

    const canvas = getCanvas();
    if (!canvas) return;

    canvas.clear();
    canvas.setBackgroundColor("#ffffff", canvas.renderAll.bind(canvas));

    canvas.requestRenderAll();

    if (window.rebuildLayersFromCanvas) {
        window.rebuildLayersFromCanvas();
    }

    if (window.saveState) {
        window.saveState();
    }
};

// =======================
// RESIZE CANVAS
// =======================
window.resizeCanvas = function () {

    const canvas = getCanvas();
    if (!canvas) return;

    const w = parseInt(document.getElementById("canvasWidth").value);
    const h = parseInt(document.getElementById("canvasHeight").value);

    if (!w || !h) return;

    canvas.setWidth(w);
    canvas.setHeight(h);

    canvas.requestRenderAll();

    if (window.saveState) {
        window.saveState();
    }
};

// =======================
// CANVAS EVENTS
// =======================
window.APP.bindCanvasEvents = function () {

    const canvas = getCanvas();
    if (!canvas) return;

    // selection change
    canvas.on("selection:created", function (e) {
        window.APP.activeObject = e.selected?.[0] || null;
    });

    canvas.on("selection:updated", function (e) {
        window.APP.activeObject = e.selected?.[0] || null;
    });

    canvas.on("selection:cleared", function () {
        window.APP.activeObject = null;
    });

    // object modified (for history)
    canvas.on("object:modified", function () {
        if (window.saveState) {
            window.saveState();
        }

        if (window.updateLayers) {
            window.updateLayers();
        }
    });

    // object added
    canvas.on("object:added", function () {
        if (window.updateLayers) {
            window.updateLayers();
        }
    });
};
