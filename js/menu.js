// =======================
// 🧭 MENU SYSTEM ENGINE
// =======================

window.menuAction = function (action) {

    const canvas = window.canvas;
    const obj = canvas?.getActiveObject();

    switch (action) {

        // FILE
        case "new":
            newProject();
            break;

        case "open":
            document.querySelector('input[type="file"]').click();
            break;

        case "save":
            saveProjectToFile();
            break;

        case "export":
            exportPNG();
            break;

        // EDIT
        case "undo":
            undo();
            break;

        case "redo":
            redo();
            break;

        case "copy":
            copyObject();
            break;

        case "paste":
            pasteObject();
            break;

        // IMAGE
        case "addImage":
            document.getElementById("imgUpload").click();
            break;

        case "crop":
            startCropMode();
            break;

        case "resize":
            resizeCanvas();
            break;

        // LAYER
        case "bringFront":
            bringFront();
            break;

        case "sendBack":
            sendBack();
            break;

        case "deleteLayer":
            if (obj) canvas.remove(obj);
            canvas.requestRenderAll();
            break;
    }
};
