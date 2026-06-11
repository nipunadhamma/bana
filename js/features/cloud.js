// ===============================
// CLOUD SAVE (SIMULATED)
// ===============================

window.cloudSave = function () {

    const project = {
        id: Date.now(),
        data: canvas.toJSON()
    };

    localStorage.setItem("cloud_project", JSON.stringify(project));

    console.log("☁ Saved to Cloud (simulated)");
};

window.cloudLoad = function () {

    const data = localStorage.getItem("cloud_project");

    if (!data) return;

    canvas.loadFromJSON(JSON.parse(data).data, function () {
        canvas.renderAll();
        console.log("☁ Loaded from Cloud");
    });
};
