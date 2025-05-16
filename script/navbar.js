const abt = document.getElementById("about-me");
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    const d = (window.scrollY - abt.scrollHeight / 10);
    const c = d / abt.scrollHeight
    navbar.style.opacity = c.toString();
    if (c < .1) {
        navbar.classList.add("disabled-navbar");
    }
    else {
        navbar.classList.remove("disabled-navbar");
    }
    if (window.scrollY >= abt.scrollHeight - (abt.scrollHeight % 5)) {
        navbar.classList.add("fix-navbar");
    }
    else {
        navbar.classList.remove("fix-navbar");
    }
})

function navbarMain() {
    Array.from(document.getElementById("navbar-tags").children).forEach(element => {
        element.addEventListener("click", () => {
            const tag = element.getAttribute("slide-tag-name");
            toSlidesTag(tag);
        });
    });
}
navbarMain();