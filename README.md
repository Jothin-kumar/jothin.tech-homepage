# Website structure:
```
jothin.tech
+--/
+--/search
+--/s/
   +--slide-1
   +--slide-2
   +--etc...
```

## prod URLs
 - For slides, `https://s.jothin.tech/{id}`
 - For pinned slides, `https://s.jothin.tech/pinned`
 - For search, `https://s.jothin.tech/{search}`

# Dev
 - Install BeautifulSoup4 with `sudo apt-get install python3-bs4`
 - Clone this repository with `git clone https://github.com/Jothin-kumar/jothin.tech-homepage`
 - To build locally, execute `./build.sh`
 - To preview, use wrangler
## vscode
 - use tasks `build`, `wrangler`, `open in firefox` and `open in chromium`
 - port used: `6900`