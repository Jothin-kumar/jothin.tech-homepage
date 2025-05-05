# Website structure:
```
jothin.tech
+--/
+--/404.html
+--/robots.txt
+--/sitemap.txt
+--/search.json
+--/landing
   +--/top
      +--/top-project1.html
      +--/top-project2.html
      +--/etc...
   +--/blogs
      +--/blog1.html
      +--/blog2.html
      +--/etc...
   +--/others
      +--/other1.html
      +--/other2.html
      +--/etc...
```

# Dev
## Prerequisites
 - Install BeautifulSoup4 with `sudo apt-get install python3-bs4`
 - Install htmlmin with `sudo apt-get install python3-htmlmin`
 - Install wrangler with `npm install -g wrangler`
## Setup
 - Clone this repository with `git clone https://github.com/Jothin-kumar/jothin.tech-homepage`
 - To build locally, execute `./build.sh`
 - To preview, use wrangler
## vscode
 - use tasks `build`, `wrangler`, `open in firefox` and `open in chromium`
 - port used: `6900`
