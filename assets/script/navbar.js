function navbarLoaded() {
    let p = window.scrollY;
    const navbar = document.getElementById("navbar");
    const handler = () => {
        if (window.scrollY > p) { // If scrolled down
            navbar.classList.add("scrolled-down");
        }
        else if (window.scrollY < p) { // If scrolled up
            navbar.classList.remove("scrolled-down");
        }
        p = window.scrollY;
    }
    window.addEventListener("scroll", handler);
}