"use strict"
if (document.deviceready) {
    document.addEventlistener('deviceready', onDeviceReady);
}
else {
    document.addEventListener('DOMContentLoaded', onDeviceReady)
}
var GLOBALKEY = "oh000024scores";
var gTeamInfo = []; //new Map();
var gdata = [];

function initializeIcon()
{
    
}

function onDeviceReady() {
    console.log("Ready!");
    pages = document.querySelectorAll('[data-role="page"]');
    links = document.querySelectorAll('[data-role="nav"] a');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", navigate);
    }
  
    document.addEventListener('load',initializeIcon);
    document.querySelector(".refresh").addEventListener("click", onRefreshData);
    if (localStorage.getItem(GLOBALKEY)) {
        gdata = JSON.parse(localStorage.getItem(GLOBALKEY));
        displayData(gdata, false);
    }
    else {
        serverData.getJSON();
    }
    let thwin = document.querySelector(".wins");
    thwin.addEventListener("click", onClickWins);
    let thlosses = document.querySelector(".losses");
    thlosses.addEventListener("click", onClickLosses);
    let ththies = document.querySelector(".ties");
    ththies.addEventListener("click", onClickTies);
    let thpoints = document.querySelector(".points");
    thpoints.addEventListener("click", onClickPoints);
}
let serverData = {
    url: "http://griffis.edumedia.ca/mad9014/sports/quidditch.php"
    , httpRequest: "GET"
    , getJSON: function () {
        let headers = new Headers();
        headers.append("Content-Type", "text/plain");
        headers.append("Accept", "application/json; charset=utf-8");
        // simply show them in the console
        console.dir("headers: " + headers.get("Content-Type"));
        console.dir("headers: " + headers.get("Accept"));
        // Now the best way to get this data all together is to use an options object:
        // Create an options object
        let options = {
            method: serverData.httpRequest
            , mode: "cors"
            , headers: headers
        };
        // Create an request object so everything we need is in one package
        let request = new Request(serverData.url, options);
        console.log(request);
        fetch(request).then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (data) {
            // console.log(data); // now we have JS data, let's display it
            //localStorage.setItem(GLOBALKEY, JSON.stringify(data));
            // Call a function that uses the data we recieved  
            displayData(data, true);
        }).catch(function (err) {
            alert("Error: " + err.message);
        });
    }
};

function displayData(data, bUpdate) {
    gTeamInfo.length = 0;
    if (true == bUpdate) {
        localStorage.setItem(GLOBALKEY, JSON.stringify(data));
    }
    data.teams.forEach(function (team) {
        var teaminfo = {
            teamname: team.name
            , wins: 0
            , losses: 0
            , ties: 0
            , points: 0
            , teamiconID:team.name+".png"
        }
        gTeamInfo[team.id] = teaminfo;
        gTeamInfo[team.name] = teaminfo;  
    });
    displayGameData(data.scores);
    
    gTeamInfo.sort(function (a, b) {
        if (a.wins < b.wins) {
            return 1;
        }
        if (a.wins > b.wins) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
    displayStandingData();
}

function onRefreshData() {
    serverData.getJSON();
}

function sortMapByValue(mapdata) {
    var arr = [];
    for (var key of mapdata) arr.push(key[1]);
    arr.sort(function (a, b) {
        return a.wins - b.wins;
    });
    return arr; // returns array
}