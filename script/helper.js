function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function isScrolledPast(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function toSlidesTag(tag) {
    document.querySelectorAll(".current-navbar-tag")[0].classList.remove("current-navbar-tag");
    document.querySelectorAll(".current-slides-tag")[0].classList.remove("current-slides-tag");
    document.getElementById("navbar-tag-" + tag).classList.add("current-navbar-tag");

    const slidesContainer = document.getElementById("slides-here-tag-" + tag);
    slidesContainer.classList.add("current-slides-tag");

    window.currentSlideLoader.terminate();
    window.currentSlideLoader = new SlideLoader(tag);
}