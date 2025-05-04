set -e

cp build-config.json _build-config.json  # backup original config

if [ -d "build" ]
then
    cd build
    git pull
    cd ../
else
    git clone https://github.com/Jothin-kumar/build.git
fi
    printf "git (build) ✅\n\n"

python3 slides-gen.py
printf "slides-gen ✅\n\n"
python3 build/build.py
printf "build.py ✅\n\n"
cp -r img build-output/img
printf "copy images ✅\n\n"
cp -r slides build-output/slides
printf "copy slides ✅\n\n"

cp robots.txt build-output/robots.txt
cp sitemap.txt build-output/sitemap.txt
printf "robots.txt and sitemap ✅\n\n"
cp search.json build-output/search.json
printf "search.json ✅\n\n"

cp _redirects build-output/_redirects
printf "redirects ✅\n\n"

cp _build-config.json build-config.json  # restore original config
