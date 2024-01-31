"""
Run this py file to generate webpages in s/*
"""

import os, shutil, glob, json


shutil.rmtree("s")
os.mkdir("s")

with open("s-template.html") as t:
    template = t.read()
def generate(data):
    return (template
        .replace("<!-- title -->", data["name"])
        .replace("<!-- link -->", data["url"])
        .replace("<!-- link-tooltip -->", data["url"].replace("https://", ""))
        .replace("<!-- img src -->", data["image-src"])
        .replace("<!-- gh -->", data["GitHub-url"])
        .replace("<!-- gh-tooltip -->", data["GitHub-url"].replace("https://github.com/Jothin-Kumar/", "").replace("https://github.com/", ""))
        .replace("<!-- description -->", data["description"])
        )

pages = []
for datafilename in glob.glob("slides-git/slides/*.json"):

    print(f"Found file: {datafilename}")
    with open(datafilename) as f:
        data = json.load(f)["slide"]

    url_slug: str = data["name"]
    while " "*2 in url_slug:
        url_slug = url_slug.replace(" "*2, " ")
    url_slug = url_slug.replace(" ", "-")

    path = f"s/{url_slug}.html"
    assert not os.path.exists(path)  # Duplicate urls since two slides have same title
    with open(path, "w") as f:
        f.write(generate(data))

    pages.append(f"/{path}")
    print("Done.")

with open("build-config.json") as b:
    data = json.load(b)
with open("build-config.json", "w") as b:
    data["pages"] += pages
    json.dump(data, b)
