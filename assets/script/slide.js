function bodyLoadedSlides() {
    window.addEventListener("touchstart", ()=> {
        document.getElementById("slides-here").classList.add("strict-no-opacity");
    });
    setTimeout(slideSpawner, 0);
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

const slidesBaseURL = "/slides/{id}.json";
window.canAddNewSlide = true;
window.nextSlide = "init";
async function fetchSlide(slideID, callback) {
    window.canAddNewSlide = false;
    const url = slidesBaseURL.replace("{id}", slideID);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            callback(false);
        }
        else {
            response.json().then((data) =>{
                callback(data);
            })
        }
    }
    catch {
        callback(false);
    }
}
function slideCallback(r) {
    if (r) {
        addSlide(r["slide"]);
        window.nextSlide = r["next"];
        window.canAddNewSlide = true;
    }
    else {
        console.log("Problem");
    }
}
function spawnNewSlide() {
    if (window.nextSlide){
        if (window.canAddNewSlide) {
            fetchSlide(window.nextSlide, slideCallback);
        }
    }
    else {
        document.getElementById("slides-loader").style.display = "none";
    }
}
async function slideSpawner() {
    while (true) {
        if (document.getElementById("slides-loader").getBoundingClientRect().bottom < window.innerHeight) {
            spawnNewSlide();
        }
        await new Promise(r => setTimeout(r, 300));
    }
}