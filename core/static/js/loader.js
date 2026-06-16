/* ===============================
   LOADING SCREEN CONTROLLER
   Hides the full-screen loading overlay shortly after the page
   finishes loading so the hero animation can begin clearly.
================================ */
    window.addEventListener('load', () => {

    /* Small delay keeps the loading animation visible before fading out */
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');

            if(loadingScreen){
                loadingScreen.classList.add('hidden');
            }
        }, 1000);
    });