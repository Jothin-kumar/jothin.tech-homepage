function bodyLoadedSlides() {
    window.addEventListener("touchstart", ()=> {
        document.getElementById("slides-here").classList.add("strict-no-opacity");
    })
}

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

function addSlide(data) {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    if (data["border-color"]) {
        slide.style.border = data["border-color"] + " 1px solid";
    }
    if (data["shadow-color"]) {
        slide.style.boxShadow = "0 0 10px " + data["shadow-color"];
    }

    const left = document.createElement("div");
    left.classList.add("slide-left");
    if (data["image-src"]) {
        const img = document.createElement("img");
        img.src = data["image-src"];
        left.appendChild(img);
        if (data["border-color"]) {
            img.style.border = data["border-color"] + " 0.1px solid";
        }
    }
    const name = document.createElement("h2");
    name.innerText = data["name"];
    left.appendChild(name);
    const links = document.createElement("div");
    links.classList.add("links-slide");
    const visit = document.createElement("a");
    visit.classList.add("visit-work");
    visit.innerText = "Visit";
    visit.href = data["url"];
    visit.target = "_blank";
    links.appendChild(visit);
    const gh = document.createElement("a");
    gh.classList.add("gh-work");
    gh.innerText = "GitHub";
    gh.href = data["GitHub-url"];
    gh.target = "_blank";
    links.appendChild(gh);
    left.appendChild(links);

    const right = document.createElement("div");
    right.classList.add("slide-right");
    const rightContent = document.createElement("div");
    rightContent.classList.add("slide-right-content");
    rightContent.innerHTML = data["description"];
    right.appendChild(rightContent);

    slide.appendChild(left);
    slide.appendChild(right);
    document.getElementById("slides-here").appendChild(slide);
}

// Test
window.addEventListener("load", () => {
    addSlide({
        //"border-color": "white",
        "shadow-color": "white",
        "name": "Geometry App",
        "image-src": "https://cdn.jothin.tech/img/Geometry-app.webp",
        "url": "https://joth.in",
        "GitHub-url": "https://github.com/Jothin-Kumar/Geometry-app",
        "description": `
        <h3>Test heading</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi non incidunt ipsa ex reiciendis, consectetur assumenda odio aperiam soluta dolore dolorem adipisci vel voluptatibus, blanditiis modi commodi deleniti id voluptates!</p>
        <br>
        <h3>Test heading</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi non incidunt ipsa ex reiciendis, consectetur assumenda odio aperiam soluta dolore dolorem adipisci vel voluptatibus, blanditiis modi commodi deleniti id voluptates!</p>
        `,
    });
    addSlide({
        "border-color": "gold",
        //"shadow-color": "gold",
    });
    addSlide({
        "border-color": "red",
        "shadow-color": "red",
    });
})