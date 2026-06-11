function makeDraggable(panelId, handleId) {

    const panel = document.getElementById(panelId);
    const handle = document.getElementById(handleId);

    let offsetX = 0;
    let offsetY = 0;
    let isDown = false;

    handle.addEventListener("mousedown", (e) => {
        isDown = true;
        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        panel.style.left = (e.clientX - offsetX) + "px";
        panel.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        isDown = false;
    });
}


// INIT
window.addEventListener("load", () => {

    makeDraggable("layersPanel", "dragLayers");
    makeDraggable("effectsPanel", "dragEffects");
    makeDraggable("gradientPanel", "dragGradient");
});
