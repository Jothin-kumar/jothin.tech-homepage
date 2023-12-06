function bodyLoaded() {
    configureZoomEffect(document.getElementById("profile-pic-abt"));
    const socials = document.getElementById("abt-me-socials").children;
    for (let i = 0; i < socials.length; i++) {
        configureZoomEffect(socials[i]);
    }
}
function configureZoomEffect(elem) {
    elem.addEventListener("mouseenter", () => {
        setTimeout(() => {
            elem.style.animation = "zoom-in .5s forwards";
        }, 100);
    })
    elem.addEventListener("mouseleave", () => {
        setTimeout(() => {
            elem.style.animation = "zoom-out 1s forwards";
        }, 500)
    })
}