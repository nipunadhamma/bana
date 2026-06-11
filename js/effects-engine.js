// ===============================
// EFFECTS ENGINE (CLEAN PRO)
// ===============================

window.APP = window.APP || {};
window.APP.effects = new Map();


// ===============================
// GET ACTIVE OBJECT
// ===============================
function getObj() {
    return canvas.getActiveObject();
}


// ===============================
// APPLY EFFECT CORE
// ===============================
function applyEffect(obj) {

    if (!obj) return;

    let fx = obj.effects || [];

    let shadow = null;

    fx.forEach(e => {

        // SHADOW
        if (e.type === "shadow") {
            shadow = new fabric.Shadow({
                color: e.color || "#000",
                blur: e.blur || 10,
                offsetX: e.x || 5,
                offsetY: e.y || 5
            });
        }

        // GLOW (simulated shadow)
        if (e.type === "glow") {
            shadow = new fabric.Shadow({
                color: e.color || "yellow",
                blur: e.blur || 20,
                offsetX: 0,
                offsetY: 0
            });
        }

        // OUTLINE (stroke simulation)
        if (e.type === "outline") {
            obj.set({
                stroke: e.color || "#000",
                strokeWidth: e.width || 2
            });
        }

        // BLUR
        if (e.type === "blur") {
            obj.filters = obj.filters || [];
            obj.filters.push(new fabric.Image.filters.Blur({
                blur: (e.blur || 0) / 100
            }));
            obj.applyFilters();
        }
    });

    if (shadow) {
        obj.set("shadow", shadow);
    }

    canvas.requestRenderAll();
}


// ===============================
// ADD EFFECT
// ===============================
window.addEffect = function (type) {

    const obj = getObj();
    if (!obj) return;

    obj.effects = obj.effects || [];

    let effect = {
        type: type,
        color: "#000",
        blur: 10,
        x: 5,
        y: 5,
        width: 2
    };

    // presets
    if (type === "glow") {
        effect.color = "yellow";
        effect.blur = 25;
        effect.x = 0;
        effect.y = 0;
    }

    if (type === "outline") {
        effect.color = "#000";
        effect.width = 3;
    }

    if (type === "blur") {
        effect.blur = 20;
    }

    obj.effects.push(effect);

    applyEffect(obj);
};


// ===============================
// UPDATE EFFECT (LIVE)
// ===============================
window.updateEffect = function () {

    const obj = getObj();
    if (!obj || !obj.effects || obj.effects.length === 0) return;

    let fx = obj.effects[obj.effects.length - 1];

    fx.color = document.getElementById("fxColor")?.value || fx.color;
    fx.blur = parseInt(document.getElementById("fxBlur")?.value || fx.blur);
    fx.opacity = parseFloat(document.getElementById("fxOpacity")?.value || 1);
    fx.x = parseInt(document.getElementById("fxX")?.value || fx.x);
    fx.y = parseInt(document.getElementById("fxY")?.value || fx.y);

    applyEffect(obj);
};


// ===============================
// DELETE EFFECT
// ===============================
window.deleteEffect = function () {

    const obj = getObj();
    if (!obj || !obj.effects) return;

    obj.effects.pop();

    obj.set("shadow", null);
    obj.filters = [];
    obj.applyFilters();

    applyEffect(obj);
};
