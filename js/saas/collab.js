// ===============================
// REALTIME COLLAB (SIMULATED)
// ===============================

window.COLLAB = {
    session: null
};

// BROADCAST CHANGES
window.broadcastChange = function () {

    const data = canvas.toJSON();

    localStorage.setItem("collab_live", JSON.stringify(data));
};

// LISTEN CHANGES
window.listenCollab = function () {

    setInterval(() => {

        const data = localStorage.getItem("collab_live");

        if (data) {
            canvas.loadFromJSON(JSON.parse(data), canvas.renderAll.bind(canvas));
        }

    }, 2000);
};
