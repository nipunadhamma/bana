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
