const abt = document.getElementById("about-me");
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    const d = (window.scrollY - abt.scrollHeight / 10);
    navbar.style.opacity = (d / abt.scrollHeight).toString();
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
            document.querySelectorAll(".current-navbar-tag")[0].classList.remove("current-navbar-tag");
            document.querySelectorAll(".current-slides-tag")[0].classList.remove("current-slides-tag");
            element.classList.add("current-navbar-tag");
            const tag = element.getAttribute("slide-tag-name");
            const slidesContainer = document.getElementById("slides-here-tag-" + tag);
            slidesContainer.classList.add("current-slides-tag");

            window.currentSlideLoader.terminate();
            window.currentSlideLoader = new SlideLoader(tag);
        });
    });
}
navbarMain();