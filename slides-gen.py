"""
Run this file to generate slides & search.json for homepage
Also generates a sitemap.txt file for the website
"""

import os, shutil, json


if os.path.exists("slides"):
    shutil.rmtree("slides")
os.mkdir("slides")

tags = os.listdir("landing")
links = ["https://jothin.tech"]
for t in tags:
    os.mkdir(os.path.join("slides", t))
    batched_slides = []
    for f in os.listdir(os.path.join("landing", t)):
        if f.endswith(".html"):
            links.append(f"https://jothin.tech/landing/{t}/{f}")
            with open(os.path.join("landing", t, f), "r") as file:
                content = file.read()
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
    for link in links:
        sitemap.write(link + "\n")