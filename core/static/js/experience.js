/* ===============================
   EXPERIENCE CAROUSEL CONTROLLER
   Handles the horizontal experience card carousel.

   Main responsibilities:
   - Keeps the active experience card centered in the viewport.
   - Applies the .active class to the current card.
   - Disables the left arrow on the first card.
   - Disables the right arrow on the last card.
   - Recalculates card position when the browser is resized.
================================ */

    const expTrack = document.querySelector(".experience-track");
    const expViewport = document.querySelector(".experience-viewport");
    const expCards = Array.from(document.querySelectorAll(".experience-card"));
    const expPrev = document.querySelector(".exp-prev");
    const expNext = document.querySelector(".exp-next");

    if(expTrack && expViewport && expCards.length > 0){

        let currentIndex = 0;
        const gap = 36;

    /* Calculates the horizontal offset needed to center the active card */
        function updateCarousel(){
            const cardWidth = expCards[0].offsetWidth;
            const viewportWidth = expViewport.offsetWidth;

            const offset =
                currentIndex * (cardWidth + gap)
                - (viewportWidth / 2)
                + (cardWidth / 2);

            expTrack.style.transform = `translate3d(${-offset}px, 0, 0)`;

            expCards.forEach(card => card.classList.remove("active"));
            expCards[currentIndex].classList.add("active");

            expPrev.classList.toggle("disabled", currentIndex === 0);
            expNext.classList.toggle("disabled", currentIndex === expCards.length - 1);
        }

        expNext.addEventListener("click", () => {
            if(currentIndex < expCards.length - 1){
                currentIndex++;
                updateCarousel();
            }
        });

        expPrev.addEventListener("click", () => {
            if(currentIndex > 0){
                currentIndex--;
                updateCarousel();
            }
        });

        window.addEventListener("resize", updateCarousel);

        setTimeout(updateCarousel, 100);
    }


/* ===============================
   CONTACT COPY BUTTONS
   Allows users to copy contact details directly from the contact popup.

   Main responsibilities:
   - Reads the value stored in data-copy.
   - Copies it to the clipboard.
   - Temporarily changes the copy icon into a checkmark as feedback.
================================ */
    document.querySelectorAll(".copy-contact-btn").forEach(button => {
        button.addEventListener("click", () => {
            const text = button.dataset.copy;

            navigator.clipboard.writeText(text).then(() => {
                button.innerHTML = '<i class="fa-solid fa-check"></i>';

                setTimeout(() => {
                    button.innerHTML = '<i class="fa-regular fa-copy"></i>';
                }, 1200);
            });
        });
    });
  