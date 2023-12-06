function bodyLoadedAbt() {
    const abt = document.getElementById("about-me");
    let p = 0;
    const handler = () => {
        if (abt.scrollHeight > window.scrollY > p) { // If scrolled down
            scrollToMyWorks();
            window.removeEventListener("scrollend", handler);
            setTimeout(() => {
                window.addEventListener("scrollend", handler);
            }, 3000)
        }
        p = window.scrollY;
    }
    window.addEventListener("scrollend", handler)
}