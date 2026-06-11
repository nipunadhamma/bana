// ===============================
// DRAG FLOATING PANELS
// ===============================

function makeDraggable(panelId, headerId) {

    const panel = document.getElementById(panelId);
    const header = document.getElementById(headerId);

    if (!panel || !header) return;

    let isDown = false;
    let offsetX, offsetY;

    header.onmousedown = function (e) {

        isDown = true;

        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;
    };

    document.onmouseup = function () {
        isDown = false;
    };

    document.onmousemove = function (e) {

        if (!isDown) return;

        panel.style.left = (e.clientX - offsetX) + "px";
        panel.style.top = (e.clientY - offsetY) + "px";
    };
}
