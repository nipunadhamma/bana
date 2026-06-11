// =======================
// 🎨 GRADIENT ENGINE (PRO VERSION 1)
// =======================

window.APP = window.APP || {};

window.APP.gradient = {
    type: "linear",
    angle: 0,
    color1: "#ff0000",
    color2: "#0000ff"
};

// =======================
// APPLY GRADIENT
// =======================
window.applyGradient = function () {

    const canvas = getCanvas();
    const obj = canvas.getActiveObject();

    if (!obj) return;

    const g = window.APP.gradient;

    let x2 = obj.width;
    let y2 = 0;

    // angle convert (simple version)
    const rad = (g.angle * Math.PI) / 180;

    x2 = Math.cos(rad) * obj.width;
    y2 = Math.sin(rad) * obj.height;

    obj.set("fill", new fabric.Gradient({

        type: g.type,

        gradientUnits: "pixels",

        coords: {
            x1: 0,
            y1: 0,
            x2: x2,
            y2: y2
        },

        colorStops: [
            {
                offset: 0,
                color: g.color1
            },
            {
                offset: 1,
                color: g.color2
            }
        ]
    }));

    canvas.requestRenderAll();

    if (window.saveState) window.saveState();
};

// =======================
// UPDATE COLOR 1
// =======================
window.setGradientColor1 = function (color) {

    window.APP.gradient.color1 = color;

    window.applyGradient();
};

// =======================
// UPDATE COLOR 2
// =======================
window.setGradientColor2 = function (color) {

    window.APP.gradient.color2 = color;

    window.applyGradient();
};

// =======================
// SET ANGLE
// =======================
window.setGradientAngle = function (angle) {

    window.APP.gradient.angle = angle;

    window.applyGradient();
};

// =======================
// SWITCH TYPE
// =======================
window.setGradientType = function (type) {

    window.APP.gradient.type = type;

    window.applyGradient();
};
