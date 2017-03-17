#!/usr/bin/env bash
# chmod -R 777 .
# sh - spawn sh shell


rm -rf ./dist && mkdir dist/
echo "dist/ dir created!"

echo "...copying html files..."
echo ""
for f in *.html
do
    cp -v "$f" ./dist/"${f%.html}".html
done
echo "====> html files copied <===="
echo ""

echo "...uglifying files..."
# js
uglifyjs index.js --compress --mangle -o dist/index.min.js
# css
uglifycss --debug main.css > ./dist/main.min.css
echo "====> files uglifyied <===="
echo ""

echo "...copying assets ..."
cp -R ./assets dist/assets/
echo "====> assets copied <===="
echo ""

# npm run test