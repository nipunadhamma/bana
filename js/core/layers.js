// ===============================
// LAYER SYSTEM (CLEAN PRO)
// ===============================

window.APP = window.APP || {};
window.APP.layers = [];


// ===============================
// UPDATE LAYER LIST
// ===============================
window.updateLayers = function () {

    const list = document.getElementById("layerList");
    if (!list || !canvas) return;

    list.innerHTML = "";

    const objects = canvas.getObjects();

    objects.forEach((obj, index) => {

        const div = document.createElement("div");
        div.className = "layer-item";

        div.innerHTML = `
            <span>${obj.type}</span>
            <button onclick="selectLayer(${index})">Select</button>
            <button onclick="deleteLayer(${index})">Delete</button>
        `;

        list.appendChild(div);
    });
};


// ===============================
// SELECT LAYER
// ===============================
window.selectLayer = function (index) {

    const obj = canvas.getObjects()[index];
    if (!obj) return;

    canvas.setActiveObject(obj);
    canvas.renderAll();
};


// ===============================
// DELETE LAYER
// ===============================
window.deleteLayer = function (index) {

    const obj = canvas.getObjects()[index];
    if (!obj) return;

    canvas.remove(obj);
    updateLayers();
};


// ===============================
// MOVE LAYER UP
// ===============================
window.moveUp = function () {

    const obj = canvas.getActiveObject();
    if (!obj) return;

    canvas.bringForward(obj);
    canvas.renderAll();
    updateLayers();
};


// ===============================
// MOVE LAYER DOWN
// ===============================
window.moveDown = function () {

    const obj = canvas.getActiveObject();
    if (!obj) return;

    canvas.sendBackwards(obj);
    canvas.renderAll();
    updateLayers();
};


// ===============================
// AUTO SYNC WITH CANVAS
// ===============================
if (canvas) {

    canvas.on("object:added", updateLayers);
    canvas.on("object:removed", updateLayers);
    canvas.on("selection:created", updateLayers);
    canvas.on("selection:updated", updateLayers);
}
