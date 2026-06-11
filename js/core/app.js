// ===============================
// APP CORE (FINAL STABLE LAYER)
// ===============================

window.APP = window.APP || {};

window.addEventListener("load", function () {

    console.log("🚀 Canva Mini PRO Loaded");

    // init canvas
    if (typeof initCanvas === "function") {
        initCanvas();
    }

    // restore autosave (optional)
    try {
        const saved = localStorage.getItem("canva_autosave");
        if (saved && canvas) {
            canvas.loadFromJSON(saved, function () {
                canvas.renderAll();
                console.log("♻ Autosave restored");
            });
        }
    } catch (e) {
        console.warn("Autosave restore failed");
    }

});

// ===============================
// SAFE CALL HELPER (NO CRASH ZONE)
// ===============================

window.safeCall = function (fn, ...args) {

    try {
        if (typeof fn === "function") {
            return fn(...args);
        }
    } catch (e) {
        console.error("⚠ Error:", e);
    }
};

// ===============================
// CANVAS SAFE CHECK SYSTEM
// ===============================

function getCanvasSafe() {

    if (!window.canvas) {
        console.warn("Canvas not ready");
        return null;
    }

    return window.canvas;
}
// ===============================
// GLOBAL ERROR CATCHER
// ===============================

window.addEventListener("error", function (e) {
    console.error("💥 System Error:", e.message);
});

// ===============================
// FINAL SYNC (LAYERS + CANVAS)
// ===============================

function fullSync() {

    if (!canvas) return;

    canvas.renderAll();

    if (typeof updateLayers === "function") {
        updateLayers();
    }
}
