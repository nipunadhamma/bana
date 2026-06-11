// ===============================
// CONTEXT MENU SYSTEM
// ===============================

const menu = document.createElement("div");
menu.id = "contextMenu";
menu.style.position = "absolute";
menu.style.display = "none";
menu.style.background = "#222";
menu.style.color = "#fff";
menu.style.padding = "10px";
menu.style.borderRadius = "6px";
menu.style.zIndex = 9999;

menu.innerHTML = `
    <div onclick="bringFront()">Bring Front</div>
    <div onclick="sendBack()">Send Back</div>
    <div onclick="deleteSelected()">Delete</div>
`;

document.body.appendChild(menu);


// SHOW MENU
canvas?.on("mouse:down", function (opt) {

    if (opt.e.button === 2) {

        menu.style.left = opt.e.pageX + "px";
        menu.style.top = opt.e.pageY + "px";
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
});


// BLOCK DEFAULT RIGHT CLICK
document.addEventListener("contextmenu", e => e.preventDefault());


// DELETE FUNCTION
window.deleteSelected = function () {

    const obj = canvas.getActiveObject();
    if (!obj) return;

    canvas.remove(obj);
    canvas.renderAll();
};
