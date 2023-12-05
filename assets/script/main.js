function bodyLoaded() {
    configureZoomEffect(document.getElementById("profile-pic-abt"));
    const socials = document.getElementById("abt-me-socials").children;
    for (let i = 0; i < socials.length; i++) {
        configureZoomEffect(socials[i]);
    }
}
function configureZoomEffect(elem) {
    elem.addEventListener("mouseenter", () => {
        elem.style.animation = "zoom-in .5s forwards";
    })
    elem.addEventListener("mouseleave", () => {
        elem.style.animation = "zoom-out 1s forwards";
    })
}