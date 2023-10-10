## HOW TO INSTALL NODEJS 16.x to play locally with VSCode

#### # sudo apt purge --autoremove nodejs npm
#### # curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
#### # sudo bash nodesource_setup.sh


    SCRIPT DEPRECATION WARNING                    

  
  This script, located at https://deb.nodesource.com/setup_X, used to
  install Node.js is deprecated now and will eventually be made inactive.

  Please visit the NodeSource distributions Github and follow the
  instructions to migrate your repo.
  https://github.com/nodesource/distributions

  The NodeSource Node.js Linux distributions GitHub repository contains
  information about which versions of Node.js and which Linux distributions
  are supported and how to install it.
  https://github.com/nodesource/distributions


    SCRIPT DEPRECATION WARNING


TO AVOID THIS WAIT MIGRATE THE SCRIPT
Continuing in 60 seconds (press Ctrl-C to abort) ...

( => wait more than 60s for the script to excecute... or follow the link to get the latest installation instructions... not like me here)

Installing the NodeSource Node.js 16.x repo...

( => etc... )


#### # sudo apt-get install -y nodejs
#### # node -v
#### # npm -v
-> if it exists, delete package-lock.json
#### # npm install
#### # npm run dev