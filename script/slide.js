function declareError() {
    document.getElementById("error-loading-slide").style.display = "block"
}
function withdrawError() {
    document.getElementById("error-loading-slide").style.display = "none"
}
function hideLoading() {
    document.getElementById("slides-loader").style.opacity = "0"
    document.getElementById("main-footer").style.opacity = "1"
}
function showLoading() {
    document.getElementById("slides-loader").style.opacity = "1"
    document.getElementById("main-footer").style.opacity = "0"
}

function appendSlide(tag, html) {
    const container = document.getElementById(`slides-here-tag-${tag}`)
    const slideContainer = document.createElement("div")
    slideContainer.className = "slide-container"
    const slide = document.createElement("div")
    slide.className = "slide"
    slide.innerHTML = html
    slideContainer.appendChild(slide)
    container.appendChild(slideContainer)
}

async function getJSON(url, slideLoader) {
    while (true) {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await response.json()
            withdrawError()
            return data
        }
        catch (error) {
            console.error("Error fetching JSON:", error)
            if (slideLoader.canProceed) declareError()
        }
        await new Promise(resolve => setTimeout(resolve, 5000))
    }
}

class SlideLoader {
    constructor(tag, focusnav=true) {
        withdrawError()
        showLoading()
        this.tag = tag
        this.initialise()
        this.canProceed = true
        this.firstSlideShown = false
        this.focusnav = focusnav
    }
    async initialise() {
        const initSlidesData = await getJSON(`/slides/${this.tag}/init.json`, this)
        var batchCount = initSlidesData["batch-count"]
        var batchesUsed = 0
        this.slides = initSlidesData["batched-slides"]
        this.mainloop()
        while ((batchesUsed + 1 < batchCount) && this.canProceed) {
            if (this.slides.length < 2) {
                batchesUsed += 1
                const batchSlidesData = await getJSON(`/slides/${this.tag}/batch-${batchesUsed}.json`, this)
                this.slides = this.slides.concat(batchSlidesData["batched-slides"])
            }
            await new Promise(resolve => setTimeout(resolve, 200))
        }
        this.allBatchesFinished = true
    }
    async mainloop() {
        while ((!this.allBatchesFinished || this.slides.length > 0) & this.canProceed) {
            const sl = document.getElementById('slides-loader')
            if (this.slides.length !== 0 && (isVisible(sl) || isScrolledPast(sl))) {
                this.showSlide()
                if (!this.firstSlideShown) {
                    this.firstSlideShown = true
                    if (this.focusnav) {
                        document.getElementById("my-works").scrollIntoView({behavior: "smooth", block: "start"});
                        document.getElementById("slides-parent").scrollIntoView({behavior: "smooth", block: "start"})
                    }
                }
            }
            await new Promise(resolve => setTimeout(resolve, 200))
        }
        if (this.canProceed) hideLoading()
    }
    showSlide() {
        appendSlide(
            this.tag,
            this.slides.splice(0, 1)[0]
        )
    }
    terminate() {
        this.canProceed = false
        document.getElementById(`slides-here-tag-${this.tag}`).innerHTML = ""
    }
}
window.currentSlideLoader = new SlideLoader("top", false)