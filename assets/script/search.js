const searchBaseURL = "/search.json";
window.searchData = [];

fetchSearch = async () => {
    try {
        const response = await fetch(searchBaseURL);
        if (!response.ok) {
            setTimeout(fetchSlide, 1000)
        }
        else {
            response.json().then((data) =>{
                window.searchData = data
            })
        }
    }
    catch {
        setTimeout(fetchSlide, 1000)
    }
}

function search(query) {
    if (window.searchData.length === 0) {
        setTimeout(() => {search(query)}, 1000)
        return
    }
    let results = []
    const words = query.split(" ")
    for (let i = 0; i < window.searchData.length; i++) {
        const t = window.searchData[i]["title"].toLowerCase()
        const d = window.searchData[i]["description"].toLowerCase()
        let score = 0
        for (let j = 0; j < words.length; j++) {
            if (t.includes(words[j])) {
                score += 1
            }
            if (d.includes(words[j])) {
                score += .5
            }
        }
        if (score > 0) {
            results.push({
                "score": score,
                ".": window.searchData[i]
            })
        }
    }

    results.sort((a, b) => { // sort based on score in descending order
        const scoreA = a["score"]
        const scoreB = b["score"]

        return (scoreA < scoreB) ? +1: (scoreB < scoreA) ? -1: 0
    })

    results = results.map((s, i, a) => {
        return s["."]
    })
    displaySearchResults(query, results)
}

function displaySearch() {
    document.getElementById("search-parent").style.display = "block";
    document.body.style.overflow = "hidden";
    loading();
}
function hideSearch() {
    document.getElementById("search-parent").style.display = "none";
    document.body.style.overflow = "unset";
}
window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
        hideSearch();
    }
});
window.addEventListener("click", () => {
    if (!window.inSearch) {
        hideSearch();
    }
});

function bodyLoadedSearch() {
    document.getElementById("search").addEventListener("mouseenter", () => {
        window.inSearch = true;
    });
    document.getElementById("search").addEventListener("mouseleave", () => {
        window.inSearch = false;
    });
    const input = document.getElementById("navbar-search-input");
    const minChars = 1;
    const maxChars = 25;
    input.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter") {
            input.value = input.value.trim();
        }
        if (evt.key === "Enter" && input.value && minChars <= input.value.length <= maxChars) {
            input.blur();
            displaySearch();
            document.getElementById("searching-msg").innerHTML = `Searching for<br>'${input.value}'`;
            if (window.searchData.length === 0) {
                fetchSearch()
            }
            search(input.value)
        }
    });
    function borderColor() {
        if (input.value.trim()) {
            input.style.borderColor = "darkgreen";
            if (input.value.length > maxChars) {
                input.style.borderColor = "red";
            }
        }
        else {
            input.style.borderColor = "white";
        }
    }
    input.addEventListener("keyup", borderColor);
    borderColor();
}

function loading() {
    document.getElementById("search-loader").style.display = "block";
    document.getElementById("search-results").style.display = "none";
}
function loaded() {
    document.getElementById("search-loader").style.display = "none";
    document.getElementById("search-results").style.display = "block";
}

function displaySearchResults(query, results) {
    document.getElementById("search-results-found").innerHTML = `${results.length} result(s) found for <br> '${query}'`;
    document.querySelector("#search-results > div").innerHTML = "";
    for (let i = 0; i < results.length; i++) {
        const r = document.createElement("div");
        r.classList.add("result");
        const rt = document.createElement("p");
        rt.classList.add("result-title");
        rt.innerText = results[i]["title"];
        r.appendChild(rt);
        const rd = document.createElement("p");
        rd.classList.add("result-description");
        rd.innerText = results[i]["description"];
        r.appendChild(rd);
        document.querySelector("#search-results > div").appendChild(r);

        r.addEventListener("click", () => {
            window.open(results[i]["url"]);
        })
    }
    loaded();
}