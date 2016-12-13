"use strict";
const ICONPATH ="img\\"
let pages = []; // used to store all our screens/pages
let links = []; // used to store all our navigation links
function navigate(ev) {
    ev.preventDefault();
    let link = ev.currentTarget;
    //console.log(link);
    // split a string into an array of substrings using # as the seperator
    let id = link.href.split("#")[1]; // get the href page name
    //console.log(id);
    //update what is shown in the location bar
    history.replaceState({}, "", link.href);
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id == id) {
            pages[i].classList.add("active");
        }
        else {
            pages[i].classList.remove("active");
        }
    }
}



function StandingsData(game) {
    if (game.away_score > game.home_score) {
        gTeamInfo[game.away].wins++
            gTeamInfo[game.home].losses++;
        gTeamInfo[game.away].points += 2;
    }
    else if (game.away_score < game.home_score) {
        gTeamInfo[game.away].losses++;
        gTeamInfo[game.home].wins++;
        gTeamInfo[game.home].points += 2;
    }
    else {
        gTeamInfo[game.away].ties++;
        gTeamInfo[game.home].ties++;
        gTeamInfo[game.away].points++;
        gTeamInfo[game.home].points++;
    }
}

function displayGameData(data) {
    let tbody = document.querySelector("#tableResult tbody");
    tbody.innerHTML = "";
    
    data.forEach(function (allgames) {

        let tdd1 = document.createElement("td")
        let tdd2 = document.createElement("td")
        let tdd3 = document.createElement("td")
        //tdd.style = "colspan=3";
        tdd1.classList.add("date");
        tdd1.textContent = allgames.date;
        tbody.appendChild(tdd1);
        tbody.appendChild(tdd2);
        tbody.appendChild(tdd3);
       
        allgames.games.forEach(function (game) {
            //Sample Tables stuff here:
            let tr = document.createElement("tr");
            let tdh = document.createElement("td");
            tdh.innerHTML ="<img src=img/"+gTeamInfo[game.home].teamiconID+">" +gTeamInfo[game.home].teamname;
            // Score
            let tds = document.createElement("td");
            tds.textContent = game.home_score + " - " + game.away_score;
            // Away team
            let tda = document.createElement("td");
            tda.innerHTML ="<img src=img/"+gTeamInfo[game.away].teamiconID+">" +gTeamInfo[game.away].teamname;
            tr.appendChild(tdh);
            tr.appendChild(tds);
            tr.appendChild(tda);
            tbody.appendChild(tr);
            StandingsData(game);
        });
    });
}

function displayStandingData() {
    let tbody = document.querySelector("#teamStandings tbody");
    tbody.innerHTML = "";
    let rank=0;
    gTeamInfo.forEach(function (value, key) {
        let wins = value.wins;
        let losses = value.losses;
        let ties = value.ties;
        let points = value.points;
        let name = value.teamname;
        //Sample Tables stuff here:
        let tr = document.createElement("tr");
        let tdr = document.createElement("td");
        tdr.textContent = ++rank;
        let tdn = document.createElement("td");
        tdn.innerHTML ="<img src=img/"+value.teamiconID+">" +value.teamname;//name;
        let tdw = document.createElement("td");
        tdw.textContent = wins;
        let tdl = document.createElement("td");
        tdl.textContent = losses;
        let tdt = document.createElement("td");
        tdt.textContent = ties;
        let tdp = document.createElement("td");
        tdp.textContent = points;
        tr.appendChild(tdr);
        tr.appendChild(tdn);
        tr.appendChild(tdw);
        tr.appendChild(tdl);
        tr.appendChild(tdt);
        tr.appendChild(tdp);
        tbody.appendChild(tr);
    });
}