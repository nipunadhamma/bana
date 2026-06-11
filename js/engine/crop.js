// ===============================
// CROP ENGINE (CLEAN PRO)
// ===============================

window.APP = window.APP || {};
window.APP.cropTarget = null;
window.APP.cropBox = null;


// ===============================
// START CROP MODE
// ===============================
window.startCropMode = function () {

    const img = canvas.getActiveObject();

    if (!img || img.type !== "image") {
        alert("Image එකක් select කරන්න");
        return;
    }

    window.APP.cropTarget = img;

    const cropBox = new fabric.Rect({
        left: img.left,
        top: img.top,
        width: img.width * img.scaleX * 0.5,
        height: img.height * img.scaleY * 0.5,
        fill: "rgba(0,0,0,0.2)",
        stroke: "#00aaff",
        strokeWidth: 2,
        hasControls: true,
        selectable: true
    });

    window.APP.cropBox = cropBox;

    canvas.add(cropBox);
    canvas.setActiveObject(cropBox);
    canvas.renderAll();

    console.log("✂ Crop Mode ON");
};


// ===============================
// APPLY CROP (REAL IMAGE CROP)
// ===============================
window.applyCrop = function () {

    const img = window.APP.cropTarget;
    const box = window.APP.cropBox;

    if (!img || !box) return;

    const scaleX = img.scaleX;
    const scaleY = img.scaleY;

    const cropX = (box.left - img.left) / scaleX;
    const cropY = (box.top - img.top) / scaleY;

    const cropWidth = (box.width * box.scaleX) / scaleX;
    const cropHeight = (box.height * box.scaleY) / scaleY;

    img.set({
        cropX: cropX > 0 ? cropX : 0,
        cropY: cropY > 0 ? cropY : 0,
        width: cropWidth,
        height: cropHeight
    });

    img.set({
        scaleX: 1,
        scaleY: 1
    });

    canvas.remove(box);

    window.APP.cropBox = null;
    window.APP.cropTarget = null;

    canvas.setActiveObject(img);
    canvas.renderAll();

    console.log("✅ Crop Applied");
};


// ===============================
// RESET CROP
// ===============================
window.resetCrop = function () {

    const img = canvas.getActiveObject();

    if (!img || img.type !== "image") return;

    img.set({
        cropX: 0,
        cropY: 0,
        scaleX: 1,
        scaleY: 1
    });

    canvas.renderAll();

    console.log("🔄 Crop Reset");
};


// ===============================
// CANCEL CROP
// ===============================
window.cancelCrop = function () {

    if (window.APP.cropBox) {
        canvas.remove(window.APP.cropBox);
    }

    window.APP.cropBox = null;
    window.APP.cropTarget = null;

    canvas.renderAll();

    console.log("❌ Crop Cancelled");
};
