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

// =======================
// 🎨 EFFECTS ENGINE (PRO FIX)
// =======================

window.APP = window.APP || {};
window.APP.effects = {};

// =======================
// APPLY EFFECTS MAIN
// =======================
window.applyEffects = function (obj) {

    if (!obj) return;

    obj.set("shadow", null);
    obj.filters = obj.filters || [];

    let shadow = null;

    if (!obj.effects) obj.effects = [];

    obj.effects.forEach(effect => {

        // ================= SHADOW =================
        if (effect.type === "shadow") {
            shadow = new fabric.Shadow({
                color: effect.color || "black",
                blur: effect.blur || 10,
                offsetX: effect.x || 5,
                offsetY: effect.y || 5
            });
        }

        // ================= GLOW =================
        if (effect.type === "glow") {
            shadow = new fabric.Shadow({
                color: effect.color || "yellow",
                blur: effect.blur || 20,
                offsetX: 0,
                offsetY: 0
            });
        }

        // ================= OUTLINE (fake via stroke) =================
        if (effect.type === "outline") {
            obj.set({
                stroke: effect.color || "#000",
                strokeWidth: effect.width || 2
            });
        }

        // ================= BLUR =================
        if (effect.type === "blur") {
            obj.filters.push(
                new fabric.Image.filters.Blur({
                    blur: (effect.blur || 0) / 100
                })
            );
        }

        // ================= DROP SHADOW =================
        if (effect.type === "dropShadow") {
            shadow = new fabric.Shadow({
                color: effect.color || "#000",
                blur: effect.blur || 15,
                offsetX: effect.x || 10,
                offsetY: effect.y || 10
            });
        }

        // ================= INNER SHADOW (fake trick) =================
        if (effect.type === "innerShadow") {
            shadow = new fabric.Shadow({
                color: effect.color || "black",
                blur: effect.blur || 10,
                offsetX: -effect.x || -5,
                offsetY: -effect.y || -5
            });
        }

        // ================= NEON =================
        if (effect.type === "neon") {
            shadow = new fabric.Shadow({
                color: effect.color || "#00ffff",
                blur: effect.blur || 25,
                offsetX: 0,
                offsetY: 0
            });
        }
    });

    if (shadow) {
        obj.set("shadow", shadow);
    }

    obj.setCoords();
    canvas.requestRenderAll();
};

// =======================
// ADD EFFECT
// =======================
window.addEffect = function (type) {

    const obj = canvas.getActiveObject();
    if (!obj) return;

    if (!obj.effects) obj.effects = [];

    let effect = null;

    switch (type) {

        case "shadow":
            effect = { type: "shadow", color: "#000", blur: 10, x: 5, y: 5 };
            break;

        case "glow":
            effect = { type: "glow", color: "#ffff00", blur: 20 };
            break;

        case "outline":
            effect = { type: "outline", color: "#000", width: 2 };
            break;

        case "blur":
            effect = { type: "blur", blur: 20 };
            break;

        case "dropShadow":
            effect = { type: "dropShadow", color: "#000", blur: 15, x: 10, y: 10 };
            break;

        case "innerShadow":
            effect = { type: "innerShadow", color: "#000", blur: 10, x: 5, y: 5 };
            break;

        case "neon":
            effect = { type: "neon", color: "#00ffff", blur: 25 };
            break;

        case "stroke":
            effect = { type: "outline", color: "#000", width: 3 };
            break;

        case "gradientGlow":
            effect = { type: "glow", color: "#ff00ff", blur: 30 };
            break;

        case "threeD":
            effect = { type: "shadow", color: "#333", blur: 5, x: 8, y: 8 };
            break;
    }

    if (effect) {
        obj.effects.push(effect);
    }

    applyEffects(obj);
};

// =======================
// UPDATE EFFECT (LIVE CONTROL)
// =======================
window.updateEffect = function () {

    const obj = canvas.getActiveObject();
    if (!obj || !obj.effects || obj.effects.length === 0) return;

    const fx = obj.effects[obj.effects.length - 1];

    fx.color = document.getElementById("fxColor")?.value || fx.color;
    fx.blur = parseInt(document.getElementById("fxBlur")?.value || fx.blur);
    fx.opacity = parseFloat(document.getElementById("fxOpacity")?.value || fx.opacity);
    fx.x = parseInt(document.getElementById("fxX")?.value || fx.x);
    fx.y = parseInt(document.getElementById("fxY")?.value || fx.y);

    applyEffects(obj);
};

// =======================
// DELETE LAST EFFECT
// =======================
window.deleteEffect = function () {

    const obj = canvas.getActiveObject();
    if (!obj || !obj.effects) return;

    obj.effects.pop();

    applyEffects(obj);
};
