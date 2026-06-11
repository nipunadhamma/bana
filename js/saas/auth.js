// ===============================
// SIMPLE AUTH (LOCAL + READY FOR BACKEND)
// ===============================

window.SAAS = {
    user: null
};

// LOGIN
window.login = function (email) {

    const user = {
        id: Date.now(),
        email: email
    };

    localStorage.setItem("saas_user", JSON.stringify(user));
    SAAS.user = user;

    console.log("🔐 Logged in:", user.email);
};

// LOAD USER
window.loadUser = function () {

    const data = localStorage.getItem("saas_user");

    if (data) {
        SAAS.user = JSON.parse(data);
    }
};
