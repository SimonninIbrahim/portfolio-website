/* ===============================
   LOADING SCREEN CONTROLLER
================================ */

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById("loading-screen");

        if(loadingScreen){
            loadingScreen.classList.add("hidden");
        }
    }, 1200);
});