// ===============================
// SNAP SYSTEM (ALIGN GUIDES)
// ===============================

window.enableSnap = true;

canvas?.on("object:moving", function (e) {

    if (!window.enableSnap) return;

    const obj = e.target;

    const grid = 10;

    obj.set({
        left: Math.round(obj.left / grid) * grid,
        top: Math.round(obj.top / grid) * grid
    });
});
