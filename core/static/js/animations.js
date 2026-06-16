/* ===============================
   GENERAL SECTION REVEAL OBSERVER
   Adds or removes the .visible class when stacked page sections
   enter or leave the viewport. This triggers the main reveal
   animations defined in CSS.
================================ */
    const revealSections = document.querySelectorAll('.reveal-section');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if(entry.isIntersecting){
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }

        });
    }, {
        threshold:0.15
    });

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

   
/* ===============================
   SECTIONS OVERVIEW CARD ANIMATION
   Watches the "Sections" overview layer and adds .cards-visible
   so the overview cards can flip into view.
================================ */
    const infoLayer = document.querySelector(".info-layer");

    if(infoLayer){
        const infoCardsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    infoLayer.classList.add("cards-visible");
                }else{
                    infoLayer.classList.remove("cards-visible");
                }
            });
        }, {
            threshold:0.35
        });

        infoCardsObserver.observe(infoLayer);
    }
   

/* ===============================
   ABOUT SECTION ANIMATIONS
   Watches education, language cards, Mawhiba, and About subtitles.
   Each element receives .visible when it enters the viewport,
   allowing its CSS animation to replay when revisited.
================================ */
    const aboutAnimatedParts = document.querySelectorAll(
        ".education-timeline, .languages-section, .mawhiba-section, .about-animate-title"
    );

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("visible");
            }else{
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold:0.25
    });

    aboutAnimatedParts.forEach(part => {
        aboutObserver.observe(part);
    });


/* ===============================
   TOOLKIT CATEGORY ANIMATIONS
   Watches each toolkit group and triggers the title fade plus
   staggered tool-icon entrance animation.
================================ */
    const toolkitCategories = document.querySelectorAll(".toolkit-category");

    const toolkitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("visible");
            }else{
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold:0.25
    });

    toolkitCategories.forEach(category => {
        toolkitObserver.observe(category);
    });
    

/* ===============================
   SCROLL PROGRESS + SIDE NAV TRACKING
   Updates the top progress bar width based on scroll percentage
   and highlights the matching right-side navigation dot.
================================ */    
    const progressBar = document.querySelector('.scroll-progress-bar');
    const sideNavItems = document.querySelectorAll('.side-nav-item');

    const sections = [
        document.querySelector('#home'),
        document.querySelector('#personal'),
        document.querySelector('#experience'),
        document.querySelector('#projects'),
        document.querySelector('#toolkit'),
        document.querySelector('#hobbies')
    ];

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if(progressBar){
            progressBar.style.width = scrollPercent + '%';
        }

        let currentSection = '';

        sections.forEach(section => {
            if (!section) return;

            const sectionTop = section.offsetTop - 220;
            const sectionHeight = section.offsetHeight;

            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        sideNavItems.forEach(item => {
            item.classList.remove('active');

            if (item.getAttribute('href') === '#' + currentSection) {
                item.classList.add('active');
            }
        });
    });
    

/* ===============================
   ANIMATED COUNTERS
   Counts hobby numbers upward when they enter the viewport and
   resets them when they leave so the animation can replay.
================================ */ 
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const counter = entry.target;

            if(entry.isIntersecting){
                const target = Number(counter.dataset.target);
                let current = 0;
                const duration = 1200;
                const stepTime = 20;
                const steps = duration / stepTime;
                const increment = target / steps;

                counter.textContent = "0";

                const timer = setInterval(() => {
                    current += increment;

                    if(current >= target){
                        counter.textContent = target + "+";
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + "+";
                    }
                }, stepTime);
            } else {
                counter.textContent = "0";
            }
        });
    }, {
        threshold:0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


/* ===============================
   TEXT REVEAL OBSERVER
   Adds .text-visible to headings and important text elements
   when they enter view, creating the fade/blur/letter-spacing reveal.
================================ */
    const revealTexts = document.querySelectorAll('.text-reveal');

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('text-visible');
            } else {
                entry.target.classList.remove('text-visible');
            }
        });
    }, {
        threshold:0.45
    });

    revealTexts.forEach(text => {
        textObserver.observe(text);
    });
  
