// ===============================
// CLOUD PROJECT SYSTEM
// ===============================

window.saveProjectCloud = function () {

    if (!SAAS.user) {
        console.warn("No user logged in");
        return;
    }

    const project = {
        userId: SAAS.user.id,
        name: "My Design",
        data: canvas.toJSON(),
        updated: Date.now()
    };

    // simulate backend DB
    let db = JSON.parse(localStorage.getItem("saas_db") || "[]");

    db.push(project);

    localStorage.setItem("saas_db", JSON.stringify(db));

    console.log("☁ Project Saved to Cloud DB");
};

// LOAD PROJECTS
window.loadUserProjects = function () {

    if (!SAAS.user) return [];

    const db = JSON.parse(localStorage.getItem("saas_db") || "[]");

    return db.filter(p => p.userId === SAAS.user.id);
};
