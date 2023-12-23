function bodyLoadedAbt() {
    const abt = document.getElementById("about-me");
    let p = window.scrollY;
    const handler = () => {
        if (window.scrollY > p) { // If scrolled down
            scrollToMyWorks();
            window.removeEventListener("scrollend", handler);
            window.addEventListener("scrollend", handler2);
        }
        p = window.scrollY;
    }
    const handler2 = () => {
        if (abt.scrollHeight > window.scrollY) {
            window.removeEventListener("scrollend", handler2);
            window.addEventListener("scrollend", handler);
        }
    }
    window.addEventListener("scrollend", handler);
}