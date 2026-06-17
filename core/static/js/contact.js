/* ===============================
   CONTACT POPUP CONTROLLER
   Waits for the page to finish loading, then connects the navbar
   Contact button with the popup window and its closing actions.
================================ */
    document.addEventListener("DOMContentLoaded", () => {

    /* Reserved for future navbar section tracking */
        let activeSectionName = "Home";

    /* Contact popup elements */
        const openContactPopup = document.getElementById("open-contact-popup");
        const closeContactPopup = document.getElementById("close-contact-popup");
        const contactPopup = document.getElementById("contact-popup");

    /* Only initialize if all popup elements exist on the page */
        if(openContactPopup && closeContactPopup && contactPopup){

        /* Opens the contact popup and prevents page scrolling */
            openContactPopup.addEventListener("click", () => {
                contactPopup.classList.add("active");
                document.body.style.overflow = "hidden";
            });

        /* Closes the popup using the close button */
            closeContactPopup.addEventListener("click", () => {
                contactPopup.classList.remove("active");
                document.body.style.overflow = "";
            });

        /* Closes the popup when clicking the dark overlay background */
            contactPopup.addEventListener("click", (e) => {
                if(e.target === contactPopup){
                    contactPopup.classList.remove("active");
                    document.body.style.overflow = "";
                }
            });

        /* Allows the Escape key to close the contact popup */
            window.addEventListener("keydown", (e) => {
                if(e.key === "Escape"){
                    contactPopup.classList.remove("active");
                    document.body.style.overflow = "";
                }
            });
        }
    });


    const openCvPopup = document.getElementById("open-cv-popup");
    const closeCvPopup = document.getElementById("close-cv-popup");
    const cvPopup = document.getElementById("cv-popup");

    if(openCvPopup && closeCvPopup && cvPopup){
        openCvPopup.addEventListener("click", () => {
            cvPopup.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        closeCvPopup.addEventListener("click", () => {
            cvPopup.classList.remove("active");
            document.body.style.overflow = "";
        });

        cvPopup.addEventListener("click", (e) => {
            if(e.target === cvPopup){
                cvPopup.classList.remove("active");
                document.body.style.overflow = "";
            }
        });

        window.addEventListener("keydown", (e) => {
            if(e.key === "Escape"){
                cvPopup.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }
  