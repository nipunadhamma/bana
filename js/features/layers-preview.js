// ===============================
// LAYER PREVIEW SYSTEM
// ===============================

window.updateLayerPreview = function () {

    const list = document.getElementById("layerList");
    if (!list) return;

    list.innerHTML = "";

    canvas.getObjects().forEach((obj, i) => {

        const item = document.createElement("div");
        item.className = "layer-item";

        item.innerHTML = `
            <span>Layer ${i + 1} (${obj.type})</span>
        `;

        item.onclick = function () {
            canvas.setActiveObject(obj);
        };

        list.appendChild(item);
    });
};
