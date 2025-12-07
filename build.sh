set -e

cd frontend
bun i && bun run build
rm -rf ../backend/assets/*
rm -rf ../assets/*
mkdir -p ../assets
cp -r dist/frontend/browser/* ../assets/

cd ../backend
bun i
bun run eslint
bun run build
chmod +x tawasul-app
rm -rf ../tawasul-app
cp tawasul-app ..

cd ..
VERSION=$(jq -r .version package.json)

docker build -t ikapiar/tawasul:$VERSION -f ./Dockerfile .