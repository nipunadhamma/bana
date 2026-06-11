// ===============================
// MENU SYSTEM (CLEAN PRO COMMAND HUB)
// ===============================

window.APP = window.APP || {};


// ===============================
// MAIN ROUTER
// ===============================
window.menuAction = function (action) {

    console.log("📌 Menu Action:", action);

    switch (action) {

        // ================= FILE =================
        case "new":
            newProject();
            break;

        case "open":
            document.getElementById("importJSON")?.click();
            break;

        case "save":
            saveProjectToFile();
            break;

        case "export":
            exportPNG();
            break;


        // ================= EDIT =================
        case "undo":
            undo?.();
            break;

        case "redo":
            redo?.();
            break;

        case "copy":
            copyObject?.();
            break;

        case "paste":
            pasteObject?.();
            break;


        // ================= IMAGE =================
        case "addImage":
            document.getElementById("imgUpload")?.click();
            break;

        case "crop":
            startCropMode?.();
            break;

        case "resize":
            resizeCanvas?.();
            break;


        // ================= LAYER =================
        case "bringFront":
            bringFront?.();
            break;

        case "sendBack":
            sendBack?.();
            break;

        case "deleteLayer":
            const obj = canvas?.getActiveObject();
            if (obj) {
                canvas.remove(obj);
                canvas.renderAll();
            }
            break;


        // ================= EFFECTS =================
        case "shadow":
            addEffect?.("shadow");
            break;

        case "glow":
            addEffect?.("glow");
            break;

        case "outline":
            addEffect?.("outline");
            break;

        case "blur":
            addEffect?.("blur");
            break;


        default:
            console.warn("Unknown action:", action);
    }
};
