const searchBaseURL = "/slides/search.json";
window.searchData = [];

fetchSearch = async () => {
    try {
        const response = await fetch(searchBaseURL);
        if (!response.ok) {
            setTimeout(fetchSearch, 1000)
        }
        else {
            response.json().then((data) =>{
                window.searchData = data
            })
        }
    }
    catch {
        setTimeout(fetchSearch, 1000)
    }
}

function search(query) {
    if (window.searchData.length === 0) {
        setTimeout(() => {search(query)}, 1000)
        return
    }
    let results = []
    let sum_of_all_scores = 0
    function toList(str) {
        return str.replace(/[^a-zA-Z0-9]/g, " ").replace(/  +/g, ' ').trim().toLowerCase().split(" ")
    }
    for (let i = 0; i < window.searchData.length; i++) {
        const t = window.searchData[i]["title"].toLowerCase()
        const d = window.searchData[i]["description"].toLowerCase()
        let total_score = 0

        function calcScore(scoreValue, toListParam, checkInStr) {
            let score = 0
            const list = toList(toListParam)
            for (let j = 0; j < list.length; j++) {
                if (checkInStr.includes(list[j])) {
                    score += scoreValue
                }
            }
            return score
        }

        total_score += calcScore(100, query, t)
        total_score += calcScore(50, query, d)
        total_score += calcScore(5, t, query)
        total_score += calcScore(1, d, query)

        if (total_score > 0) {
            sum_of_all_scores += total_score
            results.push({
                "score": total_score,
                ".": window.searchData[i]
            })
        }
    }

    avg_score = sum_of_all_scores / window.searchData.length
    results = results.filter(r => r["score"] >= avg_score)

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

window.searchDisplayEvent = new Event("search-display")
function displaySearch() {
    window.dispatchEvent(window.searchDisplayEvent)
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
    if (!window.inSearch && window.canHideSearch) {
        hideSearch();
    }
});
window.addEventListener("mousemove", () => {
    window.canHideSearch = true
})

function SearchMain() {
    document.getElementById("search").addEventListener("mouseenter", () => {
        window.inSearch = true;
    });
    document.getElementById("search").addEventListener("mouseleave", () => {
        window.inSearch = false;
    });
    const input = document.getElementById("navbar-search-input");
    const minChars = 1;
    const maxChars = 25;
    function searchQuery(query) {
        window.canHideSearch = false
        input.blur();
        displaySearch();
        document.getElementById("searching-msg").innerHTML = `Searching for<br>'${query}'`;
        if (window.searchData.length === 0) {
            fetchSearch()
        }
        search(query)
    }
    input.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter") {
            input.value = input.value.trim();
        }
        if (evt.key === "Enter" && input.value && minChars <= input.value.length <= maxChars) {
            searchQuery(input.value)
        }
    });
    document.getElementById("search-go-btn").addEventListener("click", () => {
        if (input.value && minChars <= input.value.length <= maxChars) {
            searchQuery(input.value)
        }
    })
    function borderColor() {
        const goBtn = document.getElementById("search-go-btn")
        if (input.value.trim()) {
            input.style.borderColor = "darkgreen";
            goBtn.style.opacity = "1"
            if (input.value.length > maxChars) {
                input.style.borderColor = "red";
                goBtn.style.opacity = "0"
            }
        }
        else {
            input.style.borderColor = "white";
            goBtn.style.opacity = "0"
        }
    }
    input.addEventListener("keyup", borderColor);
    borderColor();

    window.addEventListener("keydown", (evt) => {
        if (evt.key === "/" || evt.ctrlKey && ["f", "F"].includes(evt.key)) {
            evt.preventDefault()
            input.focus()
            input.select()
            hideSearch()
            input.style.animation = "search-focus 3s"
            setTimeout(() => {
                input.style.animation = ""
            }, 2000)
        }
    })
}
SearchMain()

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