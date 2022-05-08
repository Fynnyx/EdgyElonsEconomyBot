#!bin/bash

WORKINGFOLDER=$( cd -- "$( dirname --  "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)

bold=$(tput bold)
normal=$(tput sgr0)

echo "${bold}Starting EdgyElonsBot ...${normal}"

if [ -d "$WORKINGFOLDER/.git" ];
then
    echo "[Info] - Is initialized Git project"
    git pull
    echo "[Info] - Stopping the session ..."
    screen -X -S "edgyelonsbot" kill
    echo "[Info] - Installing missing packages ..."
    npm i
    echo "[Info] - Starting bot ..."
    screen -d -m -S "edgyelonsbot" bash -c "npm run start"
    echo "${bold}[Info] - Started EdgyElonBot${normal}"
fi

screen -ls