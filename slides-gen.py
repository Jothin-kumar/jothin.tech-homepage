"""
Run this file to generate slides & search.json for homepage
Also generates a sitemap.txt file for the website
"""

import os, shutil, json

os.system("python3 -m pip install -r build-requirements.txt && echo 'build requirements installed (slides-gen)'")
import bs4, htmlmin


if os.path.exists("slides"):
    shutil.rmtree("slides")
os.mkdir("slides")

tags = os.listdir("landing")
pages = []
for t in tags:
    os.mkdir(os.path.join("slides", t))
    batched_slides = []
    for f in os.listdir(os.path.join("landing", t)):
        if f.endswith(".html"):
            pages.append(f"/landing/{t}/{f}")
            with open(os.path.join("landing", t, f), "r") as file:
                content = file.read()
                content = htmlmin.minify(content, remove_empty_space=True)
                soup = bs4.BeautifulSoup(content, "html.parser")
                content = soup.body.decode_contents()
            batched_slides.append(content)
    slides_per_batch = 3
    c = len(batched_slides) // slides_per_batch
    if len(batched_slides) % slides_per_batch != 0:
        c += 1
    with open(os.path.join("slides", t, "init.json"), "w") as init_file:
        json.dump({
            "batch-count": c,
            "batched-slides": batched_slides[:slides_per_batch]
        }, init_file)
        del batched_slides[:slides_per_batch]
    for i in range(1, c):
        with open(os.path.join("slides", t, f"batch-{i}.json"), "w") as batch_file:
            json.dump({
                "batched-slides": batched_slides[:slides_per_batch]
            }, batch_file)
            del batched_slides[:slides_per_batch]

with open("sitemap.txt", "w") as sitemap:
    sitemap.write("https://jothin.tech\n")
    for page in pages:
        sitemap.write(f"https://jothin.tech{page}"[:-5] + "\n")
with open("build-config.json") as b:
    data = json.load(b)
with open("build-config.json", "w") as b:
    data["pages"] += pages
    json.dump(data, b)