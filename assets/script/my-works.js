function bodyLoadedMyWorks() {
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
}