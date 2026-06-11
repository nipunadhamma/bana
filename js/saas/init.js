// ===============================
// SAAS BOOT SYSTEM
// ===============================

window.addEventListener("load", function () {

    loadUser?.();

    if (SAAS.user) {
        console.log("👤 User:", SAAS.user.email);
    } else {
        console.log("⚠ No user logged in");
    }

    listenCollab?.();
});
