// =======================
// ✂️ CROP ENGINE (PRO)
// =======================

window.APP = window.APP || {};

window.APP.crop = {
    target: null,
    box: null
};

// =======================
// START CROP MODE
// =======================
window.startCropMode = function () {

    const canvas = getCanvas();
    const img = canvas.getActiveObject();

    if (!img || img.type !== "image") {
        alert("Image එකක් select කරන්න");
        return;
    }

    window.APP.crop.target = img;

    // create crop box
    const box = new fabric.Rect({
        left: img.left,
        top: img.top,
        width: img.width * (img.scaleX || 1) * 0.5,
        height: img.height * (img.scaleY || 1) * 0.5,
        fill: "rgba(0,0,0,0.2)",
        stroke: "#00aaff",
        strokeWidth: 2,
        selectable: true,
        hasRotatingPoint: false
    });

    window.APP.crop.box = box;

    canvas.add(box);
    canvas.setActiveObject(box);
    canvas.bringToFront(box);

    canvas.requestRenderAll();
};

// =======================
// APPLY CROP
// =======================
window.applyCrop = function () {

    const canvas = getCanvas();
    const img = window.APP.crop.target;
    const box = window.APP.crop.box;

    if (!img || !box) {
        alert("Crop mode active නැහැ");
        return;
    }

    // image scale
    const scaleX = img.scaleX || 1;
    const scaleY = img.scaleY || 1;

    // crop values
    const cropX = (box.left - img.left) / scaleX;
    const cropY = (box.top - img.top) / scaleY;

    const cropW = (box.width * box.scaleX) / scaleX;
    const cropH = (box.height * box.scaleY) / scaleY;

    img.set({
        cropX: Math.max(0, cropX),
        cropY: Math.max(0, cropY),
        width: cropW,
        height: cropH
    });

    canvas.remove(box);

    window.APP.crop.box = null;
    window.APP.crop.target = null;

    canvas.setActiveObject(img);
    canvas.requestRenderAll();

    if (window.saveState) window.saveState();
};

// =======================
// RESET CROP
// =======================
window.resetCrop = function () {

    const canvas = getCanvas();
    const img = canvas.getActiveObject();

    if (!img || img.type !== "image") {
        alert("Image එකක් select කරන්න");
        return;
    }

    img.set({
        cropX: 0,
        cropY: 0
    });

    canvas.requestRenderAll();

    if (window.saveState) window.saveState();
};

// =======================
// CANCEL CROP
// =======================
window.cancelCrop = function () {

    const canvas = getCanvas();

    if (window.APP.crop.box) {
        canvas.remove(window.APP.crop.box);
    }

    window.APP.crop.box = null;
    window.APP.crop.target = null;

    canvas.requestRenderAll();
};
