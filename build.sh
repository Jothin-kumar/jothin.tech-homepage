set -e

cp build-config.json _build-config.json  #

if [ -d "slides-git" ]
then
    cd slides-git
    git pull
    cd ../
else
    git clone https://github.com/Jothin-kumar/jothin.tech-slides.git slides-git
fi
printf "git (slides) ✅\n\n"

python3 s-generate.py
printf "slides generate ✅\n\n"

if [ -d "build" ]
then
    cd build
    git pull
    cd ../
else
    git clone https://github.com/Jothin-kumar/build.git
fi
printf "git (build) ✅\n\n"

python3 build/build.py
printf "build.py ✅\n\n"
cp -r assets/images build-output/img
cp favicon.png build-output/favicon.png
printf "copy images ✅\n\n"

cp robots.txt build-output/robots.txt
cp sitemap.txt build-output/sitemap.txt
printf "robots.txt and sitemap ✅\n\n"

cp _redirects build-output/_redirects
printf "redirects ✅\n\n"

cp _build-config.json build-config.json  #
