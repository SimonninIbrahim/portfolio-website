/* ===============================
   LOADING SCREEN + WELCOME GATE
================================ */

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const welcomeGate = document.getElementById("welcome-gate");

    setTimeout(() => {
        if(loadingScreen){
            loadingScreen.classList.add("hidden");
        }

        if(welcomeGate){
            welcomeGate.classList.add("active");
        }
    }, 1000);
});