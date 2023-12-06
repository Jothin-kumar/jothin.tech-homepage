function bodyLoaded() {
    configureZoomEffect(document.getElementById("profile-pic-abt"));
    configureZoomEffect(document.getElementById("explore-my-works-btn"));
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
function exploreMyWorksButton() {
    const myWorks = document.getElementById("my-works");
    for (let i = 0; i*5 < myWorks.scrollHeight; i++) {
        setTimeout(() => {
            window.scrollTo(0, i*5);
        }, i);
    }
    window.scrollTo(0, myWorks.scrollHeight);
}