function bodyLoaded() {
    configureZoomEffect(document.getElementById("profile-pic-abt"));
    const socials = document.getElementById("abt-me-socials").children;
    for (let i = 0; i < socials.length; i++) {
        configureZoomEffect(socials[i]);
    }
    const navbarTags = document.getElementById("navbar-tags").children;
    for (let i = 0; i < navbarTags.length; i++) {
        configureZoomEffect(navbarTags[i]);
    }

    // Prevent right click.
    window.addEventListener("contextmenu", (evt) => {evt.preventDefault()});
}
bodyLoaded()
function configureZoomEffect(elem) {
    const throttle = 500;
    // e for enter; l for leave.
    let prevTimeStampe = 0;
    elem.addEventListener("mouseenter", (evt) => {
        if (evt.timeStamp - prevTimeStampe > throttle) {
            setTimeout(() => {
                elem.style.animation = "zoom-in .5s forwards";
           }, 100);
        }
        prevTimeStampe = evt.timeStamp;
    })
    let prevTimeStampl = 0;
    elem.addEventListener("mouseleave", (evt) => {
        if (evt.timeStamp - prevTimeStampl > throttle) {
            setTimeout(() => {
                elem.style.animation = "zoom-out 1s forwards";
            }, 100);
        }
        prevTimeStampl = evt.timeStamp;
    })
}

window.addEventListener("keydown", (evt) => {
    if (evt.key === "Tab") {
        evt.preventDefault();
    }
})