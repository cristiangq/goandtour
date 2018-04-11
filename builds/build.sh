#!/bin/bash

rm ~/go-and-tour/builds/LasTermasTour.apk
rm ~/go-and-tour/builds/app-release-unsigned.apk
ionic cordova build android --prod --release
cp ~/go-and-tour/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk  ~/go-and-tour/builds
cd ~/go-and-tour/builds && jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks app-release-unsigned.apk cristiangq
cd ~/Android/Sdk/build-tools/26.0.2/ && ./zipalign -v 4 ~/go-and-tour/builds/app-release-unsigned.apk ~/go-and-tour/builds/LasTermasTour.apk
