const scrollBoost = 3;
window.scrollBoost = true; // To disable scroll boost set this to false.

function bodyLoadedAbt() {
    const abt = document.getElementById("about-me");
    let p = window.scrollY;
    const handler = () => {
        if (window.scrollY > p & window.scrollBoost) { // If scrolled down
            let y = p + (window.scrollY - p)*scrollBoost;
            window.scroll(window.scrollX, y < abt.scrollHeight ? y: abt.scrollHeight);
            window.removeEventListener("scroll", handler);
            window.addEventListener("scroll", handler2);
            if (y > abt.scrollHeight) {
                window.scrollBoost = false;
            }
        }
        p = window.scrollY;
    }
    const handler2 = () => {
        if (abt.scrollHeight > window.scrollY) {
            window.removeEventListener("scroll", handler2);
            window.addEventListener("scroll", handler);
        }
    }
    window.addEventListener("scroll", handler2);
}