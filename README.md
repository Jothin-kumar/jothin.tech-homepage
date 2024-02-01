# Deploying
 - `./build.sh`
 - `wrangler pages deploy build-output --project-name jothin-tech`

# Website structure:
```
jothin.tech
+--/
+--/search
+--/s/
   +--slide-1
   +--slide-2
   +--etc...
+--/assets/images/*
```

## prod URLs
 - For slides, `https://s.jothin.tech/{id}`
 - For pinned slides, `https://s.jothin.tech/pinned`
 - For search, `https://s.jothin.tech/{search}`