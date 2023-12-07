let slides = [];

function modulus(n) {
    if (n < 0) {
        return n * -1;
    }
    return n;
}
window.addEventListener("mousemove", (evt)=> {
    const slides = document.getElementsByClassName("slide");
    var y, slide;
    for (let i = 0; i < slides.length; i++) {
        slide = slides[i];
        y = modulus(evt.pageY - slide.offsetTop - (slide.scrollHeight / 2));
        slide.style.opacity = (slide.scrollHeight/y)/5;
    }
})