function enableTooltip(elem) {
    elem.addEventListener("mouseenter", () => {
        clearTimeout(window.tooltipTimeout);
        window.tooltipTimeout = setTimeout(() => {
            window.tooltip.innerHTML = elem.getAttribute("tooltip");
            window.tooltip.style.display = "block";
            const client = elem.getBoundingClientRect();
            window.tooltip.style.marginTop = Math.round(window.scrollY + client.bottom).toString() + "px";
            window.tooltip.style.marginLeft = Math.round(window.scrollX + client.left + (client.right - client.left)/2).toString() + "px";
        }, 100);
    });
    elem.addEventListener("mouseleave", () => {
        clearTimeout(window.tooltipTimeout);
        window.tooltipTimeout = setTimeout(() => {
            window.tooltip.style.display = "none";
        }, 100);
    });
}

function tooltipBodyLoaded() {
    window.tooltip = document.createElement("p");
    window.tooltip.style = `
    display: none;
    position: absolute;
    color: aliceblue;
    background-color: #051209;
    padding: 10px;
    border-radius: 5px;
    transform: translateX(-50%);
    z-index: 2;
    `;
    document.body.appendChild(window.tooltip);

    const links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        const elem = links[i];
        if (elem.getAttribute("tooltip")) {
            enableTooltip(elem);
        }
    }
}