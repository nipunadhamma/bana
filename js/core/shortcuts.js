// ===============================
// KEYBOARD SHORTCUTS (PRO)
// ===============================

document.addEventListener("keydown", function (e) {

    // CTRL + Z (UNDO)
    if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo?.();
    }

    // CTRL + Y (REDO)
    if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo?.();
    }

    // CTRL + C (COPY)
    if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        copyObject?.();
    }

    // CTRL + V (PASTE)
    if (e.ctrlKey && e.key === "v") {
        e.preventDefault();
        pasteObject?.();
    }

    // DELETE KEY
    if (e.key === "Delete") {
        const obj = canvas?.getActiveObject();
        if (obj) {
            canvas.remove(obj);
            canvas.renderAll();
        }
    }
});
