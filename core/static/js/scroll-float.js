/* ===============================
   SCROLL FLOAT TEXT ANIMATION
   Converts selected headings into individually animated characters
   using GSAP and ScrollTrigger.

   Main responsibilities:
   - Splits text into separate character spans.
   - Creates the floating/stretching letter entrance effect.
   - Synchronizes the animation with scrolling.
   - Replays naturally as the user scrolls through the page.
================================ */
gsap.registerPlugin(ScrollTrigger);

/* Process every element that should receive the scroll-float effect */
document.querySelectorAll('.scroll-float').forEach(el => {

    const text = el.textContent;
    el.innerHTML = '';

/* Build a wrapper containing one span per character */
    const wrapper = document.createElement('span');
    wrapper.classList.add('scroll-float-text');

    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.classList.add('char');
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        wrapper.appendChild(span);
    });

    el.appendChild(wrapper);

    const chars = el.querySelectorAll('.char');

/* Animate characters from stretched/hidden state to normal state */
    gsap.fromTo(
        chars,
        {
            opacity: 0,
            yPercent: 120,
            scaleY: 2.3,
            scaleX: 0.7,
            transformOrigin: '50% 0%'
        },
        {
            duration: 1,
            ease: "back.inOut(2)",
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            scaleX: 1,
            stagger: 0.03,
            scrollTrigger: {
                trigger: el,
                start: "center bottom+=50%",
                end: "bottom bottom-=40%",
                scrub: true
            }
        }
    );

});