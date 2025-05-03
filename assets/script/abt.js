function AbtMain() {
    const abt = document.getElementById("about-me")
    const navbar = document.getElementById("navbar")
    abt.style.marginTop = navbar.offsetHeight + "px"
}
AbtMain()
window.addEventListener("resize", AbtMain)