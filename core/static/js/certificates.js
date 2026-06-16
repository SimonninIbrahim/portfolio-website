/* ===============================
   SIMPLE CERTIFICATE POPUP
   Handles certificate buttons placed directly inside sections,
   such as Experience and Mawhiba. The button provides a list of
   image filenames through data-certificates.
================================ */
    const certificatePopup = document.getElementById("certificate-popup");
    const certificateImage = document.getElementById("certificate-image");
    const certificateCurrent = document.getElementById("certificate-current");
    const certificateTotal = document.getElementById("certificate-total");
    const certificateClose = document.querySelector(".certificate-close");
    const certificatePrev = document.querySelector(".certificate-prev");
    const certificateNext = document.querySelector(".certificate-next");

/* Stores the currently opened certificate image list and index */
    let certificateImages = [];
    let certificateIndex = 0;

/* Loads the current certificate image into the simple popup viewer */
    function showCertificate(){
    certificateImage.src = `/static/certificates/${certificateImages[certificateIndex]}`;

    if(certificateCurrent && certificateTotal){
        certificateCurrent.textContent = certificateIndex + 1;
        certificateTotal.textContent = certificateImages.length;
    }
}

/* Opens the simple certificate popup when any certificate button is clicked */
    document.querySelectorAll(".certificate-btn").forEach(button => {
        button.addEventListener("click", () => {
            certificateImages = button.dataset.certificates
                .split(",")
                .map(item => item.trim());

            certificateIndex = 0;

            showCertificate();

            certificatePopup.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

/* Closes the simple certificate popup */
    certificateClose.addEventListener("click", () => {
        certificatePopup.classList.remove("active");
        document.body.style.overflow = "";
    });

/* Moves to the next certificate image inside the simple popup */
    certificateNext.addEventListener("click", () => {
        certificateIndex = (certificateIndex + 1) % certificateImages.length;
        showCertificate();
    });

/* Moves to the previous certificate image inside the simple popup */
    certificatePrev.addEventListener("click", () => {
        certificateIndex = (certificateIndex - 1 + certificateImages.length) % certificateImages.length;
        showCertificate();
    });

/* Closes the simple popup when clicking outside the certificate image */
    certificatePopup.addEventListener("click", (e) => {
        if(e.target === certificatePopup){
            certificatePopup.classList.remove("active");
            document.body.style.overflow = "";
        }
    });


/* ===============================
   CERTIFICATE ARCHIVE FOLDER
   Controls the large folder-style certificate archive. Clicking
   the folder opens an explorer-style window containing certificate files.
================================ */    
    const openCertificateFolder = document.getElementById("open-certificate-folder");
    const certificateExplorer = document.getElementById("certificate-explorer");
    const closeCertificateFolder = document.getElementById("close-certificate-folder");

    const certificateViewer = document.getElementById("certificate-viewer");
    const certificateViewerImage = document.getElementById("certificate-viewer-image");
    const closeCertificateViewer = document.getElementById("close-certificate-viewer");

    const certificateFiles = Array.from(document.querySelectorAll(".certificate-file"));
    const folderCertificatePrev = document.getElementById("certificate-prev");
    const folderCertificateNext = document.getElementById("certificate-next");

/* Tracks which certificate file is currently open inside the archive viewer */
    let currentCertificateIndex = 0;

/* Opens the large preview viewer for the selected archive certificate */
    function openViewer(index){
        currentCertificateIndex = index;
        certificateViewerImage.src = certificateFiles[currentCertificateIndex].dataset.full;
        certificateViewer.classList.add("active");
    }

/* Closes the large certificate preview viewer */
    function closeViewer(){
        certificateViewer.classList.remove("active");
    }

/* Shows the next certificate inside the archive viewer */
    function showNextCertificate(){
        currentCertificateIndex = (currentCertificateIndex + 1) % certificateFiles.length;
        certificateViewerImage.src = certificateFiles[currentCertificateIndex].dataset.full;
    }

/* Shows the previous certificate inside the archive viewer */
    function showPrevCertificate(){
        currentCertificateIndex =
            (currentCertificateIndex - 1 + certificateFiles.length) % certificateFiles.length;

        certificateViewerImage.src = certificateFiles[currentCertificateIndex].dataset.full;
    }

/* Opens the certificate explorer window when the folder is clicked */
    if(openCertificateFolder){
        openCertificateFolder.addEventListener("click", () => {
            certificateExplorer.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }

/* Closes the certificate explorer window */
    if(closeCertificateFolder){
        closeCertificateFolder.addEventListener("click", () => {
            certificateExplorer.classList.remove("active");
            document.body.style.overflow = "";
        });
    }

/* Opens a full-size preview when clicking any certificate file thumbnail */
    certificateFiles.forEach((file,index) => {
        file.addEventListener("click", () => {
            openViewer(index);
        });
    });

/* Connects the close button of the large certificate viewer */
    if(closeCertificateViewer){
        closeCertificateViewer.addEventListener("click", closeViewer);
    }

/* Connects next/previous controls for archive certificate navigation */
    if(folderCertificateNext){
        folderCertificateNext.addEventListener("click", showNextCertificate);
    }

    if(folderCertificatePrev){
        folderCertificatePrev.addEventListener("click", showPrevCertificate);
    }

/* Closes the explorer when clicking the dark background outside the window */
    certificateExplorer.addEventListener("click", (e) => {
        if(e.target === certificateExplorer){
            certificateExplorer.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

/* Closes the large preview when clicking outside the certificate image */
    certificateViewer.addEventListener("click", (e) => {
        if(e.target === certificateViewer){
            closeViewer();
        }
    });

/* Keyboard controls: Escape closes viewers, arrows move between certificates */
    window.addEventListener("keydown", (e) => {
        if(e.key === "Escape"){
            closeViewer();
            certificateExplorer.classList.remove("active");
            document.body.style.overflow = "";
        }

        if(certificateViewer.classList.contains("active")){
            if(e.key === "ArrowRight") showNextCertificate();
            if(e.key === "ArrowLeft") showPrevCertificate();
        }
    });
    
  