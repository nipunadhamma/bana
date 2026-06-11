// =======================
// 🧱 LAYER SYSTEM (PRO)
// =======================

window.APP = window.APP || {};
window.APP.layers = [];

// =======================
// ADD LAYER
// =======================
window.addLayer = function (obj, name = "Layer") {

    const layer = {
        id: Date.now(),
        obj: obj,
        name: name,
        visible: true,
        locked: false
    };

    window.APP.layers.push(layer);
    updateLayers();
};

// =======================
// UPDATE LAYER PANEL
// =======================
window.updateLayers = function () {

    const list = document.getElementById("layerList");
    if (!list) return;

    list.innerHTML = "";

    window.APP.layers.forEach((layer, index) => {

        const div = document.createElement("div");
        div.className = "layer-item";
        div.innerHTML = `
            <span onclick="selectLayer(${layer.id})">
                ${layer.name}
            </span>

            <div class="layer-actions">
                <button onclick="toggleVisibility(${layer.id})">
                    ${layer.visible ? "👁" : "🚫"}
                </button>

                <button onclick="toggleLock(${layer.id})">
                    ${layer.locked ? "🔒" : "🔓"}
                </button>

                <button onclick="deleteLayer(${layer.id})">🗑</button>
            </div>
        `;

        list.appendChild(div);
    });
};

// =======================
// SELECT LAYER
// =======================
window.selectLayer = function (id) {

    const layer = window.APP.layers.find(l => l.id === id);
    if (!layer) return;

    const canvas = getCanvas();
    canvas.setActiveObject(layer.obj);
    canvas.requestRenderAll();
};

// =======================
// TOGGLE VISIBILITY
// =======================
window.toggleVisibility = function (id) {

    const layer = window.APP.layers.find(l => l.id === id);
    if (!layer) return;

    layer.visible = !layer.visible;
    layer.obj.visible = layer.visible;

    getCanvas().requestRenderAll();
    updateLayers();
};

// =======================
// TOGGLE LOCK
// =======================
window.toggleLock = function (id) {

    const layer = window.APP.layers.find(l => l.id === id);
    if (!layer) return;

    layer.locked = !layer.locked;

    layer.obj.selectable = !layer.locked;
    layer.obj.evented = !layer.locked;

    getCanvas().requestRenderAll();
    updateLayers();
};

// =======================
// DELETE LAYER
// =======================
window.deleteLayer = function (id) {

    const canvas = getCanvas();

    const index = window.APP.layers.findIndex(l => l.id === id);
    if (index === -1) return;

    const layer = window.APP.layers[index];

    canvas.remove(layer.obj);
    window.APP.layers.splice(index, 1);

    canvas.requestRenderAll();
    updateLayers();
};

// =======================
// BRING FRONT / BACK SUPPORT
// =======================
window.moveUp = function () {

    const obj = getCanvas().getActiveObject();
    if (!obj) return;

    getCanvas().bringForward(obj);
    syncLayerOrder();
};

window.moveDown = function () {

    const obj = getCanvas().getActiveObject();
    if (!obj) return;

    getCanvas().sendBackwards(obj);
    syncLayerOrder();
};

// =======================
// SYNC ORDER
// =======================
function syncLayerOrder() {

    const canvas = getCanvas();

    const objs = canvas.getObjects();

    // reverse for UI order
    window.APP.layers = objs.map((obj, i) => {
        return {
            id: obj.id || i,
            obj: obj,
            name: obj.type || "Layer",
            visible: obj.visible !== false,
            locked: !obj.selectable
        };
    });

    updateLayers();
}

// =======================
// AUTO SYNC ON EVENTS
// =======================
window.addEventListener("load", function () {

    const canvas = getCanvas();
    if (!canvas) return;

    canvas.on("object:added", function (e) {
        setTimeout(syncLayerOrder, 50);
    });

    canvas.on("object:removed", function (e) {
        setTimeout(syncLayerOrder, 50);
    });

    canvas.on("selection:created", function () {
        syncLayerOrder();
    });

    canvas.on("selection:updated", function () {
        syncLayerOrder();
    });
});
