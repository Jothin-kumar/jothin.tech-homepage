function scrollHandler() {    
    if (!window.currentSlideLoader.allBatchesFinished) return
    if ((window.innerHeight*1.1 + window.pageYOffset) >= document.body.offsetHeight) { // If almost scrolled to bottom
        const tags = ["top", "blogs", "others"]
        function getNextNeighbour(tag) {
            const index = tags.indexOf(tag)
            if (index === tags.length-1) {
                return tags[0]
            }
            else {
                return tags[index+1]
            }
        }
        toSlidesTag(getNextNeighbour(window.currentSlideLoader.tag))

        document.removeEventListener("scroll", scrollHandler)
        setTimeout(() => {
            document.addEventListener("scroll", scrollHandler)
        }, 1000)
    }
}
document.addEventListener("scroll", scrollHandler)