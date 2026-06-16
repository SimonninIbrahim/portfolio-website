/* ===============================
   HERO INTRO ANIMATION
   Controls the opening hero sequence.

   Main responsibilities:
   - Types the name one character at a time.
   - Reveals the role title after typing finishes.
   - Reveals the right-side description.
   - Reveals the quick info cards with a staggered delay.
   - Starts after the loading screen so the animation is visible.
================================ */
    const typedName = document.getElementById("typed-name");
    const cursor = document.querySelector(".typing-cursor");
    const quickInfoItems = document.querySelectorAll(".quick-info-item");

    const fullText = "Ibrahim\nSimonnin";
    let typingIndex = 0;

/* Types the hero name and starts the next reveal steps when complete */
    function typeName(){
        if(!typedName) return;

        if(typingIndex < fullText.length){

            if(fullText[typingIndex] === "\n"){
                typedName.innerHTML += "<br>";
            }else{
                typedName.innerHTML += fullText[typingIndex];
            }

            typingIndex++;
            setTimeout(typeName, 90);

        }else{
            setTimeout(() => {
                document.querySelector(".hero-title-role").classList.add("visible");
            }, 450);

            setTimeout(() => {
                document.querySelector(".hero-right").classList.add("visible");
            }, 800);

            setTimeout(() => {
                showHeroInfo();
            }, 1100);
        }
    }

/* Reveals hero quick-info cards one by one */
    function showHeroInfo(){
        quickInfoItems.forEach((item,index) => {
            setTimeout(() => {
                item.classList.add("visible");
            }, index * 180);
        });
    }

/* Starts the hero animation after the page and loading screen finish */
    window.addEventListener("load", () => {
        setTimeout(() => {
            typeName();
        }, 1700);
    });


/* ===============================
   HERO PARALLAX BACKGROUND
   Slightly shifts the hero background while scrolling to create
   a subtle depth effect.
================================ */
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        if(!hero) return;

        const scrollY = window.scrollY;
        const moveY = 60 + scrollY * 0.04;

        hero.style.backgroundPosition = `center ${moveY}%`;
    });
