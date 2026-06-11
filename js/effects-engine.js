// =======================
// ✨ EFFECTS ENGINE (PRO)
// =======================

window.APP = window.APP || {};

window.APP.effects = new Map();

// =======================
// GET ACTIVE OBJECT
// =======================
function getActive() {
    const canvas = getCanvas();
    if (!canvas) return null;
    return canvas.getActiveObject();
}

// =======================
// INIT EFFECT STORE
// =======================
function initEffects(obj) {
    if (!window.APP.effects.has(obj)) {
        window.APP.effects.set(obj, []);
    }
    return window.APP.effects.get(obj);
}

// =======================
// ADD EFFECT
// =======================
window.addEffect = function (type) {

    const obj = getActive();
    if (!obj) return;

    const list = initEffects(obj);

    const effect = {
        id: Date.now(),
        type: type,

        color: "#000000",
        blur: 10,
        opacity: 0.5,

        x: 5,
        y: 5,
        size: 10
    };

    list.push(effect);

    applyEffects(obj);
    renderEffectsPanel();
};

// =======================
// APPLY EFFECTS
// =======================
window.applyEffects = function (obj) {

    if (!obj) return;

    const effects = window.APP.effects.get(obj) || [];

    let filterList = [];

    effects.forEach((fx) => {

        switch (fx.type) {

            // ================= DROP SHADOW =================
            case "dropShadow":
                filterList.push(new fabric.Shadow({
                    color: fx.color,
                    blur: fx.blur,
                    offsetX: fx.x,
                    offsetY: fx.y
                }));
                break;

            // ================= BLUR =================
            case "blur":
                filterList.push(new fabric.Image.filters.Blur({
                    blur: fx.blur / 100
                }));
                break;

            // ================= OUTLINE (FAKE via shadow) =================
            case "stroke":
                filterList.push(new fabric.Shadow({
                    color: fx.color,
                    blur: 0,
                    offsetX: fx.size,
                    offsetY: fx.size
                }));
                break;

            // ================= GLOW =================
            case "glow":
                filterList.push(new fabric.Shadow({
                    color: fx.color,
                    blur: fx.blur,
                    offsetX: 0,
                    offsetY: 0
                }));
                break;
        }
    });

    obj.filters = obj.filters || [];
    obj.shadow = null;

    // apply (safe for text + shapes)
    obj.set("shadow", null);

    obj.__appliedEffects = filterList;

    obj.dirty = true;

    const canvas = getCanvas();
    canvas.requestRenderAll();
};

// =======================
// UPDATE EFFECTS LIVE
// =======================
window.updateEffect = function () {

    const obj = getActive();
    if (!obj) return;

    const list = window.APP.effects.get(obj);
    if (!list || list.length === 0) return;

    const fx = list[list.length - 1];

    fx.color = document.getElementById("fxColor").value;
    fx.blur = parseInt(document.getElementById("fxBlur").value || 0);
    fx.opacity = parseFloat(document.getElementById("fxOpacity").value || 1);
    fx.x = parseInt(document.getElementById("fxX").value || 0);
    fx.y = parseInt(document.getElementById("fxY").value || 0);

    applyEffects(obj);
};

// =======================
// DELETE LAST EFFECT
// =======================
window.deleteEffect = function () {

    const obj = getActive();
    if (!obj) return;

    const list = window.APP.effects.get(obj);
    if (!list || list.length === 0) return;

    list.pop();

    applyEffects(obj);
    renderEffectsPanel();
};

// =======================
// PANEL RENDER (UI LIST)
// =======================
window.renderEffectsPanel = function () {

    const obj = getActive();
    const box = document.getElementById("effectList");

    if (!box) return;

    box.innerHTML = "";

    if (!obj) return;

    const list = window.APP.effects.get(obj) || [];

    list.forEach((fx, i) => {

        const div = document.createElement("div");
        div.innerHTML = `
            <b>${fx.type}</b>
            <button onclick="deleteEffect()">X</button>
        `;

        box.appendChild(div);
    });
};
