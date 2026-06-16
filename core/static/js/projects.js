/* ===============================
   PROJECT CARD IMAGE SLIDERS
   Controls the image carousel inside each project card.

   Main responsibilities:
   - Switches between project images using left/right arrows.
   - Loops images forward and backward.
   - Updates the current image counter.
   - Keeps each project card slider independent from the others.
================================ */
    document.querySelectorAll('.project-card').forEach(card => {
        const slides = card.querySelectorAll('.project-slide');
        const prev = card.querySelector('.project-arrow-left');
        const next = card.querySelector('.project-arrow-right');
        const currentCounter = card.querySelector('.current-slide');
        const totalCounter = card.querySelector('.total-slides');

        let index = 0;

        if(totalCounter){
            totalCounter.textContent = slides.length;
        }

    /* Shows the requested slide and updates the visible counter */
        function showSlide(newIndex){
            slides[index].classList.remove('active');

            index = (newIndex + slides.length) % slides.length;

            slides[index].classList.add('active');

            if(currentCounter){
                currentCounter.textContent = index + 1;
            }
        }

        if(prev){
            prev.addEventListener('click', () => {
                showSlide(index - 1);
            });
        }

        if(next){
            next.addEventListener('click', () => {
                showSlide(index + 1);
            });
        }
    });


/* ===============================
   PROJECT FULLSCREEN LIGHTBOX
   Opens project images in a larger fullscreen viewer.

   Main responsibilities:
   - Opens the currently active project image.
   - Allows previous/next navigation inside the fullscreen view.
   - Closes using the close button, background click, or Escape key.
   - Supports keyboard arrow navigation.
================================ */
    const lightbox = document.getElementById('project-lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let lightboxSlides = [];
    let lightboxIndex = 0;

/* Opens the fullscreen viewer using the selected project image */
    function openLightbox(slides, index){
        lightboxSlides = Array.from(slides);
        lightboxIndex = index;

        lightboxImage.src = lightboxSlides[lightboxIndex].src;
        lightbox.classList.add('active');

        document.body.style.overflow = 'hidden';
    }

/* Closes the fullscreen project image viewer */
    function closeLightbox(){
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

/* Changes the image shown inside the fullscreen viewer */
    function showLightboxImage(newIndex){
        if(lightboxSlides.length === 0) return;

        lightboxIndex = (newIndex + lightboxSlides.length) % lightboxSlides.length;
        lightboxImage.src = lightboxSlides[lightboxIndex].src;
    }

    document.querySelectorAll('.project-card').forEach(card => {
        const slides = card.querySelectorAll('.project-slide');
        const fullscreenBtn = card.querySelector('.project-fullscreen-btn');

        if(fullscreenBtn){
            fullscreenBtn.addEventListener('click', () => {
                let activeIndex = 0;

                slides.forEach((slide, i) => {
                    if(slide.classList.contains('active')){
                        activeIndex = i;
                    }
                });

                openLightbox(slides, activeIndex);
            });
        }
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightboxPrev.addEventListener('click', () => {
        showLightboxImage(lightboxIndex - 1);
    });

    lightboxNext.addEventListener('click', () => {
        showLightboxImage(lightboxIndex + 1);
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox){
            closeLightbox();
        }
    });

    window.addEventListener('keydown', (e) => {
        if(!lightbox.classList.contains('active')) return;

        if(e.key === 'Escape'){
            closeLightbox();
        }

        if(e.key === 'ArrowLeft'){
            showLightboxImage(lightboxIndex - 1);
        }

        if(e.key === 'ArrowRight'){
            showLightboxImage(lightboxIndex + 1);
        }
    });
    