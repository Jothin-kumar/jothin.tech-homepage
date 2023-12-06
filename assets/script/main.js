function bodyLoaded() {
    configureZoomEffect(document.getElementById("profile-pic-abt"));
    configureZoomEffect(document.getElementById("explore-my-works-btn"));
    const socials = document.getElementById("abt-me-socials").children;
    for (let i = 0; i < socials.length; i++) {
        configureZoomEffect(socials[i]);
    }

    // Autoscroll
    autoscroll = setTimeout(() => {
        scrollToMyWorks();
    }, 10000);
    window.addEventListener("scroll", () => {
        clearTimeout(autoscroll);
    })
    for (let i = 0; i < socials.length; i++) {
        socials[i].addEventListener("mouseover", () => {
            clearTimeout(autoscroll);
        });
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
function scrollToMyWorks() {
    const myWorks = document.getElementById("my-works");
    for (let i = 0; i*5 < myWorks.scrollHeight; i++) {
        setTimeout(() => {
            window.scrollTo(0, i*5);
        }, i*2);
    }
}