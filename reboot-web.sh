#!/bin/bash

## Jeff's deploy script v2.0
## Spencer Wohlers

## Here's what we're gonna do. Grab the latest copy of the nice-test
## from Github. Rebuild it using npm. Kill the web server. Swap out the
## directory, then start the web server.

GIT_BASE_DIR=/home/node-web
GIT_SUBDIR="nice-test"
BUILD_DIR=build
SRV_BASE_DIR=/var/www
SRV_SUBDIR=html
GH_MASTER="https://github.com/gitmarkhubmunar/nice-test.git"


if [ -d $GIT_BASE_DIR/$GIT_SUBDIR ]; then
  
  echo "Grabbing latest copy of repository from Github."
  cd $GIT_BASE_DIR/$GIT_SUBDIR
  /usr/bin/git pull &>/dev/null
  
else
  
  echo "That's concerning. I don't see your repository."
  echo "Oh well. Let's rebuild it."
  
  cd $GIT_BASE_DIR
  /usr/bin/git clone $GH_MASTER $GIT_SUBDIR &>/dev/null
  cd $GIT_SUBDIR
  /usr/bin/npm install &>/dev/null
  
fi
  
echo "Building production-ready site."
/usr/bin/npm run build &>/dev/null

echo "Stopping existing server processes."
killall node &>/dev/null;

echo "Moving updated site into place."
chmod 775 build
rm -rf $SRV_BASE_DIR/$SRV_SUBDIR
mv build $SRV_BASE_DIR/$SRV_SUBDIR

echo "Starting server."
cd $SRV_BASE_DIR
/usr/local/bin/pushstate-server $SRV_SUBDIR &>/dev/null &

exit 0;