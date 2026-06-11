// ===============================
// IMAGE ENGINE (CLEAN PRO)
// ===============================


// ===============================
// ADD IMAGE FROM FILE INPUT
// ===============================
window.uploadImage = function (event) {

    if (!canvas) return;

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        fabric.Image.fromURL(e.target.result, function (img) {

            img.set({
                left: 100,
                top: 100,
                scaleX: 0.5,
                scaleY: 0.5,
                selectable: true
            });

            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.renderAll();

            if (typeof updateLayers === "function") {
                updateLayers();
            }
        });
    };

    reader.readAsDataURL(file);
};


// ===============================
// ADD IMAGE FROM URL (OPTIONAL)
// ===============================
window.addImageFromURL = function (url) {

    if (!canvas) return;

    fabric.Image.fromURL(url, function (img) {

        img.set({
            left: 120,
            top: 120,
            scaleX: 0.6,
            scaleY: 0.6
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();

        if (typeof updateLayers === "function") {
            updateLayers();
        }
    });
};


// ===============================
// IMAGE SCALE CONTROL (ACTIVE OBJECT)
// ===============================
window.scaleImage = function (value) {

    const obj = canvas.getActiveObject();
    if (!obj || obj.type !== "image") return;

    obj.scale(parseFloat(value));
    canvas.renderAll();
};


// ===============================
// IMAGE ROTATE
// ===============================
window.rotateImage = function (angle) {

    const obj = canvas.getActiveObject();
    if (!obj || obj.type !== "image") return;

    obj.set("angle", parseInt(angle));
    canvas.renderAll();
};


// ===============================
// LOCK IMAGE POSITION
// ===============================
window.lockImage = function () {

    const obj = canvas.getActiveObject();
    if (!obj || obj.type !== "image") return;

    obj.set({
        lockMovementX: true,
        lockMovementY: true,
        selectable: false
    });

    canvas.renderAll();
};


// ===============================
// UNLOCK IMAGE
// ===============================
window.unlockImage = function () {

    const obj = canvas.getActiveObject();
    if (!obj || obj.type !== "image") return;

    obj.set({
        lockMovementX: false,
        lockMovementY: false,
        selectable: true
    });

    canvas.renderAll();
};
