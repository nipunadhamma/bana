// =======================
// 🎨 PRO LAYER ENGINE
// =======================

window.APP = window.APP || {};

window.APP.layers = [];

// =======================
// ADD LAYER
// =======================
window.addLayer = function (obj, name = "Layer") {

    if (!obj) return;

    const exists = window.APP.layers.find(l => l.obj === obj);
    if (exists) return;

    const layer = {
        id: Date.now(),
        obj: obj,
        name: name,
        visible: true,
        locked: false
    };

    window.APP.layers.push(layer);

    window.updateLayers();
};

// =======================
// UPDATE LAYER UI
// =======================
window.updateLayers = function () {

    const list = document.getElementById("layerList");
    const canvas = getCanvas();

    if (!list || !canvas) return;

    list.innerHTML = "";

    // reverse = top layer first
    [...window.APP.layers].reverse().forEach((layer) => {

        const div = document.createElement("div");
        div.className = "layerItem";

        div.innerHTML = `
            <span class="layer-name">${layer.name}</span>
            <button class="btn-eye">${layer.visible ? "👁" : "🚫"}</button>
            <button class="btn-lock">${layer.locked ? "🔒" : "🔓"}</button>
            <button class="btn-del">🗑</button>
        `;

        // =======================
        // SELECT LAYER
        // =======================
        div.onclick = function (e) {
            if (e.target.tagName === "BUTTON") return;

            if (layer.locked) return;

            canvas.setActiveObject(layer.obj);
            canvas.requestRenderAll();
        };

        // =======================
        // TOGGLE VISIBILITY
        // =======================
        div.querySelector(".btn-eye").onclick = function (e) {
            e.stopPropagation();

            layer.visible = !layer.visible;
            layer.obj.visible = layer.visible;

            canvas.requestRenderAll();
            window.updateLayers();
        };

        // =======================
        // LOCK / UNLOCK
        // =======================
        div.querySelector(".btn-lock").onclick = function (e) {
            e.stopPropagation();

            layer.locked = !layer.locked;

            layer.obj.selectable = !layer.locked;
            layer.obj.evented = !layer.locked;
            layer.obj.lockMovementX = layer.locked;
            layer.obj.lockMovementY = layer.locked;

            canvas.requestRenderAll();
            window.updateLayers();
        };

        // =======================
        // DELETE
        // =======================
        div.querySelector(".btn-del").onclick = function (e) {
            e.stopPropagation();

            canvas.remove(layer.obj);

            window.APP.layers = window.APP.layers.filter(l => l.obj !== layer.obj);

            canvas.requestRenderAll();
            window.updateLayers();

            if (window.saveState) window.saveState();
        };

        list.appendChild(div);
    });
};

// =======================
// REBUILD FROM CANVAS (FIX BUGS)
// =======================
window.rebuildLayersFromCanvas = function () {

    const canvas = getCanvas();
    if (!canvas) return;

    window.APP.layers = canvas.getObjects().map((obj, index) => {

        return {
            id: Date.now() + index,
            obj: obj,
            name: obj.name || obj.type || "Layer",
            visible: obj.visible !== false,
            locked: obj.lockMovementX === true
        };
    });

    window.updateLayers();
};

// =======================
// MOVE UP
// =======================
window.moveUp = function () {

    const canvas = getCanvas();
    const active = canvas.getActiveObject();

    if (!active) return;

    canvas.bringForward(active);
    canvas.requestRenderAll();

    window.rebuildLayersFromCanvas();

    if (window.saveState) window.saveState();
};

// =======================
// MOVE DOWN
// =======================
window.moveDown = function () {

    const canvas = getCanvas();
    const active = canvas.getActiveObject();

    if (!active) return;

    canvas.sendBackwards(active);
    canvas.requestRenderAll();

    window.rebuildLayersFromCanvas();

    if (window.saveState) window.saveState();
};
