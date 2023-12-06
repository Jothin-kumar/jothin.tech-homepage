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

    // Prevent right click.
    window.addEventListener("contextmenu", (evt) => {evt.preventDefault()});
}
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
function scrollToMyWorks() {
    const myWorks = document.getElementById("my-works");
    for (let i = 0; i*5 < myWorks.scrollHeight; i++) {
        setTimeout(() => {
            window.scrollTo(0, i*5);
        }, i*2);
    }
}