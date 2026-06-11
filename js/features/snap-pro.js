// ===============================
// SMART SNAP ENGINE
// ===============================

canvas.on("object:moving", function (e) {

    const obj = e.target;
    const threshold = 10;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // SNAP CENTER X
    if (Math.abs(obj.left - centerX) < threshold) {
        obj.left = centerX;
    }

    // SNAP CENTER Y
    if (Math.abs(obj.top - centerY) < threshold) {
        obj.top = centerY;
    }
});
