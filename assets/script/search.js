function displaySearch() {
    document.getElementById("search-parent").style.display = "block";
    document.body.style.overflow = "hidden";
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
    const maxChars = 25;
    input.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter" && input.value && input.value.length <= maxChars) {
            displaySearch();
            document.getElementById("searching-msg").innerText = `Searching for '${input.value}'`;
        }
    });
    function borderColor() {
        if (input.value) {
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
}
function loaded() {
    document.getElementById("search-loader").style.display = "none";
}