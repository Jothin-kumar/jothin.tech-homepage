function enableTooltip(elem) {
    elem.addEventListener("mouseenter", () => {
        clearTimeout(window.tooltipTimeout);
        window.tooltipTimeout = setTimeout(() => {
            window.tooltip.innerHTML = elem.getAttribute("tooltip");
            window.tooltip.style.display = "block";
            const client = elem.getBoundingClientRect();
            window.tooltip.style.marginTop = Math.round(window.scrollY + client.bottom).toString() + "px";
            const elemWidth = client.right - client.left;
            let marginLeft = window.scrollX + client.left + elemWidth/2;
            const ttClient = window.tooltip.getBoundingClientRect();
            if (marginLeft < elemWidth) {
                marginLeft = client.right + 10;
            }
            else if (marginLeft + (ttClient.right - ttClient.left)/2 > screen.width - 50) {
                marginLeft -= (ttClient.right - ttClient.left)/2;
            }
            window.tooltip.style.marginLeft = marginLeft.toString() + "px";
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
    window.tooltip.id = "tooltip";
    document.body.appendChild(window.tooltip);
    window.addEventListener("scroll", () => {
        window.tooltip.classList.add("no-display-strict");
    });
    window.addEventListener("scrollend", () => {
        window.addEventListener("mousemove", () => {
            window.tooltip.classList.remove("no-display-strict");
            window.removeEventListener("mousemove", this);
        })
    });

    const links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        const elem = links[i];
        if (elem.getAttribute("tooltip")) {
            enableTooltip(elem);
        }
    }
}