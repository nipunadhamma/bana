// ===============================
// PERFORMANCE OPTIMIZER
// ===============================

function optimizeCanvas() {

    if (!canvas) return;

    canvas.renderOnAddRemove = true;
    canvas.skipTargetFind = false;

    canvas.selection = true;

    console.log("⚡ Performance optimized");
}

window.optimizeCanvas = optimizeCanvas;
// ===============================
// AUTO SAVE SAFE SYSTEM
// ===============================

let autoSaveTimer = null;

function safeAutoSave() {

    clearTimeout(autoSaveTimer);

    autoSaveTimer = setTimeout(() => {

        try {
            const data = canvas.toJSON();
            localStorage.setItem("canva_autosave", JSON.stringify(data));
            console.log("💾 AutoSaved");
        } catch (e) {
            console.warn("AutoSave failed");
        }

    }, 2000);
}

// trigger on changes
canvas?.on("object:modified", safeAutoSave);
canvas?.on("object:added", safeAutoSave);
canvas?.on("object:removed", safeAutoSave);

// ===============================
// FINAL INIT SAFETY
// ===============================

window.addEventListener("load", function () {

    if (!window.canvas) {
        console.warn("Canvas not ready yet");
        return;
    }

    optimizeCanvas?.();

    console.log("🚀 FINAL SYSTEM READY");
});

