/* ===============================
   TOOLKIT TOOLTIP CONTROLLER
   Handles the floating tooltip shown when users interact with
   toolkit icons.

   Main responsibilities:
   - Reads tooltip text from each .tool-card data-tooltip attribute.
   - Shows the tooltip on hover.
   - Allows clicking a tool to pin/unpin the tooltip.
   - Hides the tooltip when clicking anywhere outside.
================================ */
const tooltip = document.getElementById('tool-tooltip');
const toolCards = document.querySelectorAll('.tool-card');

let pinnedTooltip = false;

/* Positions the tooltip above the selected tool card and displays its text */
function showTooltip(card){
    if(!tooltip) return;

    tooltip.textContent = card.dataset.tooltip || "Tool information will be added here.";

    const rect = card.getBoundingClientRect();

    tooltip.style.left = rect.left + rect.width / 2 + "px";
    tooltip.style.top = rect.top - 18 + "px";
    tooltip.style.transform = "translate(-50%, -100%)";

    tooltip.classList.add('active');
}

/* Hides the tooltip unless it has been pinned by clicking */
function hideTooltip(){
    if(!pinnedTooltip && tooltip){
        tooltip.classList.remove('active');
    }
}

/* Attach hover and click behavior to every toolkit card */
toolCards.forEach(card => {

    card.addEventListener('mouseenter', () => {
        if(!pinnedTooltip){
            showTooltip(card);
        }
    });

    card.addEventListener('mouseleave', () => {
        hideTooltip();
    });

    card.addEventListener('click', (e) => {
        e.stopPropagation();

        if(pinnedTooltip && tooltip.classList.contains('active')){
            pinnedTooltip = false;
            tooltip.classList.remove('active');
        } else {
            pinnedTooltip = true;
            showTooltip(card);
        }
    });

});

/* Clicking outside any tool card unpins and hides the tooltip */
document.addEventListener('click', () => {
    pinnedTooltip = false;

    if(tooltip){
        tooltip.classList.remove('active');
    }
});