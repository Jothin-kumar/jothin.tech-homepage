function AbtMain() {
    const abt = document.getElementById("about-me")
    const slidesParent = document.getElementById("slides-parent")
    const navbar = document.getElementById("navbar")
    abt.style.marginTop = navbar.offsetHeight + "px"
    slidesParent.style.scrollMarginBlockStart = navbar.offsetHeight + 10 + "px"
}
AbtMain()
window.addEventListener("resize", AbtMain)