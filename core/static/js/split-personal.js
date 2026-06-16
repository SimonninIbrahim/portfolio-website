/* ===============================
   SPLIT TEXT LETTER ANIMATION
   Uses GSAP SplitText to animate selected text one character
   at a time when it enters the viewport.

   Main responsibilities:
   - Finds every element with .split-animate.
   - Splits each element into individual characters.
   - Animates letters upward from a hidden state.
   - Runs only once per element.
================================ */
gsap.registerPlugin(ScrollTrigger);

/* Apply the split-letter animation to every matching text element */
document.querySelectorAll('.split-animate').forEach(el => {

/* Break the text into individual character elements */
    const split = new SplitText(el, { type: "chars" });

/* Animate the characters into view with a staggered upward reveal */
    gsap.from(split.chars, {
        opacity: 0,
        y: 40,
        duration: 1.25,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true
        },
        
    });

});