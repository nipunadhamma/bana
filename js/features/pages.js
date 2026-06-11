// ===============================
// PAGE SYSTEM (BASIC CANVA STYLE)
// ===============================

window.pages = [];
window.currentPage = 0;

window.addPage = function () {

    if (!canvas) return;

    pages.push(canvas.toJSON());

    canvas.clear();

    currentPage = pages.length;

    console.log("📄 Page Added:", currentPage);
};

window.switchPage = function (index) {

    if (!pages[index]) return;

    canvas.loadFromJSON(pages[index], function () {
        canvas.renderAll();
    });

    currentPage = index;
};
